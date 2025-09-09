var CProfile = function(guid, uid) {

    var $this=this;

    this.guid=guid*1;
    this.uid=uid*1;
    this.requestAjax={report : 0, reportMedia : {}};

    this.setData = function(data){
        for (var key in data) {
           $this[key] = data[key];
        }
    }

    this.updateServerMyData = function(allowedFeature){
        userAllowedFeature=allowedFeature;
        if ($('#pp_message_upload_img:visible')[0]) {
            clMessages.initCheckPaydUploadImage()
        }
    }

    this.isMyProfile = function(){
        var isMy=currentPage == 'profile_view.php'
                || (currentPage == 'search_results.php' && requestUserId && $this.guid==requestUserId);
        return isMy;
    }

    this.statusOnline=0;
    this.realStatusOnline=0;
    this.updateOnlineStatus = function(status, realStatus){
        if($this.realStatusOnline!=realStatus){
            $this.realStatusOnline=realStatus;
        }
        if ($this.statusOnline!=status) {
            $jq('#profile_status_online')[status?'addClass':'removeClass']('to_show');
            $this.statusOnline=status;
        }
	}

    this.setStatusOnline = function(realStatus, userStatus){
        $this.realStatusOnline=realStatus*1;
        $this.statusOnline=userStatus*1;
	}

    this.getRealStatusOnline = function(){
        return $this.realStatusOnline;
	}

    this.hideMoreMenu = function(){
        if($jq('#profile_user_more_menu_bl').is('.in'))$jq('#profile_user_more_menu_bl').collapse('hide');
    }

    /* Block user */
    this.isBlockedProfile = function(){
        return $this.guid!=$this.uid && $this.isBlocked;
    }

    this.confirmBlockUserAction = function($btn){
        var t=0;
        if($btn.data('tooltip')){
            $btn.blur();
            t=100;
        }
        var msg={
            block_visitor_user : l('do_you_want_to_block_the_user'),
            user_unblock : l('the_user_will_be_unblocked')
        }
        setTimeout(function(){
            confirmCustom(msg[$btn.data('cmd')],function(){$this.blockUser($btn)},l('are_you_sure'))
        },t)
    }

    this.confirmBlockUser = function($btn){
        if($this.requestAjax['blocked'])return;
        $this.confirmBlockUserAction($btn);
    }

    this.confirmBlockUserFromList = function($btn){
        var uid=$btn.data('uid'),layer='#list_user_item_layer_action_'+uid;
        if($(layer).is('.to_show'))return;
        $btn.data('layer',layer);
        $this.confirmBlockUserAction($btn);
    }

    this.blockUser = function($btn,uid,cmd,call,reqData){
        var isLayer=false, $layer=[];
        $btn=$btn||[];
        if($btn[0]){
            isLayer=$btn.data('layer');
        }
        if($this.requestAjax['blocked']&&!isLayer)return;
        if(!isLayer)$this.requestAjax['blocked']=true;
        var cmdCur, groupId=0;
        if($btn[0]){
            uid=$btn.data('uid');
            cmdCur=$btn.data('cmd');
            if(isLayer){
                $layer=$($btn.data('layer'));
                $layer.addClass('to_show').addChildrenLoader();
            } else{
                addChildrenLoader($btn, false);
            }
            groupId=$btn.data('groupId')==undefined?0:$btn.data('groupId');
        }else{
            cmdCur=cmd;
        }

        var data={user_id:uid,user_to:uid};
        if(typeof reqData == 'object'){
            for (var k in reqData) {
                if(k=='group_im_id')groupId=reqData[k];
                data[k]=reqData[k];
            }
        } else if(groupId) {
            data['group_im_id']=groupId;
        }

        $.post(urlMain+'ajax.php?cmd='+cmdCur,data,function(res){
            var data = checkDataAjax(res);
            if(data){
                if(cmd && (cmd=='block_visitor_user' || cmd=='block_user_group')) {
                    alertCustom(l('the_user_has_been_blocked'));
                }
                if (groupId) {
                    if(cmd=='block_user_group' || cmdCur == 'block_user_group'){
                        clGroups.updateListSubscribeFromBlockedUser(data);
                    }
                } else {
                    $this.blockUserResponse(uid,$btn,cmdCur,data);
                }
                if(typeof call=='function')call()
            }else{
                if(isLayer){
                    $layer.removeClass('to_show').removeChildrenLoader();
                }
                alertServerError(true)
            }
            if(!isLayer && $btn[0]){
                removeChildrenLoader($btn);
            }
            if(!isLayer)$this.requestAjax['blocked']=false;
        })
    }

    this.blockUserResponse = function(uid, $btn, cmdCur, data){
        var title=l('profile_menu_user_unblock'),
            cmd='user_unblock',
            msg=l('the_user_has_been_blocked');
        if (cmdCur=='user_unblock') {
            title=l('menu_user_block_edge');
            cmd='block_visitor_user';
            msg=l('the_user_has_been_unlocked');
            $jq('#bl_user_blocked').removeClass('to_show');
            $this.isBlocked = 0;
        }else{
            $jq('#update_server').append($(data.script).filter('script'));
            $jq('#bl_user_blocked').addClass('to_show');

            $this.updateLinkFavorite(l('tooltip_add_favorite'));

            clFriends.updateLink('request', l('menu_friends_add_edge'), 0);
            $this.isBlocked = 1;
        }
        if ($btn[0]) {
            alertCustom(msg, l('alert_html_done'));
        }

        $this.showPostWall(uid, cmdCur, data.wall_only_post);
        if(cmdCur=='block_visitor_user'){
            clPages.pageFriendsReloadCheckUser($this.guid);
        }

        $jq('.menu_user_block_edge, .menu_user_unblock_edge').each(function(){
            var $btn=$(this).data('cmd',cmd).attr('data-cmd',cmd);
            if($btn.data('tooltip')){
                $btn.tooltip('hide').attr('data-original-title', title);
            }else{
                $btn.find('.btn_title').text(title);
            }
            $btn.find('i').toggleClass('fa-times-circle fa-ban');
        })
    }

    this.showPostWall = function(uid, action, wall_only_post){
        if(typeof clWall != 'object')return;
        clWall.showPostBlockedUser(uid, action, wall_only_post);
    }
    /* Block user */

    /* Favorite */
    this.actionFavorite = function($btn){
        if($btn.is('.disabled'))return;
        addChildrenLoader($btn.addClass('disabled'));
        if($btn.data('tooltip'))$btn.blur();
        var uid=$btn.data('uid');

        $.post(url_ajax+'?cmd=favorite_action',{user_id:uid},function(res){
            var data = checkDataAjax(res);
            if(data){
                var title=l('tooltip_add_favorite');
                if (data == 'add') {
                    title=l('tooltip_remove_favorite');
                }
                $this.updateLinkFavorite(title);
            }else{
                alertServerError(true)
            }
            removeChildrenLoader($btn.removeClass('disabled'));
        })
    }

    this.updateLinkFavorite = function(title){
        $jq('.menu_favorite_add_edge, .menu_favorite_remove_edge').each(function(){
            var $btn=$(this);
            if($btn.data('tooltip')){
                $btn.tooltip('hide').attr('data-original-title', title);
            }else{
                $btn.find('.btn_title').text(title);
            }
            $btn.find('i.fa-star').toggleClass('active');
        })
    }
    /* Favorite */

    /* Report */
    this.reportUserId = 0;
    this.reportPhotoId = 0;
    this.openReport = function(uid, pid, $btn) {
        $this.reportUserId=uid||0;
        $this.reportPhotoId=pid||0;
        $btn=$btn||[];

        var isAjax = pid ? $this.requestAjax.reportMedia[pid] : $this.requestAjax.report;

        if(isAjax)return;
        if($btn[0] && $btn.is('.disabled'))return;

        var title = l('report_this_user_to_the_administrator');
        if (clProfilePhoto.isShowGallery) {
            title = clProfilePhoto.ppGalleryIsVideo ? l('report_this_video_to_administrator') : l('report_this_photo_to_administrator');
        }else if (clGroups.getId()) {
            title = clGroups.isPage() ? l('report_this_page_to_administrator') : l('report_this_group_to_administrator');
        }

        $('.modal-title', $this.$ppUserReport).text(title);
        $this.$ppUserReportMsg.val('').change();
        $this.$ppUserReport.modal('show');
    }

    this.closeReport = function() {
        $this.$ppUserReport.modal('hide')
    }

    this.cancelReport = function() {
        var msg=$this.$ppUserReportMsg.val();
        if(trim(msg)){
            $this.$ppUserReportMsg.val('').change();
        }else{
            $this.closeReport();
        }
    }

    this.checkCloseReport = function() {
        if ($this.$ppUserReport[0] && $this.$ppUserReport.is('.in')) {
            var msg=trim($this.$ppUserReportMsg.val());
            return msg ? true : false;
        }
        return false;
    }

    this.sendReport = function() {
        var uid=$this.reportUserId,
            pid=$this.reportPhotoId,
            msg=trim($this.$ppUserReportMsg.val());
        $this.closeReport();
        if (pid) {
            $this.requestAjax.reportMedia[pid] = 1;
        } else {
            $this.requestAjax.report=1;
        }
        if(pid) {
            clProfilePhoto.$el.linkReport.addChildrenLoader();
        }
        $.post(url_ajax+'?cmd=report_user',
               {user_to : uid, msg : msg, photo_id: pid},
                function(res){
                    if(checkDataAjax(res)){
                        setTimeout(function(){
                            alertCustom(l('report_sent'),l('alert_success'))
                        },220);
                        if(pid){
                            clProfilePhoto.setDataReports(pid);
                        }else{
                            $('.menu_user_report_edge').each(function(){
                                var $el=$(this);
                                if ($el.closest('.mn_circle')[0] || $el.closest('.circle')[0]) {
                                    $el.addClass('disabled');
                                } else {
                                    $el.remove();
                                }
                            })
                        }
                    }
                    if (pid) {
                        clProfilePhoto.$el.linkReport.removeChildrenLoader();
                        $this.requestAjax.reportMedia[pid]=0;
                    } else {
                        $this.requestAjax.report=0;
                    }
        })
    }
    /* Report */

    /* Banner show */
    this.actionBanner=false;
    this.visibleBanners = function($link){
        if($this.actionBanner)return;
        $this.actionBanner=true;
        addChildrenLoader($link);

        if(!userAllowedFeature['kill_the_ads']){
            redirectToUpgrade();
            return;
        }

        var $banner=$link.parent('.link').prev('.banner_footer, .bl_ads'),
            isVisible=$banner[0]&&$banner.is(':visible')?1:0;

        //$this.hideBannerOne($('.banner_footer'));
        //$this.hideBannerOne($('.bl_ads'));
        //return;

        $.post(url_main + 'ajax.php?cmd=ads_visible', {status: isVisible}, function(res){
            var data = checkDataAjax(res);
            if(data !== false) {
                if (data == 'upgrade') {
                    redirectToUpgrade();
                } else if(isVisible) {
                    $this.hideBannerOne($('.banner_footer'));
                    $this.hideBannerOne($('.bl_ads'));
                } else {
                    location.reload();
                }
            } else {
                removeChildrenLoader($link);
                alertServerError();
            }
            $this.actionBanner=false;
        })

    }

    this.hideBannerOne = function($banner){
        if (!$banner[0]) {
            return false;
        }
        var $bannerBl=$banner.is('.banner_footer') ? $banner.parent('.banner_footer_bl') : $banner;

        $bannerBl.slideUp(450,0,function(){
            var $el=$(this),
                $link=$el.parent('div').find('.link_show_banner');
            removeChildrenLoader($link);
            $link.find('.title_bn').text(l('show_ads'));
            $link.addClass('action_show');
            $el.remove();
        })
        return true;
    }
    /* Banner show */

    this.sendMessages = function($btn){
        var uid=$this.uid==$this.guid?0:$this.uid;
        sendMessages(uid, $btn);
    }

    this.openPopupEditorVerification = function(){
        $jq('#pp_profile_verification')
        .one('shown.bs.modal',function(){
        }).on('hidden.bs.modal', function(){
        }).modal('show');
    }

    this.closePopupEditorVerification = function(){
        $jq('#pp_profile_verification').modal('hide');
    }

    this.verifyAccount = function() {
        var url = $('select[name="profile_verification_system"]', '#pp_profile_verification').val();
        if(url) {
            $jq('#btn_verify_account').addChildrenLoader();
            redirectUrl('social_login.php?redirect=' + url + '&page_from=' + location.href);
        }
        return false;
    }

    this.updateStatusLiveProfile = function(uid,live) {
        var $el=$('a.mn_circle.menu_live_streaming_edge[data-uid="'+uid+'"], a.menu_live_streaming_edge[data-uid="'+uid+'"]');
        if ($el[0]) {
            $el.each(function(){
                var $m=$(this),
                    title = live ? l('tooltip_live_streaming_edge') : l('tooltip_live_streaming_disabled_edge');
                $m[live?'removeClass':'addClass']('disabled');
                $m.attr('href', live ? live : '#');
                if ($m.is('.mn_circle')) {
                    $m.children('span[data-tooltip]').attr('data-original-title', title);
                } else {
                    var $btnTitle = $m.find('.btn_title');
                    if ($btnTitle[0]) {
                        $btnTitle.text(title);
                    }
                }
            })
        }
    }

    $(function(){
        $this.$ppUserReport=$('#pp_user_report');
        if($this.$ppUserReport[0]){
            $this.$ppUserReportMsg=$jq('#pp_user_report_msg').on('change propertychange input', function(){
                if(trim($this.$ppUserReportMsg.val())){
                    $jq('#pp_user_report_cancel_title').text(l('reset'));
                    $jq('#pp_user_report_send').prop('disabled', false);
                }else{
                    $jq('#pp_user_report_cancel_title').text(l('cancel'));
                    $jq('#pp_user_report_send').prop('disabled', true);
                }
            })
        }
    })

    return this;
}