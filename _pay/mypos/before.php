<?php
/* (C) Websplosion LLC, 2001-2021

IMPORTANT: This is a commercial software product
and any kind of using it must agree to the Websplosion's license agreement.
It can be found at http://www.chameleonsocial.com/license.doc

This notice may not be removed from the source code. */

$g['to_root'] = "../../";
require_once './IPC/Loader.php';
include($g['to_root'] . "_include/core/main_start.php");

$system = "mypos";

$item = Pay::checkPlan();
if ($item === false) {
    exit;
}

$urlSite = Common::urlSiteSubfolders();

$returnCancel = $urlSite . 'upgrade.php';
$requestUri = Pay::getRequestUri();
if ($requestUri != '') {
    $returnCancel = $requestUri;
}

$row = Pay::getOptionsPlan($item);
$code = Pay::getCode($item, $row['amount']);

$cnf = new \Mypos\IPC\Config();
$cnf->setIpcURL('https://mypos.com/vmp/checkout/'); 
$cnf->setLang('en'); 
$cnf->setVersion('1.4'); 
$configurationPackage = $pay[$system]['package'];
//$configurationPackage = 'eyJzaWQiOiIwMDAwMDAwMDAwMDAwMTAiLCJjbiI6IjYxOTM4MTY2NjEwIiwicGsiOiItLS0tLUJFR0lOIFJTQSBQUklWQVRFIEtFWS0tLS0tXHJcbk1JSUNYQUlCQUFLQmdRQ2YwVGRjVHVwaGI3WCtad2VrdDFYS0VXWkRjelNHZWNmbzZ2UWZxdnJhZjVWUHpjbkpcclxuMk1jNUo3MkhCbTB1OThFSkhhbitubGUyV09aTVZHSXRUYVwvMmsxRlJXd2J0N2lRNWR6RGg1UEVlWkFTZzJVV2VcclxuaG9SOEw4TXBOQnFINmg3WklUd1ZUZlJTNExzQnZsRWZUN1B6aG01WUpLZk0rQ2R6RE0rTDlXVkVHd0lEQVFBQlxyXG5Bb0dBWWZLeHdVdEVicTh1bFZyRDNubldoRitoazFrNktlamRVcTBkTFlOMjl3OFdqYkNNS2I5SWFva21xV2lRXHJcbjVpWkdFcll4aDdHNEJEUDhBV1wvK005SFhNNG9xbTVTRWtheGhiVGxna3MrRTFzOWRUcGRGUXZMNzZUdm9kcVN5XHJcbmwyRTJCZ2hWZ0xMZ2tkaFJuOWJ1YUZ6WXRhOTVKS2ZneUtHb25OeHNRQTM5UHdFQ1FRREtiRzBLcDZLRWtOZ0Jcclxuc3JDcTNDeDJvZDVPZmlQREc4ZzNSWVpLeFwvTzlkTXk1Q00xNjBEd3VzVkpwdXl3YnBSaGNXcjNna3owUWdSTWRcclxuSVJWd3l4TmJBa0VBeWgzc2lwbWNnTjdTRDh4QkdcL010QllQcVdQMXZ4aFNWWVBmSnp1UFUzZ1M1TVJKelFIQnpcclxuc1ZDTGhUQlk3aEhTb3FpcWxxV1lhc2k4MUp6QkV3RXVRUUpCQUt3OXFHY1pqeU1IOEpVNVREU0dsbHIzanlieFxyXG5GRk1QajhUZ0pzMzQ2QUI4b3pxTExcL1RodldQcHhIdHRKYkg4UUFkTnV5V2RnNmRJZlZBYTk1aDdZK01DUUVaZ1xyXG5qUkRsMUJ6N2VXR08yYzBGcTlPVHozSVZMV3BubUd3ZlcrSHlheGl6eEZoVitGT2oxR1VWaXI5aHlsVjdWMERVXHJcblFqSWFqeXZcL29lRFdoRlE5d1FFQ1FDeWRoSjZOYU5RT0NaaCs2UVRySDNUQzVNZUJBMVllaXBvZTcrQmhzTE5yXHJcbmNGRzhzOXNUeFJubHRjWmwxZFhhQlNlbXZwTnZCaXpuMEt6aThHM1pBZ2M9XHJcbi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tIiwicGMiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cclxuTUlJQnNUQ0NBUm9DQ1FDQ1BqTnR0R05RV0RBTkJna3Foa2lHOXcwQkFRc0ZBREFkTVFzd0NRWURWUVFHRXdKQ1xyXG5SekVPTUF3R0ExVUVDZ3dGYlhsUVQxTXdIaGNOTVRneE1ERXlNRGN3T1RFeldoY05Namd4TURBNU1EY3dPVEV6XHJcbldqQWRNUXN3Q1FZRFZRUUdFd0pDUnpFT01Bd0dBMVVFQ2d3RmJYbFFUMU13Z1o4d0RRWUpLb1pJaHZjTkFRRUJcclxuQlFBRGdZMEFNSUdKQW9HQkFNTCtWVG1pWTR5Q2hvT1RNWlRYQUlHXC9tayt4ZlwvOW1qd0h4V3p4dEJKYk5uY05LXHJcbjBPTEkwVlhZS1cyR2dWa2xHSEhRanZldzFoVEZrRUdqbkNKN2Y1Q0RuYmd4ZXZ0eUFTREdzdDkyYTZ4Y0FlZEVcclxuYWRQMG5GWGhVeitjWVlJZ0ljZ2ZEY1gzWldlTkVGNWtzY3F5NTJrcEQyTzduRk5DVis4NXZTNGR1SkJOQWdNQlxyXG5BQUV3RFFZSktvWklodmNOQVFFTEJRQURnWUVBQ2oweGIrdE5ZRVJKa0wrcCt6RGNCc0JLNFJ2a25QbHBrK1lQXHJcbmVwaHVuRzJkQkdPbWdcL1dLZ29EMVBMV0QyYkVmR2dKeFlCSWc5cjF3TFlwREMxdHhoeFYrMk9CUVM4NktVTGgwXHJcbk5FY3IwcUVZMDVtSTRGbEUrRFwvQnBUXC8rV0Z5S2tadWc5MnJLMEZsejcxWHlcLzltQlhiUWZtK1lLNmw5cm9SWWRcclxuSjRzSGVRYz1cclxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLSIsImlkeCI6MX0=';
$cnf->loadConfigurationPackage($configurationPackage);


$cart = new \Mypos\IPC\Cart; 
$cart->add($row['item_name'], 1, $row['amount']);

	
$purchase = new \Mypos\IPC\PurchaseByIcard($cnf); 
$purchase->setUrlCancel($returnCancel); //User comes here after purchase cancelation 
$purchase->setUrlOk($urlSite); //User comes here after purchase success 
$purchase->setUrlNotify($urlSite . '_pay/mypos/after.php'); //IPC sends POST reuquest to this address with purchase status 
$purchase->setOrderID($code); //Some unique ID 
$purchase->setCurrency($pay[$system]['currency_code']); 
$purchase->setEmail($g_user['mail']); 
$purchase->setCart($cart); 





$data = array('item' => $item,
              'system' => $system,
              'code' => $code,
              'request_uri' => $requestUri);
Pay::insertBefore($data);

	
 
try{ 
    $purchase->process(); 
}catch(\Mypos\IPC\IPC_Exception $ex){ 
    echo $ex->getMessage(); 
    //Invalid params. To see details use "echo $ex->getMessage();" 
}
