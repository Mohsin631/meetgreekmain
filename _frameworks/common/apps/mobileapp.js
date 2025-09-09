var MobileApp = (function () {

	var $this = {};
    var pushTokenCookieName = 'appPushToken';
    var userId = 0;
    var isActive = true;

    $this.isTokenUpdateRequired = false;

    function bindEvents() {
        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);
        document.addEventListener('deviceready', hideSplashscreen, false);
    }

    function onPause() {
        isActive = false;
    };

    function onResume() {
        isActive = true;
    };

    function hideSplashscreen()
    {
        if($this.isAndroid()) {
            navigator.splashscreen.hide();
        }
    }

    function init()
    {
        bindEvents();
        appSetExternalUrlHandler();
        if(!$this.isAndroid()) {
            // disable for ios webview
            document.ondragstart = function(){ return false; };
            disableHoverStyles();
        }
    }

    $this.initPushNotifications = function(currentUserId) {

        console.log('MobileApp.initPushNotifications START', currentUserId);

        $this.pushPlugin = window.FirebasePlugin;

        userId = Number.parseInt(currentUserId);

        if(userId) {

            $this.pushPlugin.hasPermission(function(hasPermission){
                if(!hasPermission) {
                    $this.pushPlugin.grantPermission();
                }
            });

            $this.pushPlugin.isAutoInitEnabled(function(enabled){
                if(!enabled) {
                    $this.pushPlugin.setAutoInitEnabled(true);
                }
            });

            $this.pushPlugin.onTokenRefresh(
                $this.saveToken,
                function(error) {
                    console.log(error);
                }
            );

            $this.pushPlugin.onMessageReceived(function(message) {
                console.log(message);
                if(message.messageType === 'notification' && message.tap) {

                    var url = '';

                    var type = message.type;
                    var userFrom = message.userFrom || 0;

                    var urls = {
                            im : 'messages.php?display=one_chat&user_id=' + userFrom,
                            city : urlCity + 'index.php?view=mobile&from=' + userFrom,
                        };

                    if (tmplCurrent == 'edge') {
                        urls.city = urlPageCity + '?from=' + userFrom;
                        if (type == 'im') {
                            var groupUserId=0, groupId=0;
                            if (message.group_user_id && message.group_id) {
                                groupUserId=message['group_user_id'];
                                groupId=message['group_id'];
                            }
                            clMessages.openMessagesFromAppNotifications(userFrom, groupUserId, groupId);
                            return;
                        }
                    }
                    if(type == 'city'){
                        openMessagesCityFromAppNotifications(userFrom, urls['city']);
                        return;
                    }

                    // disabled due too long time for loading
                    urls.city = null;

                    if (message.url) {
                        url = message.url;
                    } else if (type == 'im' && appCurrentImUserId != userFrom) {
                        url = urls.im;
                    } else if (type in urls) {
                        url = urls[type];
                    }

                    if (url) {

                        var currentPage = document.location.href.split('#')[0];
                        var redirectPage = url.split('#')[0];
                        if(currentPage != redirectPage) {
                            appPreloaderShow();
                        }

                        setTimeout(function(){document.location.href = url;}, 100);
                    }
                    // else update content before show to user - it can contain old data

                    console.log("Notification message received");
                    if(message.tap){
                        console.log("Tapped in " + message.tap);
                    }
                }
            }, function(error) {
                //alert('onNotificationOpen ERROR');
                console.error(error);
            });

            //TODO: get token by timer every 10 seconds till correct value
            $this.updateTokenInfo();
            console.log('MobileApp.initPushNotifications FINISH', userId);
        } else {
            $this.pushNotificationsOff();
            console.log('MobileApp.initPushNotifications OFF', currentUserId);
        }

        console.log('MobileApp.initPushNotifications END', currentUserId);
    };

    // get token depend on app version

    $this.updateTokenInfo = function() {

        // run by timer till success response

        $this.pushPlugin.getToken(
            $this.saveToken,
            function(error) {
                console.error(error);
            }
        );
    };

    $this.saveToken = function(token) {

        var oldToken = getTokenFromCookie();
        if(token && (!oldToken || oldToken.token !== token || oldToken.userId !== userId || $this.isTokenUpdateRequired)) {

            var params = {
                    cmd: 'mobile_app_push_token_add',
                    token: token,
                    oldToken: JSON.stringify(oldToken)
                };

            var callback = function(data) {
                if(data && data === true) {
                    if(userId) {
                        $this.isTokenUpdateRequired = false;
                        saveTokenInCookie(token);
                    } else {
                        $this.deleteTokenFromSite();
                    }
                }
            };

            $this.sendRequestToSite(params, callback);
        }
    };

    $this.deleteTokenFromSite = function() {

        var tokenInfo = getTokenFromCookie();
        if(tokenInfo) {

            var params = {
                    cmd: 'mobile_app_push_token_delete',
                    token: tokenInfo.token,
                    userId: tokenInfo.userId
                };

            var callback = function(data) {
                if(data && data === true) {
                    $.removeCookie(pushTokenCookieName);
                }
            };

            $this.sendRequestToSite(params, callback);
        }
    };

    $this.sendRequestToSite = function(params, callback)
    {
        var url = 'ajax.php';
        if(tmplCurrent != 'edge') {
            url = '../' + url;
        }

        $.post(
            url,
            params,
            function(response) {
                var data = getDataAjax(response, 'data');
                callback(data);
            }
        );
    };


    function saveTokenInCookie(token)
    {
        if(token) {
            var tokenInfo = {token: token, userId: userId};
            $.cookie(pushTokenCookieName, JSON.stringify(tokenInfo));
        }
    }

    function getTokenFromCookie()
    {
        var data = false;

        var tokenInfo = $.cookie(pushTokenCookieName);
        if(tokenInfo) {
            data = JSON.parse(tokenInfo);
        }

        return data;
    }

    function disableHoverStyles()
    {
        try {
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;

                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;

                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }

    $this.pushNotificationsOff = function() {

        $this.pushPlugin.isAutoInitEnabled(function(enabled){
            if(enabled) {
                $this.pushPlugin.setAutoInitEnabled(false, function(){
                    $this.pushPlugin.unregister();
                });
            } else {
                $this.pushPlugin.unregister();
            }
        });

        $this.setBadgeNumber(0);

        $this.deleteTokenFromSite();

    };

    $this.setBadgeNumber = function(number) {
        document.addEventListener(
            'deviceready',
            function(){
                if($this.isAndroid()) {
                    cordova.plugins.notification.badge.get(function(badge) {
                        if(badge != number) {
                            cordova.plugins.notification.badge.set(number);
                        }
                    });
                } else {
                    $this.pushPlugin.setBadgeNumber(number);
                }
            },
            false
        );
    }

	$this.isAndroid = function() {
		return /AppWebview/i.test(navigator.userAgent);
	};

    init();

	return $this;
}());


