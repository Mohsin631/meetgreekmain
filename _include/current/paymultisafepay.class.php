<?php

use Stripe\Stripe;
use Stripe\Checkout\Session;

class PayMultisafepay extends Pay
{

    public static $system = 'multisafepay';
    public static $msp = null;
    protected static $cfg;

public static function before()
{
    $order = self::createOrder();

    self::initPaymentSystem();

    $amount = self::getPlanField('amount') * 100; // cents
    $currency = Common::getOption('currency_code', self::getSystem());
    $itemName = self::getPlanField('item_name');

    $secretKey = self::$cfg['secret'];

    $data = [
        "payment_method_types[]" => "card",
        "line_items[0][price_data][currency]" => $currency,
        "line_items[0][price_data][product_data][name]" => $itemName,
        "line_items[0][price_data][unit_amount]" => $amount,
        "line_items[0][quantity]" => 1,
        "mode" => "payment",
        "success_url" => self::redirectUrl($order) . "&session_id={CHECKOUT_SESSION_ID}",
        "cancel_url" => Common::urlSiteSubfolders() . "/upgrade.php",
        "metadata[order_id]" => $order,
    ];

    $ch = curl_init("https://api.stripe.com/v1/checkout/sessions");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $secretKey,
        "Content-Type: application/x-www-form-urlencoded"
    ]);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        echo "Stripe cURL Error: " . curl_error($ch);
        exit;
    }
    curl_close($ch);

    $session = json_decode($response, true);

    if (!isset($session['url'])) {
        echo "Stripe Error: " . $response;
        exit;
    }

    redirect($session['url']);
}

public static function after()
{
    self::initPaymentSystem();

    $transactionid = get_param('transactionid');
    $initial = (get_param('type') == 'initial');
    $sessionId = get_param('session_id');

    $status = 'failed';
    $custom = '';

    if ($sessionId) {
        $ch = curl_init("https://api.stripe.com/v1/checkout/sessions/" . $sessionId);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . self::$cfg['secret']
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        $session = json_decode($response, true);

        if (isset($session['payment_status']) && $session['payment_status'] === 'paid') {
            $status = 'completed';
        } elseif (isset($session['status']) && $session['status'] === 'open') {
            $status = 'initialized';
        }
    }

    $p['status'] = $status;
    log_payment($p);

    $paymentBefore = self::getPaymentBeforeById($transactionid);
    if ($paymentBefore) {
        $plan = self::getOptionsPlan($paymentBefore['item']);
        if ($plan && $status == 'completed') {
            $custom = $paymentBefore['code'];
        }
    }

    self::getAfterHtml($custom, self::getSystem());

    if ($initial) {
        echo '<a href="' . self::redirectUrl($transactionid) . '">Return</a>';
    } else {
        echo "ok";
    }

    if (get_param('return_success')) {
        echo self::getAfterHtml($custom, self::getSystem());
    }
}


    public static function initPaymentSystem()
    {
        $publicKey = Common::getOption('account_id', self::getSystem()); // Stripe Public Key
        $secretKey = Common::getOption('site_id', self::getSystem());    // Stripe Secret Key
    
        self::$cfg = [
            'public' => $publicKey,
            'secret' => $secretKey,
        ];
    }

    public static function redirectUrl($transactionid)
    {
        return self::callbackUrl(array('transactionid' => $transactionid, 'return_success' => '1'));
    }

}
