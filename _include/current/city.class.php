<?php
class City extends CityBase
{
    public $isLoadCity = false;
    static $isAllowLoad = true;
    static $isMobile = false;
    static $setPluginPlatform = 0;
	static $geoInfo = array();

	static $keyVisitorUid = 'visitor_city_user_id';
	static $keyVisitorHash = 'visitor_city_user_hash';
    static $usersVisitedRooms = null;

    /* User visitor */
    static function logoutVisitorUser()//no plugin
	{
        set_session(self::$keyVisitorUid, 0);
		set_session(self::$keyVisitorHash, 0);
		set_cookie(self::$keyVisitorUid, '', -1);
        set_cookie(self::$keyVisitorHash, '', -1);
    }

	static function loginVisitorUserShowCity()//no plugin
	{
		global $g;
		global $g_user;
		global $p;

        if (Common::isOptionActive('allow_only_registered_members', '3d_city')) {
            return false;
        }

		$allowPage = array('ajax.php', 'avatar_face_save.php');
        $isPageCity = self::isCityInTab();

        $uid = get_session(self::$keyVisitorUid);
		$hash = get_session(self::$keyVisitorHash);
		if (!$uid || !$hash) {
			$uid = get_cookie(self::$keyVisitorUid);
            $hash = get_cookie(self::$keyVisitorHash);
		}
        if ($uid && self::logout($allowPage)) {
            $g_user['user_id'] = $uid;
            $g_user['visitor_city_user'] = true;
        }

		if (!$isPageCity && !in_array($p, $allowPage)) {
			return false;
		}

		//set_session(self::$keyVisitorUid, 0);
		//set_session(self::$keyVisitorHash, 0);
		//set_cookie(self::$keyVisitorUid, '', -1);
        //set_cookie(self::$keyVisitorHash, '', -1);
		//die();

		$place = get_param('place');
		$data = array();
		if ($isPageCity) {
			if (!$place) {
				return false;
			}
			$data = self::getDataPlace($place);
			if (!$data) {
				return false;
			}
		}

        $gender = '';
		if ($uid && $hash) {
			$sql = 'SELECT `gender`
					  FROM ' . self::getTable('city_users') . '
					 WHERE `id` = ' . to_sql($uid) . ' AND `hash` = ' . to_sql($hash);
			$gender = DB::result($sql);
			if ($gender && in_array($p, $allowPage)) {
				self::setInfoVisitorUser($uid, $hash, $gender);
				return true;
			}
		}

		if (!$isPageCity) {
			return false;
		}

		unset($data['id']);
		unset($data['system']);
        unset($data['temp']);
        unset($data['created']);
        unset($data['hash']);


        //Check the available space on the platform
        //to make a separate method -> getAvailablePosOnMap
        if (self::isLocationPlatform($data['location'])) {
            $allowedPos = self::getAvailablePosOnMap(json_decode($data['pos_map'], true));
            if (!$allowedPos) {
                $toLocationInfoPos = json_decode($data['pos_map'], true);
                $allowedPos = self::getPanoInRadiusHeading($toLocationInfoPos['lat'], $toLocationInfoPos['lng']);
                $data['pos_map'] = self::jsonEncodeParam($allowedPos['pos_map']);
                $data['platform'] = $allowedPos['platform'];
                $data['water_loc'] = 0;
            }
        }

		$position = self::calcUserInfoByDistance($data['location'], $data['platform'], $data['pos_map']);
		$html = null;
		$isError = self::checkMediaServerError($html, $position, false);
		if ($isError) {
            $position = array('pos' => array(0, 0), 'rot' => 0);
		}

        DB::update(self::getTable('city_link', true), array('created' => date('Y-m-d H:i:s'), 'temp' => 0), '`hash` = ' . to_sql($place));
        $data['pos'] = self::jsonEncodeParam($position['pos']);
		$data['rot'] = $position['rot'];
        if ($gender) {
            $data['cuid'] = $uid;
            self::addRoomInfo($data);
            //DB::update(self::getTable('city_users'), $data, '`id` = ' . to_sql($uid) . ' AND `hash` = ' . to_sql($hash));
        } else {
            $gender = CityUser::getGenderVisitorUser();
            $g_user['gender'] = $gender;
            $dataUser = array();
            $dataUser['gender'] = $gender;
            $dataUser['face'] = self::getRandomAvatarFaceDefaultId();
            $dataUser['cap'] = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('cap'))));
            $dataUser['type'] = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('type'))));
            $cityInfo = IP::geoInfoCity();
            $dataUser['city'] = $cityInfo['city_title'];
            DB::insert(self::getTable('city_users'), $dataUser);
            $uid = DB::insert_id();
            $hash = md5($uid . '_' . microtime());
            DB::update(self::getTable('city_users'), array('hash' => $hash), '`id` = ' . to_sql($uid));
            $data['cuid'] = $uid;
            self::addRoomInfo($data);
            //die();
        }
        self::setInfoVisitorUser($uid, $hash, $gender);
		return true;
	}

	static function setInfoVisitorUser($uid, $hash, $gender = null)//no plugin
	{
		global $g;
		global $g_user;
		if ($gender === null) {
			$sql = 'SELECT `gender`
					  FROM ' . self::getTable('city_users') . '
					 WHERE `id` = ' . to_sql($uid);
			$gender = DB::result($sql);
		}
		set_session(self::$keyVisitorUid, $uid);
		set_session(self::$keyVisitorHash, $hash);
        set_cookie(self::$keyVisitorUid, $uid);
        set_cookie(self::$keyVisitorHash, $hash);
		$g_user['user_id'] = $uid;
		$g_user['city_user_id'] = $uid;
		$g_user['gender'] = $gender;
		$g_user['visitor_city_user'] = true;
	}

    static function updateGenderUser($isUpdate = true){//no plugin
        global $g, $g_user;

        $gender = get_param('gender');
        if (!$gender) {
            return false;
        }

        $responseData = false;

        $g_user['gender'] = $gender;
        $faceId = self::getRandomAvatarFaceDefaultId();
        $capId = self::getIdImageReadFile(array_rand(array_flip(City::getImagesAvatarModel('cap'))));
        $typeId = self::getIdImageReadFile(array_rand(array_flip(City::getImagesAvatarModel('type'))));
        $data = array('type' => $typeId,
                      'face' => $faceId,
                      'cap' => $capId,
                      'default' => 1,
                      'gender' => $gender
                );
        DB::update(self::getTable('city_users'), $data, '`id` = ' . to_sql($g_user['user_id']));
        $responseData = self::getUsersListInLocation(0, true);
        $responseData['cam_type'] = self::getCamType();
        return $responseData;
    }
    /* User visitor */

    static function getLastNewMessageInfo()
    {
		global $g_user;
		$info = array('id' => 0, 'uid' => 0, 'message' => '');
		if ($g_user && Common::isModuleCityActive() && Common::isApp()) {
			$sql = 'SELECT CM.*, CU.user_id
					  FROM `' . self::getTable('city_msg') . '` AS CM
				      LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = CM.from_user
					 WHERE CM.is_new = 1
				       AND CM.to_user = ' . to_sql(self::getUidInCity()) . '
					   AND CM.to_user_deleted = 0 ORDER BY CM.id DESC';
			$msg = DB::row($sql);
			if ($msg) {
				$info['id'] = $msg['id'];
                $info['uid'] = $msg['from_user'];
				$name = $msg['user_id'] ? User::getInfoBasic($msg['user_id'], 'name') : CityUser::getNameVisitorUser($info['uid']);
				$info['message'] = addslashes(lSetVars('app_notification_text_city', array('name' => User::nameShort($name))));
			}
		}
        return $info;
    }

    /* Writing */
    static function setWriting()
	{
		$status = get_param('status_writing');
        $location = get_param('location');
		if ($status && $location) {
            $status = json_decode($status, true);
            $where =  '`from_user` = ' . to_sql(self::getUidInCity()) . self::$demoWhere;
			$lastWritingUsers = DB::select(self::getTable('city_open'), $where, '', '', array('to_user', 'last_writing'));
			$statusUsers = array();
			foreach ($lastWritingUsers as $item) {
				$statusUsers[$item['to_user']] = $item['last_writing'];
			}
			foreach ($status as $uid => $lastWriting) {
				if (isset($statusUsers[$uid]) && $statusUsers[$uid] != $lastWriting) {
                    //will integrate into a single update request
					$where = self::getWhereFromMsg($uid);
					DB::update(self::getTable('city_open'), array('last_writing' => $lastWriting), $where);
				}
			}
		}
	}

    static function getWritingUsers()
    {
        $timeoutSecServer = get_param('timeout_server');

        $where = '`to_user` = ' . to_sql(self::getUidInCity()). self::$demoWhere;
        $writingFromUser = DB::select(self::getTable('city_open'), $where, '', '', array('from_user', 'last_writing'));
        $responseWritingFromUsers = array();
        $currentTime = time();
        foreach ($writingFromUser as $user) {
            $responseWritingFromUsers[$user['from_user']] = (($currentTime - $user['last_writing']) <= $timeoutSecServer) ? 1 : 0;
        }

        return $responseWritingFromUsers ;
    }

    static function setWindowEvent()
    {
        if (self::$isPlugin) {
            return true;
        }
		$cityUid = self::getUidInCity();
		if (!$cityUid) {
			return false;
		}

        delses('window_count_city_event_last');
        $lastMsg = self::getLastWatchedMsgId();
        $where = '`to_user` = ' . to_sql($cityUid) .
                 ' AND `id` > ' . to_sql($lastMsg);
        $count = DB::count(self::getTable('city_msg'), $where);
        set_session('window_last_city_msg', $lastMsg);
        set_session('window_count_city_event', $count);
        return true;
    }

    static function getFbModeJs()
    {
        if (self::$isPlugin || self::isVisitorUser()) {
            return '';
        }
        $responseJs = '';
        $isFbMode = get_param('is_fb_mode');
        if ($isFbMode == 'true'){
            $count = City::getCountNewMessages(null, null, get_session('window_last_city_msg'));

            $countEvent = $count - get_session('window_count_city_event', 0);
            $countEventLast = get_session('window_count_city_event_last', 0);

            if ($countEvent || ($countEventLast && !City::getCountNewMessages())) {
                $titleCounter = $countEvent ? lSetVars('title_site_counter', array('count' => $countEvent)) : '';
                $responseJs = "<script>localStorage.setItem('title_site_counter_storage', '" . $titleCounter . "');
                                         $('title').text('" . $titleCounter . " '+siteTitle);</script>";
                set_session('window_count_city_event_last', $countEvent);
            }
        }
        return $responseJs;
    }

	/* UPDATE */
    static function setLastViewedChat($userTo = null, $cityUid = null)
	{
		global $g;
		global $g_user;
		if ($userTo === null) {
			$userTo = get_param('user_to');
		}
		if (!$userTo) {
			return;
		}
		if ($cityUid === null) {
			$cityUid = self::getUidInCity();
		}
		if (!$cityUid) {
			return;
		}
        self::setCurrentData();
        $sql = 'UPDATE `' . self::getTable('city_open') . '` SET `z` = ' . time() .
		       ' WHERE `to_user` = ' . to_sql($userTo)
               . ' AND `from_user` = ' . to_sql($cityUid)
               . self::$demoWhere;
		DB::execute($sql);
	}

    static function saveAvatar()
    {
        global $g_user;
        $responseData = false;
        $params = get_param_array('params');
        $cityUid = self::getUidInCity();
        if ($cityUid && $params) {
            if (self::$isPlugin) {
                $params['face'] = $params['face_id'];
                $camType = null;
                if(isset($params['gender'])){
                    $params['gender'] = mb_strtoupper($params['gender'], 'UTF-8');
                    $g_user['gender'] = $params['gender'];
                    DB::update(self::getTable('user'), array('gender' => $params['gender'], 'is_choice_gender' => 1), 'user_id = ' . to_sql($g_user['user_id']));
                    $camType = self::getCamType($params['gender']);
                    unset($params['gender']);
                }
                unset($params['face_id']);
                unset($params['head_color']);
                unset($params['is_choice_gender']);
                $where = '`id` = ' . to_sql($cityUid);
                DB::update(self::getTable('city_users'), $params, $where);
                $responseData = self::getUsersListInLocation(0, true);
                $responseData['cam_type'] = $camType;
                if ($camType === null) {
                    $responseData['cam_type'] = self::getCamType();
                }
            } else {
                $params['face'] = $params['face_id'];
                unset($params['face_id']);
                unset($params['head_color']);
                $where = '`id` = ' . to_sql($cityUid);
                DB::update(self::getTable('city_users'), $params, $where);
                $responseData = true;
            }
        }
        return $responseData;
    }

    static function getSqlOpenChat($location, $posMap, $fields = null)
	{
		global $g;
        global $g_user;

        $cityUid = get_param('city_uid');
        $where = '';
        if ($fields === null) {
            $fields = 'CO.*';
        }

		$cityUid = get_param('city_uid');

		if (self::isLocationPlatform($location) && $posMap) {
			$where = ' AND CINR.pos_map = ' . to_sql($posMap);
		}
        $sql = "SELECT {$fields}
                  FROM `" . self::getTable('city_open') . "` AS CO
                  LEFT JOIN `" . self::getTable('city_users') . "` AS CU ON CU.id = CO.to_user
                  LEFT JOIN `" . self::getTable('city_users_in_rooms') . "` AS CINR ON CINR.cuid = CO.to_user
                 WHERE CO.from_user = " . to_sql($cityUid)
               . ' AND CO.mid > 0 '
               . self::$demoWhere
               . self::getWhereLastVisit('CINR')
               . self::getWhereOnlyManages($location, 'CU')
               . ' AND CINR.location = '  . to_sql($location)
			   . $where
               . self::getGroupByForDemo()
               . ' ORDER BY `z` DESC, CINR.last_visit DESC';
        return $sql;
    }

    static function getListOpenChatInLocation($location, $posMap, $numMsg = true)
	{
        global $g_user;

        $responseData = array();
        if ($location) {
            $sql = self::getSqlOpenChat($location, $posMap, 'CO.to_user AS user_id, CINR.pos_map AS pos_map');
            $users = DB::rows($sql);
            foreach ($users as $user) {
                $uid = $user['user_id'];
                $responseData[$uid] = array('pos_map' => $user['pos_map']);
                if ($numMsg) {
                    $responseData[$uid]['num_msg'] = self::getCountMsgChat($uid);
                }
            }
        }
        return $responseData;
    }

	static function openChat($userId, $mid = 1, $midTo = 0, $isUpdate = true, $userFrom = null, $z = null)
	{
		global $g;
		global $g_user;

        if ($userFrom === null) {
 			$userFrom = self::getUidInCity();
		}
		if ($userFrom) {
            if ($z === null) {
                $z = time();
            }
            $where = '`to_user` = ' . to_sql($userId) .
					 ' AND `from_user` = ' . to_sql($userFrom) . self::$demoWhere;
			$isChat = DB::count(self::getTable('city_open'), $where);
			if ($isChat) {
                if ($isUpdate) {
                    DB::update(self::getTable('city_open'), array('mid' => $mid, 'z' => $z), $where, '', 1);
                }
			} else {
                $sql = "INSERT INTO `" . self::getTable('city_open') . "`
						   SET `to_user`= " . to_sql($userId) . ",
							   `from_user` = " . to_sql($userFrom) . ",
							   `mid` = " . $mid . ",
							   `z` = " . $z . self::$demoInsert;
				DB::execute($sql);
			}

            $where = '`from_user` = ' . to_sql($userId) .
					 ' AND `to_user` = ' . to_sql($userFrom)
                     . self::$demoWhere;
			$isChat = DB::count(self::getTable('city_open'), $where);
			if (!$isChat) {
                $sql = 'INSERT INTO `' . self::getTable('city_open') . '`
						   SET `from_user` = ' . to_sql($userId) . ',
							   `to_user` = ' . to_sql($userFrom) . ',
                               `mid` = ' . $midTo . ",
                               `z` = " . $z . self::$demoInsert;
				DB::execute($sql);
			}
		}
	}

    static function addMessageToDb($userTo, $msg, $date, $send, $userFrom = null)
    {
		global $g;
        global $g_user;

        $userToSql = to_sql($userTo);
        if ($userFrom === null) {
            $userFrom = self::getUidInCity();
        }
        self::openChat($userTo, 1, 0, true, $userFrom);

        $gUserSql = to_sql($userFrom);
        $sql = 'INSERT INTO `' . self::getTable('city_msg') . '`
				   SET `from_user` = ' . $gUserSql . ',
                       `to_user` = ' . $userToSql . ',
                       `send` = ' . to_sql($send) . ',
					   `born` = ' . to_sql($date) . ',
					   `msg` = ' . to_sql($msg) . ',
                       `is_new` = 1';
        DB::execute($sql);

        $lastMid = DB::insert_id();
        if (self::isDemo()){
            /*$locations = DB::field(self::getTable('city_rooms'), 'id');
            $demoUsers = array();
            foreach ($locations as $location) {
                $demoUsers = array_merge($demoUsers, self::getDemoUsersWhoSendMessages($location));
            }*/
            $demoUsers = DB::field(self::getTable('city_users'), 'id', '`demo` = 1');
            if (!in_array($userFrom, $demoUsers)) {
                Demo::addCityMessage($userFrom, $userTo, $date, $msg);
            }
        }
        $where = '`to_user` = ' . $gUserSql .
                 ' AND `from_user` = ' . $userToSql . self::$demoWhere;
        $sqlData = array('mid' => $lastMid);

        DB::update(self::getTable('city_open'), $sqlData, $where, '', 1);

        return $lastMid;
    }

	static function addMessage(&$html, $userTo = null, $userFrom = null, $msg = null, $isSendDemo = false)
    {
        if ($userTo === null) {
            $userTo = get_param('user_to');
        }
        if ($userFrom === null) {
            $userFrom = self::getUidInCity();
        }
        if ($msg === null) {
            $msg = trim(get_param('msg'));
        }

		if ($userTo && $msg) {
            $row = array();
            //CStatsTools::count('im_messages');
            if(!$isSendDemo) {
            $msg = str_replace("<", "&lt;", $msg);
            $msg = censured($msg);
            }

			$date = date('Y-m-d H:i:s');
            $send = get_param('send', time() . rand(1, 100));
            $lastMid = self::addMessageToDb($userTo, $msg, $date, $send, $userFrom);

            if($lastMid) {
                $userToSiteUserId = CityUser::getSiteUserIdByCityUserId($userTo);
                $userInfo = User::getInfoBasic($userToSiteUserId);
                if($userInfo && User::isOptionSettings('set_notif_push_notifications', $userInfo)) {
                    PushNotification::sendCity($userToSiteUserId, Common::replaceByVars(l('app_notification_text_city', loadLanguageSiteMobile($userInfo['lang'])), array('name' => User::nameShort(guser('name')))));
                }
            }

            if (!$isSendDemo) {
                $row = array('from_user' => $userFrom,
                             'to_user' => $userTo,
                             'user_id' => $userFrom,
                             'msg' => $msg,
                             'id' => $lastMid,
                             'send' => $send,
                             'born' => $date,
                             'is_new' => 1,
                         );
                if (self::isVisitorUser()) {
                    $row['user_id'] = 0;
                }
                self::parseMsg($html, $row);

                $html->setvar('message_list_user_to', $userTo);
                $html->parse('message_list');
            }
		}
	}

    static function parseMsg(&$html, $row, $isParsePhoto = false)
    {
		global $g_user;

		if (!empty($row) && is_array($row)) {
            if (Common::isApp()) {
                $msg = to_html($row['msg']);
            } else {
                $msg = Common::parseLinksTag(to_html($row['msg']), 'a', '&lt;', 'parseLinks');
            }
            $isMyMsg = $row['from_user'] == self::getUidInCity();
            $blockMsg = 'message';

            $html->setvar("{$blockMsg}_id", $row['id']);
            $html->setvar("{$blockMsg}_send", $row['send']);
            $html->setvar("{$blockMsg}_text", $msg);
            $html->setvar("{$blockMsg}_from_user_id", $row['from_user']);
            $html->setvar("{$blockMsg}_to_user_id", $row['to_user']);

            if ($row['is_new'] == 0 && $isMyMsg) {
				$html->clean("{$blockMsg}_read");
			} else {
				$html->parse("{$blockMsg}_read", false);
			}

            $sizePhoto = self::$isMobile ? 'm' : 'r';
            $uidPhoto = $row['from_user'];
            if ($row['user_id']) {
                $uidPhoto = $row['user_id'];
            }
            if ($isMyMsg) {
                if (self::$isMobile) {
                    $userPhoto = self::getPhotoDefault($uidPhoto, $g_user['gender'], false, $sizePhoto, $row['user_id']);
                    $html->setvar("{$blockMsg}_user_photo", $userPhoto);
                }
                if ($html->blockExists("{$blockMsg}_my")) {
                    $html->parse("{$blockMsg}_my", false);
                }
                $html->setvar("{$blockMsg}_from_no_first", '');
                $html->parse("{$blockMsg}_to", false);
                $html->clean("{$blockMsg}_user_photo");
                $html->clean("{$blockMsg}_from");
            } else {
                if ($isParsePhoto) {
                    $classFromItem = 'from_first';
                    //$userInfo = User::getInfoFull($row['from_user']);
					$userInfo = CityUser::getInfoFull($row, $row['from_user']);
					$html->setvar("{$blockMsg}_profile_link", $userInfo['profile_url']);
                    $html->setvar("{$blockMsg}_user_name", $userInfo['name_delimiter']);
                    $html->setvar("{$blockMsg}_user_age", $userInfo['age']);
                    $html->setvar("{$blockMsg}_user_city", $userInfo['city']);
                    $userPhoto = self::getPhotoDefault($uidPhoto, $userInfo['gender'], false, $sizePhoto, $row['user_id']);
                    $html->setvar("{$blockMsg}_user_photo", $userPhoto);
                    $html->parse("{$blockMsg}_user_photo", false);
                } else {
                    $classFromItem = 'from_no_first';
                    $html->clean("{$blockMsg}_user_photo");
                }
                $html->setvar("{$blockMsg}_from_new", $row['is_new'] ? 'message_from_new' : '');
                $html->setvar("{$blockMsg}_from_no_first", $classFromItem);
                $html->parse("{$blockMsg}_from", false);
                $html->clean("{$blockMsg}_to");
                $html->clean("{$blockMsg}_my");
            }
            //$html->setvar("{$blockMsg}_to_user_id", $isMyMsg ? $row['to_user'] : $row['from_user']);
			//$html->setvar("{$blockMsg}_update", $update);

			/*if ($js) {
				$html->parse($blockMsg . '_ajax', false);
			}*/
			$html->parse($blockMsg, true);
		}
	}

    static function parseMessages(&$html, $userFrom, $userTo, $num = 0)
    {
		global $g;
		global $g_user;

        $countHistory = Common::getOption('3dcity_history_messages', '3d_city');
        $countMsg = DB::count(self::getTable('city_msg'), self::getWhereFromToMsg($userTo));
        if ($countMsg > $countHistory) {
            DB::delete(self::getTable('city_msg'), self::getWhereFromToMsg($userTo), 'id', $countMsg - $countHistory);
        }

        $sql = self::getWhereAllMessages($userFrom, $userTo);
        $rows = DB::rows($sql, 2);
        if (self::$isMobile) {
            krsort($rows);
        }
        $block = 'message_list';
        $i = 0;
		$cityUid = self::getUidInCity();
        foreach ($rows as $key => $row) {
            $isParsePhoto = false;
            if ($row['from_user'] != $cityUid) {
                if (!$i || $prevMsgUid == $cityUid) {
                    $isParsePhoto = true;
                }
            }
            self::parseMsg($html, $row, $isParsePhoto);

            $prevMsgUid = $row['from_user'];
            $i++;
        }
        $html->setvar("{$block}_user_to", $userTo);

        if ($num) {
            $html->parse("{$block}_not_active", false);
        }
        $html->parse($block);
        $html->clean("{$block}_not_active");
        $html->clean('message');
	}

    static function getWhereAllMessages($userFrom, $userTo)
    {
        $orderSql = 'ASC';
        if (self::$isMobile) {
            $orderSql = 'DESC LIMIT 3';
        }
        $sql = '(SELECT CM.*, CM.id AS mid, CU.gender, CU.user_id, CU.city FROM `' . self::getTable('city_msg') . '` AS CM
				   LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = ' . to_sql($userFrom) . '
				  WHERE CM.to_user = ' . to_sql($userTo) .
				  ' AND CM.from_user = ' . to_sql($userFrom) . '
					AND CM.from_user_deleted = 0)
				  UNION
				(SELECT CM.*, CM.id AS mid, CU.gender, CU.user_id, CU.city FROM `' . self::getTable('city_msg') . '` AS CM
				   LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = ' . to_sql($userTo) . '
				  WHERE CM.to_user = ' . to_sql($userFrom) .
				  ' AND CM.from_user = ' . to_sql($userTo) . '
					AND CM.to_user_deleted = 0)
				  ORDER BY mid ' . $orderSql;
        return $sql;
    }

    function parseChat(&$html, $location = null, $userId = null, $isParseMsg = true, $posMap = null)
	{
        global $g, $g_user;

        if ($userId === null) {
            $userId = get_param('user_to');
        }

        if ($location === null) {
            $location = get_param('location');
        }

		$cityUid = self::getUidInCity();
        if (!$location || !$cityUid) return;

		$html->setvar('user_id', $cityUid);//???
        $rows = null;
		if ($userId) {
            $update = get_param('update');
            //??? not need
            if ($update) {
                $sql = 'SELECT `to_user`
                          FROM `' . self::getTable('city_open') . '`
                         WHERE `from_user` = ' . to_sql($cityUid) .
                         ' AND `mid` > 0 ' . self::$demoWhere
                     . ' ORDER BY `z` DESC  LIMIT 1';
                $lastUid = DB::result($sql);
                if ($lastUid) {
                    self::setLastViewedChat($lastUid);
                }
            }
            $midTo = 0;
            $z = null;
            if (self::getCountMsgChat($userId) && $update == 3) {
                $z = 0;
            } else {
                $midTo = 1;
                $z = 0;
                self::openChat($userId, 1, 1, true, null, 0);
            }

            self::openChat($userId, 1, $midTo, true, null, $z);

            self::actionNotOpenChats($cityUid, $userId, false);
			$sql = 'SELECT CO.*, CU.gender, CU.user_id, CU.city
                      FROM `' . self::getTable('city_open') . '` AS CO
                      LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = CO.to_user
                     WHERE CO.from_user = ' . to_sql($cityUid)
				   . ' AND CO.to_user = ' . to_sql($userId)
                   . ' AND CO.mid > 0 ' . self::$demoWhere
                   . ' ORDER BY `z` DESC';

        } else {
            if ($posMap == null) {
                $posMap = self::getPosMapParam();
            }
            $whereSql = '';
            if (self::isLocationPlatform($location) && $posMap) {
                $whereSql = ' AND CINR.pos_map = ' . to_sql($posMap);
            }
            self::closeEmptyChat($cityUid, false);
            $sql = 'SELECT CO.*, CU.gender, CU.user_id, CU.city
                      FROM `' . self::getTable('city_open') . '` AS CO
                      LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = CO.to_user
                      LEFT JOIN `' . self::getTable('city_users_in_rooms') . '` AS CINR ON CINR.cuid = CU.id
                     WHERE CO.from_user = ' . to_sql($cityUid)
                   . ' AND CO.mid > 0 ' . self::$demoWhere
                   . self::getWhereLastVisit('CINR')
                   . self::getWhereOnlyManages($location, 'CU')
                   . ' AND CINR.location = '  . to_sql($location)
                   . $whereSql
                   . ' ORDER BY `z` DESC, CINR.last_visit DESC '
                   . ' LIMIT ' . to_sql(self::$numberOpenChats, 'Number');

            $rows = DB::all($sql, 5);
            $numberNeedOpenChats = self::$numberOpenChats - count($rows);
            if ($numberNeedOpenChats > 0) {
                $notUser = '';
                $notChats = self::getNotOpenChats($cityUid);
                if ($rows) {
                    foreach ($rows as $row) {
                        $key = array_search($row['to_user'], $notChats);
                        if ($key === false) {
                            $notChats[] = $row['to_user'];
                        }
                    }
                }
                if ($notChats) {
                    $notUser = '`cuid` NOT IN (' . implode(',', $notChats) . ') AND ';
                }
                $needUserOpenChat = self::getUserOnline($location, $posMap, true, $notUser, $numberNeedOpenChats, '`last_visit` DESC');
                if (is_array($needUserOpenChat)) {
                    foreach ($needUserOpenChat as $uid) {
                        self::openChat($uid, 1, 1, true, null, 0);
                    }
                }
                $rows = null;
            }
        }
        // Replaced by self::getUsersListInLocation
        if ($rows === null) {
            $rows = DB::all($sql, 5);
        }
        $rows = self::groupChatForDemo($rows, $cityUid);
        if (self::$isMobile && !$userId && $rows) {
            $keys = array_keys($rows);
            krsort($rows);
            $rows = array_combine($keys, $rows);
        }

        $blockListUser = 'list_users_item';
        $curUserTo = 0;
        $numberUsers = count($rows) - 1;
        $i = 0;
        $isApp = Common::isApp();
        for ($j = $numberUsers; $j >= 0; --$j) {
            $i++;
            $row = $rows[$j];

            $realUserId = $row['user_id'];
			$userInfo = CityUser::getInfoFull($row, $row['to_user']);
            $html->setvar("{$blockListUser}_id", $row['to_user']);
            $html->setvar("{$blockListUser}_name", $userInfo['name']);
            if (self::$isPlugin) {
                self::getUserInfoForTitle($userInfo);
                $html->setvar("{$blockListUser}_name_title", $userInfo['name_title']);
                if (self::$isMobile) {
                    if ($userInfo['age']) {
                        $html->setvar("{$blockListUser}_age", $userInfo['age']);
                        $html->parse("{$blockListUser}_age", false);
                    } else {
                        $html->clean("{$blockListUser}_age");
                    }
                }
                if ($userInfo['info_title']) {
                    $html->setvar("{$blockListUser}_info", $userInfo['info_title']);
                    $html->parse("{$blockListUser}_info", false);
                } else {
                    $html->clean("{$blockListUser}_info");
                }
            } else {
                $html->setvar("{$blockListUser}_profile_link", $userInfo['profile_url']);
                if ($userInfo['profile_url']) {
                    $html->parse("{$blockListUser}_profile_link", false);
                } else {
                    $html->clean("{$blockListUser}_profile_link");
                }

                $html->setvar("{$blockListUser}_name_short", $userInfo['name_short']);
                $html->setvar("{$blockListUser}_age", $userInfo['age']);
                $html->setvar("{$blockListUser}_city", $userInfo['city_delimiter']);
                if (!$isApp && $html->blockExists("{$blockListUser}_target")) {
                    $html->parse("{$blockListUser}_target", false);
                }
            }

            /* Photo */
            $uid = $row['to_user'];
            if(self::$isPlugin){
                $userPhotoDefaultId = User::getPhotoDefault($uid, 'm', true, $userInfo['gender'], DB_MAX_INDEX, true);
                $realUserId = true;
            } else {
                if ($realUserId) {
                    $uid = $realUserId;
                }
                $userPhotoDefaultId = User::getPhotoDefault($uid, 'm', true, $userInfo['gender'], DB_MAX_INDEX, true, false, false, !$realUserId);
            }
            $userBlockInfoPhoto = 0;
			$sizePhoto = 'm';//self::$isMobile ? 'r' : 'm';
			if ($userPhotoDefaultId && !self::$isPlugin) {//?????????????????????????????????
				$where = '';
				if ($row['to_user'] != $g_user['user_id']) {
					$where = Common::getOption('photo_vis', 'sql') . " AND private = 'N'";
				}
                $table = self::getTable('photo');
                if (!$realUserId) {
                    $table = self::getTable('city_photo');
                }
				$sql = 'SELECT *
						  FROM ' . $table . '
                         WHERE `user_id` = ' . to_sql($uid) .
                         " AND `visible` = 'Y'
                           AND `photo_id` != " . to_sql($userPhotoDefaultId)
					  . $where
					 . ' LIMIT 1';
				$photoForBlockInfo = DB::row($sql);
				if ($photoForBlockInfo) {
					$userBlockInfoPhoto = Common::getOption('url_files', 'path') . User::getPhotoFile($photoForBlockInfo, $sizePhoto, $userInfo['gender'], DB_MAX_INDEX, !$realUserId);
				}
			}
			$photoDefaultFromCity = self::getPhotoDefault($uid, $userInfo['gender'], false, $sizePhoto, $realUserId);
			if (!$userBlockInfoPhoto) {
				$userBlockInfoPhoto = $photoDefaultFromCity;
			}

			$html->setvar("{$blockListUser}_photo", $photoDefaultFromCity);
            $html->setvar("{$blockListUser}_block_info_photo", $userBlockInfoPhoto);
			/* Photo */
            /* New messages */
            $countMsgNew = self::getCountNewMessages($row['to_user']);
            $hideCounter = 'hide';
            if ($countMsgNew && !$userId) {
                $hideCounter = 'show';
            }
            $html->setvar("{$blockListUser}_new_msg_count", $countMsgNew);
            $html->setvar("{$blockListUser}_new_msg_actived", $hideCounter);
            /* New messages */

            $html->parse($blockListUser);

            if ($isParseMsg) {
                self::parseMessages($html, $row['from_user'], $row['to_user'], $j);
            }

            if (self::$isMobile && $j == $numberUsers){
                $curUserTo = $row['to_user'];
            } elseif (!self::$isMobile && !$j) {
                $curUserTo = $row['to_user'];
            }
        }
        $html->setvar('cur_user_to', $curUserTo);
        if ($this->isLoadCity) {
            /* Hide the controls chat */
            if (!$i) {
                $html->parse('main_chat_hide', false);
                $html->parse('list_chat_hide', false);
            }
            /* Hide the controls chat */
        }
        $html->setvar('history_messages', Common::getOption('3dcity_history_messages', '3d_city'));
    }
    /* Chat */

    static function updateMessages(&$html)
    {
		$cityUid = self::getUidInCity();
		if ($cityUid){
			$isUpdate = false;
            $lastMsgId = intval(get_param('last_msg_id'));

			$sql = 'SELECT CM.*, CU.user_id, CU.gender, CU.city
					  FROM `' . self::getTable('city_msg') . '` AS CM
					  LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = CM.from_user
					 WHERE (
						(CM.to_user = ' . to_sql($cityUid) . ' AND CM.to_user_deleted = 0)
						 OR
						(CM.from_user = ' . to_sql($cityUid) . ' AND CM.from_user_deleted = 0)
					   )
					   AND CM.id > ' . to_sql($lastMsgId) .
				   ' ORDER BY CM.id ASC';
			DB::query($sql, 1);
			while ($row = DB::fetch_row(1)) {
				$isUpdate = true;
				self::parseMsg($html, $row, true);
			}
            $block = 'message_list';
            if ($isUpdate) {
                $html->parse($block);
                $html->setvar('last_msg_id', self::lastMsgId());//??? not used
            }

            $isDataJs = self::parseReadMessagesDataJs($html);
			if ($isDataJs) {
				$html->parse("{$block}_update");
			}
		}
	}

    static function parseReadMessagesDataJs(&$html)
	{
		$isParse = false;
        $noReadMsg = get_param('set_is_read_msg');
        $noReadMsg = to_sql_array_int($noReadMsg);

		if (guid() && $noReadMsg) {
            $isParse = false;
            $sql = 'SELECT id, send
                      FROM `' . self::getTable('city_msg') . '`
                     WHERE (`id` IN (' . $noReadMsg . ')
                        OR `send` IN (' . $noReadMsg . '))
                       AND is_new = 0'
                     . self::$demoWhere;

			$readMsg = DB::rows($sql);
            $block = 'show_read_msg';
			foreach ($readMsg as $msg) {
                $html->setvar("{$block}_id", $msg['id']);
                $html->setvar("{$block}_send", $msg['send']);
                $html->parse($block, true);
                $isParse = true;
			}
		}

		return $isParse;
	}

    static function setMessageAsRead($userTo = null)
	{
        $responseData = false;
		$cityUid = self::getUidInCity();
		if ($userTo === null) {
			$userTo = get_param('user_to');
		}
		if ($cityUid && $userTo){
            $where = '`to_user` = ' . to_sql($cityUid) . ' AND `from_user` = ' . to_sql($userTo);
			DB::update(self::getTable('city_msg'), array('is_new' => 0), $where);
	        $responseData = true;
		}
        return $responseData;
	}

    static function setMessageAsReadForListUsers()
	{
        $responseData = false;
		$cityUid = self::getUidInCity();
		if ($cityUid){
            $users = get_param('users');
			$room = get_param('room');
			if ($users && $room) {
                $users = implode(',', array_keys(json_decode($users, true)));
                $where = ' `from_user` = ' . to_sql($cityUid) .
					 ' AND `to_user` IN (' . to_sql($users, 'Plain') . ')';
				DB::update(self::getTable('city_msg'), array('is_new' => 0), $where);
			}
            $responseData = true;
		}
        return $responseData;
	}
    /* Chat */

    static function demoSendMessage($fromId, $toId)//???
    {
        global $g;

        $path = dirname(__FILE__) . '/../../_cron/';

        $typeDb = $g['db_local'];

        $m = getDemoMessages($typeDb, $path, 'city');

        $sql = 'SELECT * FROM ' . self::getTable('city_msg') . '
                 WHERE from_user = ' . to_sql($fromId, 'Number') . '
                   AND to_user = ' . to_sql($toId, 'Number') . '
                 ORDER BY id ASC
                 LIMIT 40';
        $msgs = DB::rows($sql);
        $msgsArray = array();
        if ($msgs) {
            foreach ($msgs as $msgItem) {
                $msgsArray[] = $msgItem['msg'];
            }

            if (count($msgsArray)) {
                foreach ($m as $mIndex => $mValue) {
                    if (in_array($mValue, $msgsArray)) {
                        unset($m[$mIndex]);
                    }
                }
            }
        }

        $msg = $m[array_rand($m)];
        $html = null;
        self::addMessage($html, $toId, $fromId,  $msg, true);
    }

    static function getCurrentDataCity()
	{
		global $g;

        $location = get_param('location');
        if (self::isDemo() && $location) {
        $posMap = self::jsonEncodeParam(null, 'pos_map');
            $cityUid = self::getUidInCity();
            $demoUser = CityUser::getDemoOneRandomUserInLocation($location, $posMap);
            if ($demoUser) {
                self::demoSendMessage($demoUser, $cityUid);
            }
        }

        $response = array('last_moving_id' => self::getLastMovingId());
        $listVideo = CityGallery::getVideoCinemaOption($location, false);
        if ($listVideo !== null){
            $response['cinema_video_options'] = $listVideo;
        }
        if (self::isLocationCustomData($location)) {
            $response['update_custom_data'] = self::saveCustomData();
        }

        return $response;
    }

	static function saveUserMove()
	{
		global $g;
        global $g_user;
        $data = get_param('data_user_move');
        $location = get_param('location');
		$cityUid = self::getUidInCity();

        $responseData = false;
        if ($data && $location && $cityUid) {
            $data = json_decode($data, true);
            if (!$data) {
                return false;
            }
			$where = '`cuid` = ' . to_sql($cityUid) .
                     ' AND `location` = ' . to_sql($location) .
                     ' AND `pos_map` = ' . to_sql(self::getPosMapParam());

            $lastPos = $data[count($data)-1];
            //$pos = array(intval($lastPos['pos'][0]), intval($lastPos['pos'][1]));
            $pos = array($lastPos['pos'][0], $lastPos['pos'][1]);

            $sql = 'SELECT `invite` FROM '  . self::getTable('city_users') .
                   ' WHERE `id` = ' . to_sql($cityUid);
            $invite = intval(DB::result($sql));
            if ($invite) {
                DB::update(self::getTable('city_users'), array('invite' => 0), '`id` = ' . to_sql($cityUid));
            } else {
                $row = array('pos' => self::jsonEncodeParam($pos), 'rot' => $lastPos['rot'], 'floor' => $lastPos['floor']);
                DB::update(self::getTable('city_users_in_rooms'), $row, $where);
            }

            $row = array('id' => $cityUid,
                         'location' => $location,
                         'move' => self::jsonEncodeParam($data),
                         'created' => date('Y-m-d H:i:s'));
            DB::insert(self::getTable('city_moving'), $row);
            $responseData = true;
        }
        return $responseData;
    }

    static function updateCityMoving()
	{
 		self::setUidInCity(get_param('city_uid'));
		$cityUid = self::getUidInCity();
		if (!$cityUid) {
			return false;
		}
        self::setCurrentData();

        $stateCity = intval(get_param('state_city'));
        /*if(!$stateCity && !self::$isPlugin){
            CityStreetChat::update();
        }*/

        $location = get_param('location');
        $lastId = get_param('last_id', 0);

        self::saveUserMove();

        $responseData = array('data' => array(), 'last_id' => $lastId);

        $posMap = self::getPosMapParam();
        CityUser::updateLastVisitUser($location, $posMap);

        /* Off-line locations that are not updated */
        $data = array('last_visit' => date('Y-m-d H:i:s', time() - self::$onlineTime*5));
        $timeoutSecServer = intval(get_param('timeout_server')/3*2);
        $where = '`cuid` = ' . $cityUid . ' AND `last_visit` < ' . to_sql(date('Y-m-d H:i:s', time() - $timeoutSecServer));
        DB::update(self::getTable('city_users_in_rooms'), $data, $where);
        /* Off-line locations that are not updated */

        $response = array();
        $where = '`location` = ' . to_sql($location)
               . ' AND `id` != ' . to_sql($cityUid)
               . ' AND `step` > ' . to_sql($lastId);
        $data = DB::select(self::getTable('city_moving'), $where, '', '', '`step`, `id`, `move`');
        foreach ($data as $key => $item) {
            $response[] = array('id' => $item['id'], 'pool' => json_decode($item['move']));
            $lastId = $item['step'];
        }
        $responseData = array('data' => $response, 'last_id' => $lastId);

        $responseData['user_cur_data'] = self::getUsersListInLocation($location, true, $posMap);
        /* Custom data */
        if (self::isLocationCustomData($location)) {
            $responseData['update_custom_data'] = self::saveCustomData();
        }
        /* Custom data */

        $responseData['markers'] = self::getMarkersMap($posMap);

        $responseData['number_users_visitors'] = self::getNumberUsersVisitors();
        $responseData['user_cam_type'] = self::getCamType();

        if (self::$isPlugin) {
            $responseData['type_connection'] = Common::getOption('type_connection', '3d_city_connection');
        }
        return $responseData;
    }

    static function updateCityMovingAndChat()
	{
		self::setUidInCity(get_param('city_uid'));
		$cityUid = self::getUidInCity();
		if (!$cityUid) {
			return false;
		}

        self::setCurrentData();

        $location = get_param('location');

		$responseData = self::updateCityMoving();

        self::setWriting();

        //$responseData['not_online'] = self::getUserOnline(false);

		$posMap = self::getPosMapParam();
        CityUser::updateLastVisitUser($location, $posMap);

        $responseData['online'] = self::getUsersListInLocation($location, false, $posMap);

        $usersOpenChatCity = array();
        $paramUsersOpenChat = get_param('users_open_chat');
        if ($paramUsersOpenChat) {
            $usersOpenChatCity = explode(',', $paramUsersOpenChat);
        }

        $usersOpenChatAll = array();
        $usersOpenChat = self::getListOpenChatInLocation($location, $posMap);

        if (self::isLocationPlatform($location) && $posMap) {
            foreach ($usersOpenChat as $uid => $user) {
                if ($user['pos_map'] != $posMap) {//!$user['num_msg'] &&
                    continue;
                }
                $usersOpenChatAll[] = $uid;
            }
        } else {
            foreach ($usersOpenChat as $uid => $user) {
                $usersOpenChatAll[] = $uid;
            }
        }
        $returnUsersOpenChat = array();
        $returnUsersNewChat = array();
        $returnUsersOpenChatAll = array();
        if ($usersOpenChatCity) {
            foreach ($usersOpenChatCity as $key => $uid) {
                if (!$uid) continue;
                if (in_array($uid, $usersOpenChatAll)){
                    $returnUsersOpenChat[$uid] = 1;
                    $returnUsersOpenChatAll[] = $uid;
                }
            }
            $numberNeedOpenChats = self::$numberOpenChats - count($returnUsersOpenChatAll);
            if ($numberNeedOpenChats > 0) {
                $returnUsersNewChat = array_diff($usersOpenChatAll, $returnUsersOpenChatAll);
                $returnUsersNewChat = array_slice($returnUsersNewChat, 0, $numberNeedOpenChats);
            }
        } elseif ($usersOpenChatAll) {
            $returnUsersNewChat = $usersOpenChatAll;
        }

        $responseData['open_chats'] = $returnUsersOpenChat;
        $responseData['new_chats'] = $returnUsersNewChat;
        if(!self::$isMobile) {
            $responseData['fb_mode_js'] = self::getFbModeJs();
        }
        $responseData['writing_users'] =  self::getWritingUsers();
        $responseData['user_cam_type'] = self::getCamType();

        $responseData['last_new_message'] = self::getLastNewMessageInfo();
        $responseData['gallery_images'] = CityGallery::getImagesGallery($location, false);
        $responseData['is_gallery_uploading'] = intval(Common::isOptionActive('allow_image_uploading', '3d_city_gallery_options_' . $location));
        $responseData['cinema_video_options'] = CityGallery::getVideoCinemaOption($location, false);
        return $responseData;
    }

    static function logout($allowPage = array('ajax.php'))
	{
        global $p;
        $cookieLogout = get_cookie('city_logout', true);
        if (!in_array($p, $allowPage) && $cookieLogout == 'logout') {
            $cookieLogoutPosMap = get_cookie('city_logout_pos_map', true);
            if (!$cookieLogoutPosMap) {
                $cookieLogoutPosMap = '';
            }
            $cookieLogoutLocation = get_cookie('city_logout_location', true);
            if ($cookieLogoutLocation) {
                $cookieLogoutLocation = intval($cookieLogoutLocation);
                CityUser::updateLastVisitUser($cookieLogoutLocation, $cookieLogoutPosMap, date('Y-m-d H:i:s', time() - self::$onlineTime*5));
                $_GET['city_logout_location'] = $cookieLogoutLocation;
                $_GET['cookie_logout_pos_map'] = $cookieLogoutPosMap;
            }
            set_cookie('city_logout', '', -1, true, false);
            set_cookie('city_logout_location', '', -1, true, false);
            set_cookie('city_logout_pos_map', '', -1, true, false);
            return true;
        }
        return false;
    }

    static function isUserOnline($uid)
	{
        if (!$uid) {
            return false;
        }
		$where = '`user_id` = ' . to_sql($uid);
		if (self::isVisitorUser()) {
			$where = '`id` = ' . to_sql($uid);
		}
//        $where .= ' AND `last_visit` >' . to_sql((date('Y-m-d H:i:s', time() - self::$onlineTime)));
//        $sql = 'SELECT `id` FROM `' . self::getTable('city_users') . '` WHERE ' . $where;
//        return DB::result($sql);

        $sql = 'SELECT `last_visit` FROM `' . self::getTable('city_users') . '` WHERE ' . $where;
        $date = DB::result($sql);

        return ($date > date('Y-m-d H:i:s', time() - self::$onlineTime));
    }

    static function getUserOnline($location = null, $posMap = '', $isOnline = true, $where = '', $limit = '', $order = '')
	{
        global $g_user;

		$uid = self::getUidInCity();
        $where .= '`cuid` != ' . to_sql($uid) . self::getWhereLastVisit('', $isOnline);
        if ($location !== null) {
            $where .= ' AND `location` = ' . to_sql($location);
        }
        if (self::isLocationPlatform($location) && $posMap) {
            $where .= ' AND `pos_map` = ' . to_sql($posMap);
        }
        $where .= self::getWhereOnlyManages($location);

        if ($limit) {
            $limit = ' LIMIT ' . $limit;
        }
        if ($order) {
            $order = ' ORDER BY ' . $order;
        }

        $sql = 'SELECT `cuid`
                  FROM `' . self::getTable('city_users_in_rooms') .
              '` WHERE ' . $where . $order  . $limit;

        $responseData = DB::column($sql);

        return $responseData;
    }

    static function getNumberUsersVisitors()
	{
        $sql = 'SELECT `location`, COUNT(location) as count
                  FROM `' . self::getTable('city_users_in_rooms') . '`
                 WHERE ' . self::getWhereLastVisit('', true, false) .
               ' GROUP BY `location`';
        $usersToRooms = DB::rows($sql);
        $prepareUsersToRooms = array();
        $countAll = 0;
        foreach ($usersToRooms as $room) {
            $countAll += $room['count'];
            $prepareUsersToRooms[$room['location']] = $room['count']*1;
        }
        $prepareUsersToRooms['all_number'] = $countAll;
        $prepareUsersToRooms['count'] = $countAll;
        $allRooms = DB::rows("SELECT `id` FROM `" . self::getTable('city_rooms') . "` WHERE `status` = 1 AND `hide` = 0 ORDER BY position");
        foreach ($allRooms as $item) {
            if (!isset($prepareUsersToRooms[$item['id']])) {
                $prepareUsersToRooms[$item['id']] = 0;
            }
        }
        $prepareUsersToRooms['all'] = Plural::get($prepareUsersToRooms['all_number'],'in_the_city_visitors', array('count' => $prepareUsersToRooms['all_number']));

        return $prepareUsersToRooms;
    }

    static function getNumberUsersGames($numbersCity = null)
	{
        if ($numbersCity === null) {
            $numbersCity = self::getNumberUsersVisitors();
        }
        $number = 0;
        $games = DB::column('SELECT `id` FROM ' . self::getTable('city_rooms') . ' WHERE `status` = 1 AND `game` = 1 AND `hide` = 0');
        foreach ($games as $id) {
            $number += isset($numbersCity[$id]) ? $numbersCity[$id] : 0;
        }
        return $number;
    }
    /* UPDATE */

    static function changeRoom()
	{
        $location = get_param('location');
        $responseData = array();
        $cityUid = self::getUidInCity();
        if ($cityUid && $location) {
            $door = get_param('door');
            $posMap = '';
            $water = 0;
			$posData = array();
			$waterData = 0;
            $isLocationPlatform = self::isLocationPlatform($location);

            $posHouse = get_param_array('house_pos');
            if ($posHouse && is_array($posHouse)) {
                foreach ($posHouse as $key => $value) {
                    $posHouse[$key] = floatval($value);
                }
            }
            $rotHouse = get_param_int('house_rot');
            $idHouse = get_param_int('house');
            $isLocationHouse = self::isLocationHouse($location) && $posHouse;

            $where = '';
            if ($isLocationPlatform) {
                $posMap = get_param('pos_map');
                if ($posMap) {
					$posMap['lat'] = floatval($posMap['lat']);
					$posMap['lng'] = floatval($posMap['lng']);
					$isWater = intval(get_param('is_water'));
					$usersMap = self::getUsersInPosOnMap($posMap);
					if (self::isAvailablePosOnPlatform($usersMap)) {
						if ($usersMap && $usersMap[0]) {
							$door = $usersMap[0]['platform'];
							$water = $usersMap[0]['water_loc'];
						} else {
							$door = self::getRandomPlatformMap();
							$water = $isWater ? rand(1, 7) : 0;
						}
					} else {
						$posData = self::getPanoInRadiusHeading($posMap['lat'], $posMap['lng'], 50, array(0, 30, 60, 90, 120, 150, 180, -30, -60, -90, -120, -150, -180));
						if (!$posData) {
							$posData = self::getRandomPosMap();
						}
						$door = $posData['platform'];
						$posMap = $posData['pos_map'];
						$water = 0;
					}
                } else {
                    $prevPosMap = self::getInfoLocationVisitedForPlace('street_chat');
                    if ($prevPosMap && isset($prevPosMap[0]) && $prevPosMap[0]['pos_map']) {
                        $prevPosMap = $prevPosMap[0];
                        $posMap = json_decode($prevPosMap['pos_map'], true);
                        $door = $prevPosMap['platform'];
                        $water = $prevPosMap['water_loc'];
                    } else {
						$randomPos = self::getRandomPosMap();
						$posMap = $randomPos['pos_map'];
                        $door = $randomPos['platform'];
                        $water = 0;
                    }
                }
                $where .= ' AND `pos_map` = ' . to_sql(self::jsonEncodeParam($posMap));
            }

            if ($isLocationHouse) {
                $oldPosition = array('pos' => self::jsonEncodeParam($posHouse),
                                     'rot' => $rotHouse,
                                     'location' => $location);
            } else {
                $sql = 'SELECT `pos`, `rot`, `location`
                          FROM `'  . self::getTable('city_users_in_rooms') . '`
                         WHERE `cuid` = ' . to_sql($cityUid) .
                         ' AND `location` = ' . to_sql($location) . self::getWhereLastVisit() . $where;
                $oldPosition = DB::row($sql);
            }

            if ($oldPosition && !self::isLocationAlwaysRandomPosition($location)) {
                $newPosition = self::calcUserInfoByMovement($oldPosition);
            } else {
                $newPosition = self::changeUserInfoByDimension($location, $door, $posMap);
            }

            if ($newPosition && is_array($newPosition)) {
                $data = array('cuid' => $cityUid,
                              'location' => $location,
                              'pos' => self::jsonEncodeParam($newPosition['pos']),
                              'rot' => $newPosition['rot'],
                              'last_visit' => date('Y-m-d H:i:s')
                        );
				$posMapSql = '';
                if ($isLocationPlatform) {
                    $data['pos_map'] = self::jsonEncodeParam($posMap);
					$posMapSql = $data['pos_map'];
                    $data['platform'] = $door;
                    $data['water_loc'] = $water;
                } elseif ($isLocationHouse){
                    $data['house'] = $idHouse;
                }
                DB::update(self::getTable('city_users'), array('invite' => 0), '`id` = ' . to_sql($cityUid));
                self::addRoomInfo($data);
                $responseData['last_msg_id'] = self::lastMsgId();
                $responseData['users_list'] = self::getUsersListInLocation($location, false, $posMapSql);
                $responseData['position_change'] = $newPosition;
                /*$listVideo = self::getVideoCinemaOption($location, false);//not used in load location
                if ($listVideo !== null){
                    $response['cinema_video_options'] = $listVideo;
                }*/
                $imagesGallery = CityGallery::getImagesGallery($location, false);
                if ($imagesGallery !== null){
                    $responseData['gallery_images'] = $imagesGallery ;
                }
                $responseData['is_gallery_uploading'] = intval(Common::isOptionActive('allow_image_uploading', '3d_city_gallery_options_' . $location));

                $responseData['pos_map'] = $posMap;
                $_GET['pos_map'] = $posMap;
                $responseData['platform'] = $door;
                $responseData['water_loc'] = intval($water);
				$responseData['markers'] = self::getMarkersMap(self::jsonEncodeParam($posMap));
                $responseData['hash'] = '';
                if ($location == 12) {
                    $responseData['hash'] = self::getAllowedHash($posMap, $responseData['platform'], $responseData['water_loc']);
                }
                $responseData['update_custom_data'] = array();
                if (self::isLocationCustomData($location)) {
                    $responseData['update_custom_data'] = self::saveCustomData($location);
                }
            } else {
                $responseData = $newPosition;
            }
        }
        return $responseData;
    }

    static function getUsersListInLocation($location, $isCurrentUser = false, $posMap = '')//house, floor
	{
        global $g;
        global $g_user;

        if (!$isCurrentUser) {
            CityUser::addDemoUserInLocation($location, $posMap);
        }

        $isVisitorUser = self::isVisitorUser();

        $sizePhoto = 'm';
        $where = ' CINR.location = ' . to_sql($location) . self::getWhereLastVisit('CINR');

        if ($isVisitorUser) {
            $where .= ' AND CU.id != ' . to_sql($g_user['user_id']);
        } else {
            $where .= ' AND CU.user_id != ' . to_sql($g_user['user_id']);
        }

        //$fields = 'IF(CU.user_id != 0, CU.user_id, CU.id) AS id, CU.type, CU.face, CU.default, CU.cap, CU.pos, CU.rot,  CU.floor,';
		$fields = 'CU.id, CU.user_id, CU.type, CU.face, CU.default, CU.cap, CINR.house, CINR.pos, CINR.rot,  CINR.floor,';
        if ($isCurrentUser) {
            $where = 'CU.user_id = ' . to_sql($g_user['user_id']);
			if ($isVisitorUser) {
				$where = 'CU.id = ' . to_sql($g_user['user_id']);
			}
            if ($location) {
                $where .= ' AND CINR.location = ' . to_sql($location);
            }
            //$fields .= 'CU.location, CU.sound, CU.pos_map, CU.platform, CU.water_loc,';
            $fields .= ' CU.manager, CU.sound, CINR.location, CINR.pos_map, CINR.platform, CINR.water_loc,';
        } else {
            $where .= self::getWhereOnlyManages($location, 'CU');
        }
        if (self::isLocationPlatform($location) && $posMap) {
			$where .= ' AND CINR.pos_map = ' . to_sql($posMap);
        }elseif (self::isLocationHouse($location)) {
            //$where .= ' AND CINR.pos_map = ' . to_sql($posMap);
        }

        $sql = "SELECT {$fields}
                       CAF.head_color AS head_color, CAF.hash AS hash,
                       CAFD.head_color AS head_color_default, CAFD.hash AS hash_default,
                       U.name, CINR.id AS cinr_id,
					   IF(CU.user_id != 0, U.gender, CU.gender) AS gender,
                       DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(U.birth, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(U.birth, '00-%m-%d')) AS age
                  FROM " . self::getTable('city_users') . " AS CU
                  LEFT JOIN " . self::getTable('city_users_in_rooms')  . " AS CINR ON CINR.cuid = CU.id
                  LEFT JOIN " . self::getTable('user') . " AS U ON U.user_id = CU.user_id
                  LEFT JOIN " . self::getTable('city_avatar_face') . " AS CAF ON CU.default = 0 AND CU.face = CAF.photo_id AND CAF.user_id = CU.id
                  LEFT JOIN " . self::getTable('city_avatar_face_default') . " AS CAFD ON CU.default = 1 AND CU.face = CAFD.id
                 WHERE {$where}" . self::getGroupByForDemo();
        $fetchType = DB::getFetchType();
        DB::setFetchType(MYSQL_ASSOC);
        $users = DB::rows($sql);
        DB::setFetchType($fetchType);
        if (!is_array($users)) {
            $users = array();
        }
        $cinrId = 0;
        $urlFiles = Common::getOption('url_files_city', 'path');
        foreach ($users as $id => $item) {
            $users[$id]['pos'] = json_decode($item['pos'], true);
            $faceId = $users[$id]['face'];
            if ($users[$id]['hash'] === null) {
                $users[$id]['hash'] = $users[$id]['hash_default'];
            }
            $users[$id]['face'] = self::getUrlFace($faceId, $users[$id]['id'], $users[$id]['gender'], true, $users[$id]['default'], 'face', false, $users[$id]['hash']);
            unset($users[$id]['hash']);
            unset($users[$id]['hash_default']);
            if ($users[$id]['head_color'] === null) {
                $users[$id]['head_color'] = $users[$id]['head_color_default'];
            }
            unset($users[$id]['head_color_default']);

            $uid = $users[$id]['id'];
            if ($users[$id]['user_id']) {
                $uid = $users[$id]['user_id'];
            }

            //unset($users[$id]['gender']);
            if (!$isCurrentUser) {
                unset($users[$id]['default']);
            } else {
                $users[$id]['pos_map'] = json_decode($item['pos_map'], true);
                $users[$id]['water_loc'] = intval($item['water_loc']);
                $users[$id]['face_id'] = $faceId;
            }
            $users[$id]['manager'] = 0;
            $users[$id]['visitor'] = 0;
            if (self::isPluginEstateAgency()) {
                $users[$id]['manager'] = $item['manager'];
                if (!$item['manager']) {
                    $users[$id]['visitor'] = 1;
                }
            }
            if (self::$isPlugin) {
                $optionTypeConnection = Common::getOption('type_connection', '3d_city_connection');
                $users[$id]['photo'] = self::getPhotoDefault($users[$id]['id'], $users[$id]['gender'], true, $sizePhoto, false);
                if ($optionTypeConnection == 'anonym_random_params'
                    || $optionTypeConnection == 'anonym_with_gender'
                    || !$users[$id]['name']){
                    if (!IS_DEMO || (IS_DEMO && $users[$id]['is_temp'])) {
                        $users[$id]['name'] = MyChat3d::getName($users[$id]['id']);
                    }
                    unset($users[$id]['is_temp']);
                }
                if ($users[$id]['birth'] == '0000-00-00') {
                    $users[$id]['age'] = '';
                }
                unset($users[$id]['birth']);
            } else {
                $photoUrl = self::getPhotoDefault($uid, $users[$id]['gender'], true, $sizePhoto, $users[$id]['user_id'], false);
                $users[$id]['photo'] = Common::getOption('url_files_city', 'path') . $photoUrl;
                $users[$id]['photo_url_of_parent'] = Common::getOption('url_files', 'path') . $photoUrl;
                if (!$users[$id]['name']) {
                    $users[$id]['name'] = CityUser::getNameVisitorUser($users[$id]['id']);
                }
            }
            $users[$id]['name_short'] = User::nameOneLetterShort($users[$id]['name']);
            $cinrId = $users[$id]['cinr_id'];
            unset($users[$id]['cinr_id']);
        }
        if ($isCurrentUser && isset($users[0])) {
            $users = $users[0];
        }

        return $users;
    }

    static function getPhotoDefault($uid, $gender, $isCity = true, $size = 'm', $realUser = true, $addUrl = true)//different plugin
	{
		global $g;

        $urlFiles = '';
        if ($addUrl) {
            $urlFiles = $isCity ? Common::getOption('url_files_city', 'path') : Common::getOption('url_files', 'path');
        }
		$userPhotoDefaultInfo = User::getPhotoDefault($uid, $size, true, $gender, DB_MAX_INDEX, true, true, false, !$realUser);
        if ($userPhotoDefaultInfo) {
            $userPhotoDefault = User::getPhotoFile($userPhotoDefaultInfo, $size, $gender, DB_MAX_INDEX, !$realUser);
        } else {
            $userPhotoDefault = 0;

            $key = $realUser ? 'user_id' : 'id';
            $usersCityInfo = DB::select(self::getTable('city_users'), "`{$key}` = " . to_sql($uid));
            if (isset($usersCityInfo[0])) {
                $usersCityInfo = $usersCityInfo[0];
                $default = $usersCityInfo['default'];
                $faceId = $usersCityInfo['face'];
                if ($default) {
                    $gender = mb_strtolower($gender, 'UTF-8');
                    $userPhotoDefault = "city/default/face/{$gender}/{$faceId}_p.jpg";
                } else {
                    $folder = '';
                    if (!$realUser) {
                        $folder = 'city/';
                    }
                    $userPhotoDefault = "{$folder}photo/{$uid}_{$faceId}_{$size}.jpg";
                }
            }
            if (!$userPhotoDefault) {
				$userPhotoDefault = User::getPhotoDefault($realUser, $size, false, $gender, DB_MAX_INDEX, true, true, !$realUser);
            }
        }
        return $urlFiles . $userPhotoDefault;
    }

    static function getUrlFace($id, $uid, $gender = 'M', $isCity = true, $isDefault = false, $type = 'face', $isPrev = false, $hash = null)
	{
        global $g_user;

        $prf = '';
        if (self::$isMobile) {
            $prf = '_m';
        }
        $urlFiles = $isCity ? Common::getOption('url_files_city', 'path') : Common::getOption('url_files', 'path');
        if ($isDefault) {
            $prev = '';
            if ($isPrev) {
                $prev = '_p';
            }
            $gender = mb_strtolower($gender, 'UTF-8');
            $url = $urlFiles . "city/default/{$type}/{$gender}/{$id}{$prf}{$prev}.jpg";
        } else {
            $url = $urlFiles . "city/users/{$uid}_{$id}{$prf}.jpg";
        }
        $url .= "?v={$hash}";

        return $url;
    }

    /* Avatar model */
    static function setParamsAvatarChangingOrientation($gender = null, $uid = null)
	{
		global $g;
        global $g_user;

        if ($gender === null) {
            $gender = $g_user['gender'];
        }
        if ($gender === $g_user['gender']) {
            return;
        }
        if ($uid === null) {
            $uid = $g_user['user_id'];
        }
        $userInfo = DB::select(self::getTable('city_users'), 'user_id = ' . to_sql($uid));
        if ($userInfo && isset($userInfo[0])) {
            $g_user['gender'] = $gender;
            $gender = mb_strtolower($gender, 'UTF-8');
            $userInfo = $userInfo[0];
            $data = array();
            $url = Common::getOption('url_files', 'path') . "city/default/type/{$gender}/{$userInfo['type']}.jpg";
            if (!file_exists($url)) {
                $type = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('type'))));
                $cap = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('cap'))));
                $data = array('type' => $type,
                              'cap' => $cap);
                if ($userInfo['default']) {
                    $data['face'] = self::getRandomAvatarFaceDefaultId($gender);
                }
                DB::update(self::getTable('city_users'), $data, 'user_id = ' . to_sql($uid));
            }
        }
    }

    static function getUrlAvatarModel($type, $path = 'dir', $gender = null)
	{
        if ($gender === null) {
            global $g_user;
            $gender = mb_strtolower($g_user['gender'], 'UTF-8');
        }

        return Common::getOption("{$path}_files", 'path') . "city/default/{$type}/{$gender}/";
    }

    static function getImagesAvatarModel($type, $url = null, $typeImg = 'png', $gender = null)
	{
        if ($url === null) {
            $url = self::getUrlAvatarModel($type, 'dir', $gender);
        }
        $images = readAllFileArrayOfDir($url, '', SORT_NUMERIC, '', '', $typeImg);
        if (self::isDemo()) {
            $removeImg = array();
            if ($type == 'cap') {
                $removeImg = array(
                    '0-1_female_hair_05.png',
                               '0-6_female_hair_07.png',
                               '0-1_male_hair_04.png',
                    '0-3_male_hair_06_012.png'
                );
            } elseif ($type == 'type') {
                $removeImg = array(
                    '3_female03.png',
                    '7_female03_purple.png',
                    '9_female03_blue.png'
                );
            }
            foreach ($removeImg as $key) {
                unset($images[$key]);
            }
        }
        return $images;
    }
    /* Avatar model */

    static function getIdImageReadFile($id)//readAllFile
	{
        $id = explode('_', trim($id));
        unset($id[0]);
        return implode('_', $id);
    }

    function parseAvatarModelImage(&$html, $type, $selected, $typeImg = 'png', $gender = null)
	{
        global $g_user;

        $blockChooseAvatar = 'choose_avatar';
        if ($gender === null) {
            $gender = mb_strtolower($g_user['gender'], 'UTF-8');
        }
        $url = self::getUrlAvatarModel($type, 'url', $gender);
        $images = readAllFileArrayOfDir(self::getUrlAvatarModel($type, 'dir', $gender), '', SORT_NUMERIC, '', '', $typeImg);
        $blockChooseAvatarItem = "{$blockChooseAvatar}_{$type}";

        $html->setvar("{$blockChooseAvatarItem}_gender", $gender);//plugin
        foreach ($images as $img => $id) {
            $id = self::getIdImageReadFile($id);
            $html->setvar("{$blockChooseAvatarItem}_img", "{$url}$img");
            $html->setvar("{$blockChooseAvatarItem}_id", $id);
            if ($id == $selected) {
                $html->parse("{$blockChooseAvatarItem}_selected", false);
            } else {
                $html->clean("{$blockChooseAvatarItem}_selected");
            }
            $html->parse($blockChooseAvatarItem);
        }
    }

    function parseAvatarFaceDefault(&$html, $selected = 0, $gender = null)
	{
		global $g;
        global $g_user;
        if ($gender === null) {
            $gender = mb_strtolower($g_user['gender'], 'UTF-8');
        }
        $where = 'SELECT *
                    FROM '. self::getTable('city_avatar_face_default') . '
                   WHERE `gender` = ' . to_sql($gender) .
                 ' ORDER BY `position`';
        $faces = DB::all($where);
        $block = 'choose_avatar_face';
        if (count($faces)) {
            $html->setvar("{$block}_gender", $gender);//plugin
            foreach ($faces as $face) {
                $html->setvar("{$block}_id", $face['id']);
                $faceUrl = self::getUrlFace($face['id'], 0, $face['gender'], false, true, 'face', true, $face['hash']);
                $html->setvar("{$block}_url_img", $faceUrl);
                $faceUrlCity = self::getUrlFace($face['id'], 0, $face['gender'], true, true, 'face', false, $face['hash']);
                $html->setvar("{$block}_url_city_img", $faceUrlCity);
                $html->setvar("{$block}_head_color", $face['head_color']);
                $html->parse($block);
            }
            $html->parse("{$block}_upload");//plugin
        } else {
            $html->parse("{$block}_no");
        }
    }

    static function getRandomAvatarFaceDefaultId($gender = null)
	{
		global $g;
        global $g_user;
        if ($gender === null){
            $gender = $g_user['gender'];
        }
        $sql = 'SELECT `id`
                  FROM '. self::getTable('city_avatar_face_default') . '
                 WHERE `gender` = ' . to_sql($gender) .
               ' ORDER BY RAND() LIMIT 1';
        return DB::result($sql);
    }

    /* Mobile */
    static function parseKeyboard(&$html)
	{
        global $g;

        $lang = Common::getOption('lang_loaded', 'main');
        $html->setvar('lang_loaded', $lang);

        $s = 0;
        $rowClass = 'width_center';
        $blockRow = 'keyboard_row';
        $blockRowItem = "{$blockRow}_item";
        $layout = json_decode(he_decode(l('keyboard_layout')));

        foreach ($layout->char as $key => $characters) {
            $nums = $layout->num[$key];
            $html->clean($blockRowItem);
            $l = mb_strlen($characters, 'UTF-8')+1;
            for($i = 1; $i < $l; $i++ ){
                $html->setvar("{$blockRowItem}_char", toAttr(mb_substr($characters, $i-1, 1, 'UTF-8')));//$characters[$i]
                $html->setvar("{$blockRowItem}_num", toAttr(mb_substr($nums, $i-1, 1, 'UTF-8')));//$nums[$i]
                $html->parse($blockRowItem, true);
            }
            if ($s == 2) {
                $html->parse("{$blockRow}_arrow", false);
                $html->parse("{$blockRow}_backspace", false);
            }
            if ($s++) {
                $html->setvar("{$blockRow}_class", $rowClass);
            }
            $html->parse($blockRow, true);
        }
    }
    /* Mobile */

    /* Server */
    static function getCallData($param)
	{
		global $g;
        $response = 'error_media_server';
        if ($param === false) {
            return $response;
        }
        if (mb_strpos($param, 'error_license', 0, 'UTF-8') !== false) {
            $response = 'error_license';
        } elseif (mb_strpos($param, 'params_id:', 0, 'UTF-8') !== false){
            $id = intval(str_replace('params_id:', '', $param));
            //$id = 0;
            if ($id) {
                $params = DB::row('SELECT `params` FROM ' . self::getTable('city_temp') . ' WHERE `id` = ' . to_sql($id));
                if ($params && isset($params[0])) {
                    DB::delete(self::getTable('city_temp'), '`id` = ' . to_sql($id));
                    $response = $params[0];
                }
            }
        }
        return $response;
    }

    static function getCallOffsetResponse($param)//Distanc
	{
        $response = self::getCallData($param);
        if (self::$isPlugin) {
            $response = stripcslashes($response);
        }
        $param = json_decode($response);
        if (is_object($param)) {
            $response = array('pos' => $param->pos, 'rot' => $param->rot);
        }
        return $response;
    }

    static function getPathCallCity()
	{
        global $g;
        if (self::$isPlugin) {
            return $g['path']['url_city'] . 'prepare_data.php';
        } else {
            return Common::urlSiteSubfolders() . $g['path']['url_city_absolute'] . 'prepare_data.php';
        }
    }

    static function host()
    {
        global $g, $url;

        $url = 'http://' . $g['media_server'] . '/media_server/3dcity.php';

        $file = __DIR__ . '/../config/3dcity.php';
        if(file_exists($file)) {
            include $file;
        }
        return $url;
    }

    static function apiCall($params = array())
    {
        global $g;
        $params['type_db'] = $g['db_local'];
        return @urlGetContents(self::host(), 'post', $params);
    }

    static function calcUserInfoByDistance($location, $platform = 0, $posMap = '')
	{
		global $g;
		/*
		 * If there is a platform, it is Street View
		 */
        $where = "`location` = " . to_sql($location, 'Number') . self::getWhereLastVisit();
		if (self::isLocationPlatform($location) && $platform && $posMap) {
            $where .= ' AND `pos_map` = ' . to_sql($posMap);
            $where .= self::getWhereOnlyManages($location);
		}
        $positionAll = DB::field(self::getTable('city_users_in_rooms'), 'pos', $where);

        $params = array('cmd' => 'calc_user_info_by_distance',
                        'positions' => self::jsonEncodeParam($positionAll),
                        'location' => $location,
						'platform' => $platform,
                        'call_url' => self::getPathCallCity());

        $distance = self::apiCall($params);
        $response = self::getCallOffsetResponse($distance);
        return $response;
    }

    static function calcUserInfoByMovement($user)
	{
        $params = array('cmd' => 'calc_user_info_by_movement',
                        'user_info' => self::jsonEncodeParam($user),
                        'location' => $user['location'],
                        'call_url' => self::getPathCallCity());
        $distance = self::apiCall($params);
        $response = self::getCallOffsetResponse($distance);
        return $response;
    }

    static function changeUserInfoByDimension($location, $door, $posMap = array())
	{
		global $g;
        $curLocation = get_param('location_cur');
        $platform = 0;

        $where = "`location` = " . to_sql($location, 'Number') . self::getWhereLastVisit();
        if (self::isLocationPlatform($location)) {
			$where .= ' AND `pos_map` = ' . to_sql(self::jsonEncodeParam($posMap));
            $where .= self::getWhereOnlyManages($location);
        }
        $positionAll = DB::field(self::getTable('city_users_in_rooms'), 'pos', $where);
        $params = array('cmd' => 'change_user_info_by_distance',
                        'positions' => self::jsonEncodeParam($positionAll),
                        'location' => $location,
                        'location_cur' => $curLocation,
                        'door' => $door,
                        'call_url' => self::getPathCallCity());
        $dimension = self::apiCall($params);
        $response = self::getCallOffsetResponse($dimension);
        return $response;
    }

    static function checkMediaServerError(&$html, $param, $parseError = true)
	{
        $isError = is_string($param) && mb_strpos($param, 'error', 0, 'UTF-8') !== false;
        if ($isError && $parseError) {
            $html->setvar('load_error_license', $param);
        }
        return $isError;
    }
    /* Server */

    /* Plugin */
    static function getUserInfoForTitle(&$row)
	{
        //print_r($row);
        $optionTypeConnection = Common::getOption('type_connection', '3d_city_connection');
        $row['info_title'] = '';
        $row['name_title'] = '';
        if ($optionTypeConnection == 'anonym_random_params' || $optionTypeConnection == 'anonym_with_gender'){
            if (IS_DEMO && $row['name'] && !$row['is_temp']) {
                $row['name_title'] = $row['name'];
            } else {
                $row['name_title'] = MyChat3d::getName($row['user_id']);
            }
        } elseif ($optionTypeConnection == 'anonym_with_gender_and_name') {
            $row['name_title'] = User::nameOneLetterShort($row['name']);
        } else {
            if ($row['name']) {
                $row['name_title'] = User::nameOneLetterShort($row['name']);
            }
            $city = '';
            $age = '';
            //anonym_full|registration_full|registration_wp
            if ($optionTypeConnection == 'registration_wp') {

            } else {
                $typeForm = $optionTypeConnection == 'anonym_full' ? 'form_registration' : 'form_registration_full';
                $frmItems = Common::getOption('order_list', $typeForm);
                if ($frmItems) {
                    $frmItems = unserialize($frmItems);
                }else{
                    $frmItems = getSubmenuItemsList($typeForm);
                }
                if ($frmItems) {
                    if ($frmItems['frm_nickname'] && $row['name']) {
                        $row['name_title'] = User::nameOneLetterShort($row['name']);
                    } else {
                        $row['name_title'] = MyChat3d::getName($row['user_id']);
                    }
                    if ($frmItems['frm_city'] && $row['city']) {
                        $city = $row['city'];
                    }
                    if ($frmItems['frm_birthday'] && $row['birth'] != '0000-00-00') {
                        $age = $row['age'];
                    }
                }
            }
            if ($city && $age) {
                $row['info_title'] = $age . ', ' . $city;
            } elseif ($city) {
                $row['info_title'] = $city;
            } elseif ($row['name_title'] && $age && !self::$isMobile) {
                $row['name_title'] .= ', ' .  $age;
            }
            if (self::$isMobile) {
                $row['age'] = $age;
            }
        }
    }
    /* Plugin */

    static function getOneRandomLocation()
	{
        global $g;

        $sql = '(SELECT COUNT(id) FROM `' . self::getTable('city_users_in_rooms') . '` AS CINR
                  WHERE CINR.location = CR.id ' . self::getWhereLastVisit('CINR') . ') AS count';
        $sql = 'SELECT CR.id,
                       ' . $sql .'
                  FROM `' . self::getTable('city_rooms') . '` AS CR
                 WHERE CR.status = 1
                   AND (CR.game = 0 OR (CR.game = 1 AND CR.id IN(' . to_sql(implode(',', City::getLocationGameData()), 'Plain') . ')))
                   AND CR.hide = 0 AND CR.id != 12';

        $rooms = DB::all($sql);
        $minCountNumber = null;
        foreach ($rooms as $room) {
            if ($minCountNumber === null) {
                $minCountNumber = $room['count'];
            } elseif ($minCountNumber > $room['count']) {
                $minCountNumber = $room['count'];
            }
        }
        if ($minCountNumber !== null) {
            foreach ($rooms as $key => $room) {
                if ($minCountNumber != $room['count']) {
                    unset($rooms[$key]);
                }
            }
        }

        $key = array_rand($rooms);
        $location = $rooms[$key]['id'];

        return $location;
    }

    static function getOneRandomLocation_OLD()
	{
        global $g;
        $sql = '(SELECT COUNT(id) FROM `' . self::getTable('city_users_in_rooms') . '` AS CINR
                  WHERE CINR.location = CR.id ' . self::getWhereLastVisit('CINR') . ') AS count';
        $sql = 'SELECT CR.id,
                       ' . $sql .'
                  FROM `' . self::getTable('city_rooms') . '` AS CR
                 WHERE CR.status = 1
                   AND (CR.game = 0 OR (CR.game = 1 AND CR.id IN(' . to_sql(implode(',', City::getLocationGameData()), 'Plain') . ')))
                   AND CR.hide = 0 AND CR.id != 12';

        $rooms = DB::all($sql);
        $location = 0;
        $count = 0;
        $isAllSame = true;
        foreach ($rooms as $room) {
            if ($location) {
                if ($count > $room['count']) {
                    $location = $room['id'];
                    $count = $room['count'];
                    $isAllSame = false;
                }
            } else {
                $location = $room['id'];
                $count = $room['count'];
            }
        }
        if ($isAllSame) {
            $key = array_rand($rooms);
            $location = $rooms[$key]['id'];
        }
        return $location;
    }

    static function geoPositionsForMapIp()
    {
        $ipLat = 0;
        $ipLong = 0;

		$ip = IP::getIp();
		$ipParam = get_param('ip');
        if($ipParam) {
            $ip = $ipParam;
        }
		//$ip = '92.112.34.9';

		if (self::$geoInfo && isset(self::$geoInfo[$ip])) {
			$geoinfo = self::$geoInfo[$ip];
		} else {
			$geoinfo = IP::geoInfo($ip);
			self::$geoInfo[$ip] = $geoinfo;
		}
		if ($geoinfo && ($geoinfo['lat'] != 0 && $geoinfo['long'] != 0)) {
            $ipLat = $geoinfo['lat'];
            $ipLong = $geoinfo['long'];
        }
		if (!$ipLat || !$ipLong) {
			$city = IP::geoInfoCityDefault();
			$ipLat = $city['lat'];
            $ipLong = $city['long'];
		}

		$ipLat = to_sql($ipLat / IP::MULTIPLICATOR, 'Number');
        $ipLong = to_sql($ipLong / IP::MULTIPLICATOR, 'Number');
		$cityInfo = IP::geoInfoCityFindInRadius($ipLat, $ipLong, 100);
        if (!$cityInfo) {
            $cityInfo = IP::geoInfoCityFindInRadius($ipLat, $ipLong, 1000);
        }
		return $cityInfo;
		//return IP::geoInfoCityFindInRadius($ipLat, $ipLong, 300, '', true);
	}

    static function getUsersInPosOnMap($pos)
	{
		global $g;
		$posSql = self::jsonEncodeParam($pos);
		$where = '`location` = 12 AND `pos_map` = ' . to_sql($posSql) . self::getWhereLastVisit();
        $where .= self::getWhereOnlyManages(12);
		return DB::select(self::getTable('city_users_in_rooms'), $where);
	}

	static function isAvailablePosOnPlatform($usersMap)
	{
		if ($usersMap && isset($usersMap[0])) {
			$pl = $usersMap[0]['platform'];
			$platforms = Common::getOption('max_number', '3d_city_platform');
			$platforms = json_decode($platforms, true);
			$countUsers = count($usersMap);
			return $countUsers < $platforms[$pl];
		} else {
			return true;
		}
	}

    static function getAvailablePosOnMap($posPano, $getRandomPlatform = true)
	{
        //$posPano = array('lat' => floatval($pano['lat']), 'lng' => floatval($pano['lng']), 'id' => $pano['panoId']);
        $pos = array();
		$usersMap = self::getUsersInPosOnMap($posPano);
		if (self::isAvailablePosOnPlatform($usersMap)) {
			$pos['pos_map'] = $posPano;
			if ($usersMap && $usersMap[0]) {
				$pos['platform'] = $usersMap[0]['platform'];
			} elseif($getRandomPlatform) {
				$pos['platform'] = self::getRandomPlatformMap();
			}else{
                $pos['platform'] = 0;
            }
		}
        return $pos;
    }

	static function getInfoPanoMap($lat, $lng, $radius = 100)
	{
		$result = false;
		//$protocol = isset($_SERVER['HTTPS']) ? 'https' : 'http';
        $protocol = 'https';
		$url = $protocol . '://maps.google.com/cbk?output=json&hl=x-local&ll=' . $lat . ',' . $lng . '&cb_client=maps_sv&v=3&key=' . CityMap::getKeyMap() . '&radius=' . $radius;
		//$url = $protocol . '://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=polygon&it=1%3A1&rank=closest&ll=' . $lat . ',' . $lng . '&radius=' . $radius .'&key=' . self::getKeyMap();

        $url = $protocol . '://maps.googleapis.com/maps/api/streetview/metadata?location=' . $lat . ',' . $lng . '&key=' . CityMap::getKeyMap() . '&radius=' . $radius;

        $pano = @urlGetContents($url);

		if ($pano) {
			$pano = json_decode($pano, true);
			//echo '<pre>';
			//print_r($pano);
			//echo '</pre>';
			/*if (isset($pano['Location'])) {
				$result = $pano['Location'];
			}*/
			//if (isset($pano['result']) && isset($pano['result'][0])) {
				//$result = $pano['result'][0];
			//}

            if (isset($pano['status']) && $pano['status'] == 'OK' && isset($pano['location'])) {
				$result = $pano;
			}
            //echo $url;
            //var_dump_pre($result, true);

		}
		return $result;
	}

	static function searchPanoInRadius($lat, $lng, $radius = 50)
	{
		$pos = array();
		$pano = self::getInfoPanoMap($lat, $lng, $radius);
		//if (isset($pano['panoId'])) {
			//$posPano = array('lat' => floatval($pano['lat']), 'lng' => floatval($pano['lng']), 'id' => $pano['panoId']);
        if (isset($pano['pano_id'])) {
            $posPano = array('lat' => floatval($pano['location']['lat']), 'lng' => floatval($pano['location']['lng']), 'id' => $pano['pano_id']);
			$usersMap = self::getUsersInPosOnMap($posPano);
			if (self::isAvailablePosOnPlatform($usersMap)) {
				$pos['pos_map'] = $posPano;
				if ($usersMap && $usersMap[0]) {
					$pos['platform'] = $usersMap[0]['platform'];
				} else {
					$pos['platform'] = self::getRandomPlatformMap();
				}
			}
		}
		return $pos;
	}

	static function getPanoInRadiusHeading($lat, $lng, $radius = null, $headings = null)
	{
		$pos = array();
		//$heading = 0*180 /-0*-180
		if ($headings === null) {
			$headings = array(0, 30, 60, 90, 120, 150, 180, -30, -60, -90, -120, -150, -180);
			$headings = array(0, 90, 180, -90, -180);
		}
		if ($radius === null) {
			$radius = 2000;//50;
		}

		//Grenland - $lat = '70.68705144793864'; $lng = '-52.11004726203698';
		$pos = self::searchPanoInRadius($lat, $lng, $radius);
		if ($pos) {
			return $pos;
		}

		$radiusPano = 350;
		do {
			foreach ($headings as $heading) {
				//echo $heading .'/'.$radius . '<br>';
				$posObj = new LatLng($lat, $lng);
				$coordinates = GeoLocation::computeOffset($posObj, $radius, $heading);
				$pos = self::searchPanoInRadius($coordinates->getLat(), $coordinates->getLng(), $radius);
				if ($pos) {
					break(2);
				}
			}
			$radius = $radius*2;
		} while ($radius < 5000000);
		return $pos;
	}

    static function getRandomPosMap($firstVisitLocation = null)
	{
		global $g_user;
        $rndPos = array(
			array('lat' => '32.6144404',          'lng' => '-108.9852017', 'id' => 'XLVMyhnyfAlN7kigyQIrMg'),
			array('lat' => '39.36382677360614',   'lng' => '8.431220278759724', 'id' => 'UvRD-oXGMWYA-h4mmg51Bg'),
			array('lat' => '59.30571937680209',   'lng' => '4.879402148657164', 'id' => 'goLBw6UHvFDCt6GsYFEAzQ'),
			array('lat' => '28.240385123352873',  'lng' => '-16.629988706884774', 'id' => 'QFElYvKVArrh5BdgNnOPgQ'),
			array('lat' => '58.50674028194999',	  'lng' => '-117.13884739880484', 'id' => 'IoDfG1iyeSB94be4Nknvew'),
			array('lat' => '40.04331301970443',	  'lng' => '-3.0661877720444863', 'id' => 'vL6iKxNZyn5MJ0auCeb_2A'),
			array('lat' => '50.740999488241',	  'lng' => '9.259847677423181', 'id' => '20yJiZ4FtnsAAAQfDYdIQw'),
			array('lat' => '52.37538879085408',	  'lng' => '18.718507741764483', 'id' => '1ZdFpUifqydXqtugDVBh8Q'),
			array('lat' => '63.656749125963266',  'lng' => '15.983650728311204', 'id' => 'WCtTW3YiWXOevdQMG1JumQ'),
			array('lat' => '46.9258253',		  'lng' => '24.676607699999977', 'id' => 'A2CGLiHtUYpwbh5wXJL_nA'),
			array('lat' => '-25.799017696996117', 'lng' => '28.32722602026081', 'id' => 'Yf8YP8cklnizQdvV5H2fVg'),
			array('lat' => '49.02341562482641',	  'lng' => '104.01618360219527', 'id' => 'DbLsDGdhOqgZCMYqujdf5w'),
			array('lat' => '22.19702006569101',	  'lng' => '113.54105079126248', 'id' => '-ZD4Uxzz7BjHYKlfdMoY7A'),
			array('lat' => '37.60550616850077',	  'lng' => '139.4319971648996', 'id' => '4kPI8w2WNTTmgPXuJY_wGg'),
			array('lat' => '57.94186433492709',	  'lng' => '102.73347253745101', 'id' => '0KHSHuxZHPF6mOvjKC26Yg'),
			array('lat' => '25.10953436313956',	  'lng' => '-102.63293064436857', 'id' => 'fKaj9MJ-Gsi6HGOqSgKj1Q'),
			array('lat' => '4.597408553064982',	  'lng' => '-74.07592261688137', 'id' => '6DPRVLMlFQsx8RbQ4ZjMRA'),
			array('lat' => '-5.904336254002339',  'lng' => '-76.10087087066108', 'id' => '8c78qSh1LB-UYWo4Rwi9lg'),
			array('lat' => '-21.70491859715829',  'lng' => '-57.892329873477024', 'id' => '-2nCyGtHCLeJs0WXa2lGcw'),
			array('lat' => '-37.7731530976742',	  'lng' => '-67.71851339021248', 'id' => '6-fGywZYO2gVHu5Afx0APw'),
			array('lat' => '-31.98280860867879',  'lng' => '-56.046127715003934', 'id' => 'AHcFfsfcREHJ3mvwXT8Dhw')
		);

		$pos = array();
		function getRandomCityPanoram($isLocationUser = true){
			global $g_user;
			$result = array();
			if($isLocationUser){
				$city = DB::select('geo_city', '`city_id` = ' . to_sql($g_user['city_id'], 'Number'));
			}else{
				$city = DB::select('geo_city', '', 'RAND()', 1);
			}
			if ($city && isset($city[0])) {
				$lat = $city[0]['lat']/IP::MULTIPLICATOR;
				$lng = $city[0]['long']/IP::MULTIPLICATOR;
				$result = City::getPanoInRadiusHeading($lat, $lng, 50);
			}
			return $result;
		}

        if ($firstVisitLocation === null) {
            $firstVisitLocation = Common::getOption('first_visit_location', '3d_city_street_chat');
        }
		if ($firstVisitLocation == 'random') {
			$pos = getRandomCityPanoram(false);
		} elseif ($firstVisitLocation == 'registered') {
			$pos = getRandomCityPanoram();
		} elseif ($firstVisitLocation == 'ip') {
			$city = self::geoPositionsForMapIp();
			if ($city) {
				$lat = $city['lat']/IP::MULTIPLICATOR;
				$lng = $city['long']/IP::MULTIPLICATOR;
				$pos = self::getPanoInRadiusHeading($lat, $lng, 50);
			}
		}
		if (!$pos) {
			$randomPos = $rndPos[array_rand($rndPos)];
			$pos = self::getPanoInRadiusHeading($randomPos['lat'], $randomPos['lng']);
		}
		if (!$pos) {
			$pos['pos_map'] = $rndPos[array_rand($rndPos)];
			$pos['platform'] = self::getRandomPlatformMap();
		}
		$pos['pos_map']['lat'] = floatval($pos['pos_map']['lat']);
		$pos['pos_map']['lng'] = floatval($pos['pos_map']['lng']);
        return $pos;
    }

    static function getRandomPlatformMap()
	{
		//$platformsAll = array(1,2,4,5,6,7,8,10,11,12,14,15,16);//not 3
        $platformsActive = json_decode(Common::getOption('activated', '3d_city_platform'), true);
        if (count($platformsActive) == 1) {
            return key($platformsActive);
        }
        $platformsAll = array();
        foreach ($platformsActive as $id => $value) {
            if($value){
                $platformsAll[] = $id;
            }
        }
        $platformsAll = array_flip($platformsAll);
        $usedPlatform = get_cookie('city_used_platform');
        if ($usedPlatform) {
            $usedPlatform = explode(':', $usedPlatform);
            foreach ($usedPlatform as $key => $id) {
                if (!isset($platformsAll[$id])) {
                    unset($usedPlatform[$key]);
                }
            }
        } else {
            $usedPlatform = array();
        }
        $platformsAll = array_flip($platformsAll);
        $platforms = array_diff($platformsAll, $usedPlatform);
        if (!$platforms) {
            $platforms = $platformsAll;
            if (count($platforms) > 1) {
                $platforms = array_diff($platformsAll, array(0 => array_pop($usedPlatform)));
            }
            $usedPlatform = array();
        }

        $randomPlatform = $platforms[array_rand($platforms)];
        $usedPlatform[] = $randomPlatform;
        set_cookie('city_used_platform', implode(':', $usedPlatform));
        return $randomPlatform;
    }

	static function getSrcPlaceForCheckWaterMap($lat, $lng)
	{
        $protocol = isset($_SERVER['HTTPS']) ? 'https' : 'http';
        $src = $protocol .
            '://maps.google.com/maps/api/staticmap?scale=1&center=' . $lat . ',' . $lng .
            '&zoom=17&size=100x100&sensor=false&visual_refresh=true&style=element:labels|visibility:off' .
            '&style=feature:water|color:0x00FF00&style=feature:transit|visibility:off&style=feature:poi|visibility:off' .
            '&style=feature:administrative|visibility:off&key=' . CityMap::getKeyMap();
        //&style=feature:road|visibility:off
		return $src;
	}

    static function isWaterPlaceOfMap($lat, $lng)
	{
		$result = 0;
        $src = self::getSrcPlaceForCheckWaterMap($lat, $lng);
        $im = imagecreatefrompng($src);
		if ($im) {
			$colorIndex = imagecolorat($im, 50, 50);
			$rgb = imagecolorsforindex($im, $colorIndex);
			$isWater = ($rgb['red'] == 0 && $rgb['blue'] == 0) && ($rgb['green'] == 255 || $rgb['green'] == 254);
			if ($isWater) {
				$result = rand(1, 7);
			}
		}
        //header("Content-type: image/png");
        //imagepng($im);
        //imagedestroy($im);
        return $result;
    }

	static function getMarkersMap($posMap = null)
	{
		global $g;
        $result = array();
        if ($posMap === null) {
            $posMap = self::getPosMapParam();
            if (!$posMap) {
                return $result;
            }
        }
        $zooms =  array(3 => 1000000, 4 => 500000, 5 => 200000, 6 => 100000, 7 => 50000,
                        8 => 20000, 9 => 10000, 10 => 5000, 11 => 2000, 12 => 2000, 13 => 1000,
                        14 => 500, 15 => 200, 16 => 100, 17 => 50, 18 => 20);
		$platforms = Common::getOption('max_number', '3d_city_platform');
		$platforms = json_decode($platforms, true);
        $sql = 'SELECT U.name, CU.id, CU.user_id, CINR.pos_map, CINR.platform, IF(CINR.pos_map=' . to_sql($posMap) . ',1,0) AS my_pos
				  FROM `' . self::getTable('city_users_in_rooms') . '` as CINR
                  LEFT JOIN `' . self::getTable('city_users') . '` AS CU ON CU.id = CINR.cuid
                  LEFT JOIN `' . self::getTable('user') . '` AS U ON U.user_id = CU.user_id
				 WHERE ' . self::getWhereLastVisit('CINR', true, false) .
			     ' AND CINR.location = 12
                 ORDER BY `my_pos` DESC, CINR.last_visit DESC';
		$markersAll = DB::rows($sql);
        $markers = array();
        foreach ($markersAll as $marker) {
            $key = $marker['pos_map'];
            $name = $marker['user_id'] ? $marker['name'] : CityUser::getNameVisitorUser($marker['id']);
            if (!isset($markers[$key])) {
                $markers[$key] = array();
                $markers[$key]['pos_map'] = $key;
                $markers[$key]['platform'] = $marker['platform'];
                $markers[$key]['num'] = 1;
                $markers[$key]['name'] = $name;
            } else {
                $markers[$key]['num']++;
                $markers[$key]['name'] .= ', ' . $name;
            }
        }
        //print_r_pre($markers,true);
        //return;
		foreach ($markers as $marker) {
			$pos = json_decode($marker['pos_map'], true);
			$key = $pos['lat'] . '_' . $pos['lng'] . '_' . $pos['id'];
            $visZoom = 4;
            if ($result) {
                foreach ($result as $row) {
                    $LatLngFrom = new LatLng($row['lat'], $row['lng']);
                    $LatLngTo = new LatLng($pos['lat'], $pos['lng']);
                    $distance = GeoLocation::computeDistanceBetween($LatLngFrom, $LatLngTo);
                    $isZoom = false;
                    foreach ($zooms as $zoom => $scale) {
                        if ($distance >= $scale && $zoom >= $visZoom) {
                            //echo $marker['pos_map'] . '/   ' . $distance . '/   ' . $scale . '/  ' . $zoom . '<br>';
                            $visZoom = $zoom;
                            $isZoom = true;
                            if ($visZoom == 18) {
                                break(2);
                            } else {
                                break;
                            }
                        }
                        if ($zoom == 18 && !$isZoom) {
                            $visZoom = 18;
                        }
                    }
                }
            }
		    $result[$key] = array();
            $result[$key]['vis_zoom'] = $visZoom-1;
			$result[$key]['pos_map'] = $pos;
            DB::column($sql);
            $result[$key]['lat'] = $pos['lat'];
            $result[$key]['lng'] = $pos['lng'];
			$result[$key]['num'] = $marker['num'];
            $result[$key]['name'] = $marker['name'];
			$result[$key]['num_max'] = $platforms[$marker['platform']];
		}
        //print_r_pre($result,true);
		return $result;
	}

    static function getLogoUrl($location)
	{
		global $g;

        if(self::$isPlugin){
            $urlLogo = Common::getOption('url_tmpl', 'path') . 'common/logo/default.png';
            $nameLogo = 'common/logo/logo_location_' . $location . '.png';
            $pathDir = Common::getOption('dir_tmpl', 'path');
            if (file_exists($pathDir . $nameLogo)) {
                $urlLogo = Common::getOption('url_tmpl', 'path') . $nameLogo;
            }
        } else {
            $urlLogo = Common::getOption('url_city', 'path') . 'tmpl/common/logo/default.png';
            $path = 'tmpl/common/logo/logo_location_' . $location . '.png';
            $pathLogo = Common::getOption('dir_main', 'path') . '_server/city_js/' . $path;
            if (file_exists($pathLogo)) {
                $urlLogo = Common::getOption('url_city', 'path') . $path;
            }
        }

		$exts = array('.png', '.svg');
		foreach ($exts as $ext) {
            $path = 'city/logo/logo_location_' . $location . $ext;
            if(self::$isPlugin){
                $path = 'logo/logo_location_' . $location . $ext;
            }
			$pathLogo = Common::getOption('dir_files', 'path') . $path;
			if (file_exists($pathLogo)) {
				$urlLogo = Common::getOption('url_files', 'path') . $path;
				break;
			}
		}
		return $urlLogo;
	}

    static function prepareSeoAlias($name)
	{
        $name = mb_strtolower($name, 'UTF-8');
        $name = str_replace(" ", "_", $name);
        return $name;
    }

    static function getUrlInTab($type, $isMobile = false, $addUrl = true)
	{
        $url = '';
        $mobile = '';
        $m = '';
        if ($isMobile) {
            $mobile = '&view=mobile';
            if ($addUrl) {
                $m = 'm/';
            }
        }
        $param = $type;
        $place = get_param('place');
        if ($place && self::isVisitorUser()) {
            $param = $place;
        }
        if (Common::isOptionActive('seo_friendly_urls')) {
            $urlCity = '';
            if ($addUrl) {
                $urlCity = Common::urlSiteSubfolders();
            }
            $url = $urlCity . $m . '3d/' . $param;
        } else {
            $urlCity = Common::getOption('url_city', 'path');
            $url = $urlCity . 'index.php?place=' . $param . $mobile;
        }
        return $url;
    }

    static function url($type = 'street_chat', $isCityInTab = false, $addUrl = true, $isGame = false, $notInTab = false)
	{
        $url = '';
        $type = self::prepareSeoAlias($type);
        $isSeoFriendlyUrls = Common::isOptionActive('seo_friendly_urls');
        if ((Common::isMobile() || self::$isMobile) && !$notInTab) {
            return self::getUrlInTab($type, true, $addUrl);
        }
        if ((self::isCityInTab() || $isCityInTab) && !$notInTab) {
            return self::getUrlInTab($type, false, $addUrl);
        } else {
            $urlCity = '';
            if ($addUrl) {
                $urlCity = Common::urlSiteSubfolders();
            }

            if ($isSeoFriendlyUrls) {
                if ($isGame) {
                    $type = '3d_' . $type;
                }
                $url = $urlCity . $type;
            } else {
                $url = $urlCity . 'city.php?place=' . $type;
            }
        }
        return $url;
    }

    static function getLocationUrl($locInfo, $isCityInTab = false, $addUrl = true, $notInTab = false)
	{
        $alias = 'city';
        $location = $locInfo['id'];
        $isGames = $locInfo['game'];
        if (self::isLocationPlatform($location) || $isGames) {
            $url = self::url($locInfo['name'], $isCityInTab, $addUrl, $isGames, $notInTab);
        } else {
            $url = self::url('city', $isCityInTab, $addUrl, false, $notInTab);
        }
        return $url;
    }

    static function addNewUser($uid, $gender, $data, $demo = 0)
	{
        $location = $data['location'];
        $platform = $data['platform'];
        $posMap = $data['pos_map'];
        $waterLoc = $data['water_loc'];
        $invite = isset($data['invite']) ? $data['invite'] : 0;
        $position = self::calcUserInfoByDistance($location, $platform, $posMap);
        $html = null;
        $isError = self::checkMediaServerError($html, $position, false);
        if ($isError) {
            return false;
        }
        $faceId = self::getRandomAvatarFaceDefaultId($gender);
        $capId = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('cap', null, 'png', $gender, $demo))));
        $typeId = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('type', null, 'png', $gender))));
        /*$lastVisit = '';
        if ($demo) {
            $lastVisit = ', `last_visit` = "2026-07-18 18:55:38"';
        }*/
        $userInfo = array('user_id' => $uid,
                          'type' => $typeId,
                          'face' => $faceId,
                          'default' => 1,
                          'sound' => 1,
                          'cap' => $capId,
                          'location' => $location,
                          'pos' => self::jsonEncodeParam($position['pos']),
                          'pos_map' => $posMap,
                          'water_loc' => $waterLoc,
                          'platform' => $platform,
                          'floor' => 1,
                          'demo' => $demo,
                          'rot' => $position['rot'],
                          'invite' => $invite
                    );
        if ($demo) {
            $userInfo['last_visit'] = '2026-07-18 18:55:38';
        }

        /*$add = "`type` = " . to_sql($typeId) . ",
                `face` = " . to_sql($faceId) . ",
                `default` = 1,
                `sound` = 1,
                `cap` = " . to_sql($capId) . ",
                `location` = " . to_sql($location) . ",
                `pos` = " . to_sql(self::jsonEncodeParam($position['pos'])) . ",
                `pos_map` = " . to_sql($posMap) . ",
                `water_loc` = " . to_sql($waterLoc) .",
                `platform` = " . to_sql($platform) . ",
                `floor` = 1,
                `demo` = " . to_sql($demo) . ",
                `rot` = " . to_sql($position['rot']) . $lastVisit;
        $sql = "INSERT INTO `" . self::getTable('city_users') . "` SET
                `user_id` = " . to_sql($uid) . "," . $add . "
                ON DUPLICATE KEY UPDATE " . $add;
        DB::execute($sql);*/

        $where = '`user_id` = ' . to_sql($uid);
        if ($demo) {
            $where .= ' AND `location` = ' . to_sql($location);
            if ($location == 12) {
                $where .= ' AND `pos_map` = ' . to_sql($posMap);
            }
        }
        self::addOrUpdateUser($uid, $userInfo, $where);
        return true;
    }

    static function addRoomInfo($roomInfo)
	{
        $add = '';
        $addDelimiter = '';
        foreach ($roomInfo as $key => $value) {
            $add .= $addDelimiter . '`' . $key . '` = ' . to_sql($value);
            $addDelimiter = ',';
        }

        $sql = "INSERT INTO `" . self::getTable('city_users_in_rooms') . "`
                        SET " . $add . "
                         ON DUPLICATE KEY UPDATE " . $add;
        DB::execute($sql);
    }

    static function addOrUpdateUser($uid, $userInfo, $where = null, $onlyUpdate = false)
	{
        if ($where === null) {
            $where = '`user_id` = ' . to_sql($uid);
        }
        $alreadyUsers = DB::field(self::getTable('city_users'), 'id', $where);
        if ($alreadyUsers) {
            $key = array_pop($alreadyUsers);
            if ($alreadyUsers) {
                $where = '`id` IN(' . to_sql(implode(",", $alreadyUsers), 'Plain') . ')';
                DB::delete(self::getTable('city_users'), $where);
            }
            DB::update(self::getTable('city_users'), $userInfo, '`id` = ' . to_sql($key));
            return $key;
        } elseif(!$onlyUpdate) {
            DB::insert(self::getTable('city_users'), $userInfo);
            return DB::insert_id();
        }
    }

    static function deleteOldItemInRoomForStreetChat()
	{
        $rows = DB::select(self::getTable('city_users_in_rooms'), '`location` = 12 AND `last_visit` < ' . to_sql((date('Y-m-d H:i:00', time() - 3600*24*7))));
        if ($rows) {
            $deletes = array();
            foreach ($rows as $key => $row) {
                $deletes[] = $row['id'];
            }
            $where = '`id` IN (' . implode(',', $deletes) . ')';
            DB::delete(self::getTable('city_users_in_rooms'), $where);
        }
    }

    static function deleteUser($uid, $isVisitorUser = false)
	{
        global $g;
        DB::execute("DELETE FROM `" . self::getTable('city_invite') . "` WHERE from_user=" . to_sql($uid) . " OR  to_user=" . to_sql($uid));
        DB::execute("DELETE FROM `" . self::getTable('city_reject') . "` WHERE from_user=" . to_sql($uid) . " OR  to_user=" . to_sql($uid));

        if (!$isVisitorUser) {
            $sql = 'SELECT `id`
                      FROM `' . self::getTable('city_users') . '`
                     WHERE `user_id` = ' . to_sql($uid);
            $uid = DB::result($sql);
        }

        $where = '`to_user` = ' . to_sql($uid)  . ' OR `from_user` = ' . to_sql($uid);
        DB::delete(self::getTable('city_open'), $where);
        DB::delete(self::getTable('city_msg'), $where);

        DB::delete(self::getTable('city_users'), '`id` = ' . to_sql($uid));
        DB::delete(self::getTable('city_users_in_rooms'), '`cuid` = ' . to_sql($uid));
        DB::delete(self::getTable('city_moving'), '`id` = ' . to_sql($uid));

        $userFaces = DB::select(self::getTable('city_avatar_face'), '`user_id` = ' . to_sql($uid));
        foreach ($userFaces as $face) {
            $path = $g['path']['dir_files'] . 'city/users/' . $uid . '_' . $face['photo_id'];
            if (is_writable($path . '.jpg')) {
                unlink($path . '.jpg');
            }
            if (is_writable($path . '_m.jpg')) {
                unlink($path . '_m.jpg');
            }
        }
        DB::delete(self::getTable('city_avatar_face'), '`user_id` = ' . to_sql($uid));

        //For visistors delete photo
        if ($isVisitorUser) {
            DB::query('SELECT photo_id FROM ' . self::getTable('city_photo') . ' WHERE `user_id` = ' . to_sql($uid));
            while ($row = DB::fetch_row()) {
                $pid = $row['photo_id'];
                $path = $g['path']['dir_files'] . 'city/photo/' . $uid . '_' . $pid . '_';
                Common::saveFileSize(array($path . 'b.jpg', $path . 'm.jpg', $path . 's.jpg', $path . 'r.jpg', $path . 'src.jpg'), false);
                if (is_writable($path . 'b.jpg')) unlink($path . 'b.jpg');
                if (is_writable($path . 'm.jpg')) unlink($path . 'm.jpg');
                if (is_writable($path . 's.jpg')) unlink($path . 's.jpg');
                if (is_writable($path . 'r.jpg')) unlink($path . 'r.jpg');
                if (is_writable($path . 'src.jpg')) unlink($path . 'src.jpg');
            }
            DB::delete(self::getTable('city_photo'), '`user_id` = ' . to_sql($uid));
        }
    }

    static function prepareInfoLocationVisited($uid = null)
	{
        $setProp = false;
        if ($uid === null) {
            $uid = self::getUidInCity();
            $setProp = true;
        }
        $sql = 'SELECT CINR.*, CR.game  FROM `'  . self::getTable('city_users_in_rooms') . '` AS CINR
                  LEFT JOIN `' . self::getTable('city_rooms')  . '` AS CR ON CR.id = CINR.location
                 WHERE CINR.cuid = ' . to_sql($uid) .
                 ' AND CR.status = 1
                 ORDER BY CINR.last_visit DESC, CINR.id DESC';
        $fetchType = DB::getFetchType();
        DB::setFetchType(MYSQL_ASSOC);
        $usersVisitedRooms = DB::rows($sql);
        DB::setFetchType($fetchType);
        if ($setProp) {
            self::$usersVisitedRooms = $usersVisitedRooms;
        }
        return $usersVisitedRooms;
    }

    static function getInfoLocationVisitedForPlace($place = 'city', $uid = null)
	{
        if ($uid === null) {
            if (self::$usersVisitedRooms === null) {
                self::prepareInfoLocationVisited();
            }
            $usersVisitedRooms = self::$usersVisitedRooms;
        } else {
            $usersVisitedRooms = self::prepareInfoLocationVisited($uid);
        }
        $infoLastLocationVisited = array();

        $cookieLogoutLocation = get_param('city_logout_location');
        if ($cookieLogoutLocation) {
            $cookieLogoutPosMap = get_param('cookie_logout_pos_map');
            foreach ($usersVisitedRooms as $item) {
                if (($place == 'street_chat' &&  self::isLocationPlatform($cookieLogoutLocation) && $cookieLogoutPosMap
                        && $cookieLogoutLocation == $item['location'] && $cookieLogoutPosMap == $item['pos_map'])
                 || ($place != 'street_chat' &&  !self::isLocationPlatform($cookieLogoutLocation)
                        && $cookieLogoutLocation == $item['location']) ) {
                    $infoLastLocationVisited = $item;
                    break;
                }
            }
        }
        if ($infoLastLocationVisited) {
            unset($infoLastLocationVisited['game']);
            return $infoLastLocationVisited;
        }
        foreach ($usersVisitedRooms as $item) {
            if ($place == 'city') {
                if (!self::isLocationPlatform($item['location'])
                    && (!$item['game'] || ($item['game'] && self::isLocationGameData($item['location'])))) {
                    $infoLastLocationVisited = $item;
                    break;
                }
            } elseif ($place == 'street_chat') {
                if (self::isLocationPlatform($item['location'])) {
                    $infoLastLocationVisited = $item;
                    break;
                }
            } elseif ($place == 'game') {
                if ($item['game']) {
                    $infoLastLocationVisited = $item;
                    break;
                }
            } else {
                $infoLastLocationVisited = $item;
                break;
            }
        }
        unset($infoLastLocationVisited['game']);
        //print_r_pre($infoLastLocationVisited);
        //exit();
        return $infoLastLocationVisited;
    }

    static function getWhereLastVisit($alias = '', $isOnline = true, $addAnd = true)
	{
        if ($alias) {
            $alias = "{$alias}.";
        }
        $where = "{$alias}last_visit " . ($isOnline ? '>' : '<') . to_sql(date('Y-m-d H:i:s', time() - self::$onlineTime));
        if ($addAnd) {
            $where = " AND {$where}";
        }
        return $where;
    }

    static function getWhereUserId()
	{
        global $g_user;

        $where = '`user_id` = ' . to_sql($g_user['user_id']);
		if (self::isVisitorUser()) {
			$where = '`id` = ' . to_sql($g_user['user_id']);
		}
        return $where;
    }

    function loadCity(&$html)
	{
        global $g, $g_user;

        $optionTmplSet = Common::getOption('set', 'template_options');
		$optionTmplName = Common::getOption('name', 'template_options');
        if (self::$isMobile) {
            self::parseKeyboard($html);
            $html->setvar('main_photo', self::getPhotoDefault($g_user['user_id'], $g_user['gender'], false, 'm', !self::isVisitorUser()));
        }

        $cmd = get_param('cmd');
        $html->setvar('is_load_city', intval($cmd == 'load'));
        $isSkipSplashScreen = intval(Common::isOptionActive('skip_splash_screen', '3d_city'));
        /* Plugin */
        $defaultGender = '';
        if (self::$isPlugin) {
            $optionTypeConnection = Common::getOption('type_connection', '3d_city_connection');
            if (get_param('cmd') == 'city_user_exit') {//$optionTypeConnection == 'registration_wp' ||
                $isSkipSplashScreen = 0;
            }
            if (self::$isPluginJustLoad) {
                $isSkipSplashScreen = 0;
            }
            $html->setvar('type_connect', $optionTypeConnection);
            $html->setvar('is_just_load', intval(self::$isPluginJustLoad));
        }
        /* Plugin */
        $html->setvar('is_skip_splash_screen', $isSkipSplashScreen);

        $isError = false;
        $toLocation = 0;
        $userExistsLocation = 0;
        $userExists = 0;
        $posMap = '';
		$platform = 0;
        $waterLoc = 0;
        $goToUser = get_param_int('from');
		$place = trim(get_param('place'));

        if ($place) {
            $games = array('3d_labyrinth' => 14,
                           'labyrinth' => 14,
                           '3d_chess' => 15,
                           'chess' => 15,
                           '3d_giant_checkers' => 16,
                           'giant_checkers' => 16,
                           '3d_tic_tac_toe' => 17,
                           'tic_tac_toe' => 17,
                           '3d_connect_four' => 18,
                           'connect_four' => 18,
                           '3d_sea_battle' => 22,
                           'sea_battle' => 22,
                           '3d_space_labyrinth' => 50,
                           'space_labyrinth' => 50,
                           '3d_reversi' => 43,
                           'reversi' => 43,
                           '3d_hoverboard_racing' => 44,
                           'hoverboard_racing' => 44,
                           '3d_virtual_office' => 45,
                           'virtual_office' => 45,
                           '3d_building_room' => 47,
                           'building_room' => 47,
                           '3d_space_racing' => 49,
                           'space_racing' => 49,
                        );
            $type = '';
            if ($place == 'street_chat') {
                $toLocation = 12;
                $type = 'street_chat';
            } elseif (isset($games[$place])) {
                $toLocation = $games[$place];
                $type = 'game';
            } elseif ($place == 'city') {
                $type = 'city';
            } else {
                $toLocationInfo = self::getDataPlace($place);
                if ($toLocationInfo) {
                    $toLocation = $toLocationInfo['location'];
                    $type = 'city';
                    if (self::isLocationPlatform($toLocation)) {
                        $type = 'street_chat';
                    } elseif (self::isLocationGame($toLocation)) {
                        $type = 'game';
                    }
                }
            }
            if ($type) {
                $infoLastLocationVisited = self::getInfoLocationVisitedForPlace($type);
                if ($infoLastLocationVisited) {
                    $userExists = $infoLastLocationVisited;
                    $userExistsLocation = $infoLastLocationVisited['location'];
                }
            }
        }

        if (!self::isVisitorUser()) {
            if ($place) {
                if ($place == 'street_chat') {
                    if ($userExists) {
                        $toLocationInfo = $userExists;
                    } else {
                        $randomPos = self::getRandomPosMap();
                        $toLocationInfo = array('pos_map' => self::jsonEncodeParam($randomPos['pos_map']),
                                                'platform' => $randomPos['platform'],
                                                'water_loc' => 0);
                    }
                } elseif ($place == 'city') {
                    if (!$userExistsLocation) {
                        $toLocation = self::getOneRandomLocation();
                    }
                }
            } elseif ($goToUser && $goToUser != $g_user['user_id']) {
                $goToUserId = DB::result('SELECT `id` FROM ' . self::getTable('city_users') . ' WHERE `user_id` = ' . to_sql($goToUser));
                if($goToUserId){
                    $infoLastLocationVisited = self::getInfoLocationVisitedForPlace('', $goToUserId);
                    if ($infoLastLocationVisited) {
                        $toLocationInfo = $infoLastLocationVisited;
                        $toLocation = $infoLastLocationVisited['location'];
                    }
                }
            }
        }
        $isStatusToLocation = self::getStatusLocation($toLocation);
        if ($toLocation && $isStatusToLocation) {
            if (self::isLocationPlatform($toLocation)) {
                //to make a separate method -> getAvailablePosOnMap
                $allowedPos = self::getAvailablePosOnMap(json_decode($toLocationInfo['pos_map'], true), false);
                if ($allowedPos) {
                    $posMap = $toLocationInfo['pos_map'];
                    $platform = $allowedPos['platform'] ? $allowedPos['platform'] : $toLocationInfo['platform'];
                    $waterLoc = $toLocationInfo['water_loc'];
                } else {
                    $toLocationInfoPos = json_decode($toLocationInfo['pos_map'], true);
                    $allowedPos = self::getPanoInRadiusHeading($toLocationInfoPos['lat'], $toLocationInfoPos['lng']);
                    $posMap = self::jsonEncodeParam($allowedPos['pos_map']);
                    $platform = $allowedPos['platform'];
                    $waterLoc = 0;
                }
            } elseif($userExistsLocation == $toLocation) {
                $toLocation = 0;
            }
        }

        if ($userExistsLocation) {
            if (!$toLocation && !self::getStatusLocation($userExistsLocation)) {
                $toLocation = self::getOneRandomLocation();
            }elseif ($toLocation && !$isStatusToLocation) {
                $toLocation = self::getOneRandomLocation();
            }

            /* Location always random position*/
            if (!$toLocation && self::isLocationAlwaysRandomPosition($userExists['location'])) {
                $toLocation = $userExists['location'];
                $platform = $userExists['platform'];
                $posMap = $userExists['pos_map'];
            }
            /* Location always random position*/

            if ($toLocation) {
                $position = self::calcUserInfoByDistance($toLocation, $platform, $posMap);
                $isError = self::checkMediaServerError($html, $position);
                if (!$isError) {
                    $dataLocation = array(
                        'cuid' => self::getUidInCity(),
                        'location' => $toLocation,
                        'pos' => self::jsonEncodeParam($position['pos']),
                        'rot' => $position['rot']
                    );
					//pos_map, platform, water_loc

                    if (self::isLocationPlatform($toLocation)) {
                        if (is_array($posMap)) {
                            $posMap = self::jsonEncodeParam($posMap);
                        }
                        $dataLocation['pos_map'] = $posMap;
                        $dataLocation['platform'] = $platform;
                        $dataLocation['water_loc'] = $waterLoc;
                    }
                    //print_r_pre($posMap,true);
                    $data['invite'] = 0;
                    $data['demo'] = 0;
                    DB::update(self::getTable('city_users'), $data, self::getWhereUserId());
                    self::addRoomInfo($dataLocation);
                }
                $userInfo = self::getUsersListInLocation($toLocation, true, $posMap);
            } else {
                //проверить на занятость платформы при первом заходе если на карте юзер
                //обновить invite=0
                //if invite=1 проерять не нужно платформу
                DB::update(self::getTable('city_users'), array('invite' => 0, 'demo' => 0), self::getWhereUserId());
                $position = self::calcUserInfoByMovement($userExists);

                $isError = self::checkMediaServerError($html, $position);
                if (!$isError) {
                    $userInfo['pos'] = $position['pos'];
                    $userInfo['rot'] = $position['rot'];
                }
                $userInfo = self::getUsersListInLocation($userExistsLocation, true, $userExists['pos_map']);
            }
        } else {
            if (self::isDemo() && !$goToUser && (!$place || $place == 'city')) {
                $randomLocation = 2;
            } elseif ($toLocation) {
                $randomLocation = $toLocation;
            } else {
                $randomLocation = self::getOneRandomLocation();
            }

            //$randomLocation = 12;
			//If Street View then take a random coordinate
            if (self::isLocationPlatform($randomLocation) && !$posMap) {
				$randomPos = self::getRandomPosMap();
                $posMap = self::jsonEncodeParam($randomPos['pos_map']);
				$platform = $randomPos['platform'];
            }
            $position = self::calcUserInfoByDistance($randomLocation, $platform, $posMap);

            $isError = self::checkMediaServerError($html, $position);
            if ($isError) {
                $position = array('pos' => array(0, 0), 'rot' => 0);
            }
            $faceId = 0;
            $capId = 0;
            $typeId = 0;

            $faceId = self::getRandomAvatarFaceDefaultId();
            $capId = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('cap'))));
            $typeId = self::getIdImageReadFile(array_rand(array_flip(self::getImagesAvatarModel('type'))));

            $roomInfo = array('location' => $randomLocation,
                              'pos' => self::jsonEncodeParam($position['pos']),
                              'pos_map' => $posMap,
                              'water_loc' => $waterLoc,
                              'platform' => $platform,
                              'floor' => 1,
                              'rot' => $position['rot']
                        );
            $userInfo = array('user_id' => $g_user['user_id'],
                              'type' => $typeId,
                              'face' => $faceId,
                              'default' => 1,
                              'sound' => 1,
                              'cap' => $capId,
                              //'location' => $randomLocation,
                              //'pos' => self::jsonEncodeParam($position['pos']),
                              //'pos_map' => $posMap,
                              //'water_loc' => $waterLoc,
                              //'platform' => $platform,
                              //'floor' => 1,
                              //'rot' => $position['rot'],
                              'demo' => 0
                        );

            if (!$isError) {
                /*$add = "`type` = " . to_sql($typeId) . ",
                        `face` = " . to_sql($faceId) . ",
                        `default` = 1,
                        `sound` = 1,
                        `cap` = " . to_sql($capId) . ",
                        `location` = " . to_sql($randomLocation) . ",
                        `pos` = " . to_sql(self::jsonEncodeParam($position['pos'])) . ",
                        `pos_map` = " . to_sql($posMap) . ",
                        `water_loc` = " . to_sql($waterLoc) .",
                        `platform` = " . to_sql($platform) . ",
                        `floor` = 1,
                        `rot` = " . to_sql($position['rot']);
                $sql = "INSERT INTO `" . $g['db']['table_prefix'] . "city_users` SET
                        `user_id` = " . to_sql($g_user['user_id']) . "," . $add . "
                        ON DUPLICATE KEY UPDATE " . $add;
                DB::execute($sql);*/
                $roomInfo['cuid'] = self::addOrUpdateUser($g_user['user_id'], $userInfo);
                self::addRoomInfo($roomInfo);
                $userInfo = self::getUsersListInLocation($randomLocation, true, $posMap);
            } else {
                $userInfo = array_merge($userInfo, $roomInfo);
                $userInfo['face_id'] = 1;
            }
        }

        $html->setvar('is_mobile', intval(self::$isMobile));

        $faceDefaultId = $userInfo['face_id'];
        $isFaceDefault = $userInfo['default'];

		$g_user['city_user_id'] = isset($userInfo['id']) ? $userInfo['id'] : 0;
        //unset($userInfo['default']);
        //unset($userInfo['face_id']);
        //getAllowedHash($posMap = null, $platform = null, $waterLock = null)
        $location = $userInfo['location'];
        //$location = 1;

        /* First visit */
        $userInfo['cam_type'] = self::getCamType();

        $html->setvar('cur_user_id', $g_user['user_id']);

        $html->setvar('last_step', self::getLastMovingId());

        $html->setvar('cur_user_data', self::jsonEncodeParam($userInfo));

        $userPosMap = self::jsonEncodeParam($userInfo['pos_map']);
        $_GET['pos_map'] = $userPosMap;
        $usersList = self::getUsersListInLocation($location, false, $userPosMap);
        $html->setvar('users_list', self::jsonEncodeParam($usersList));

        //$customData = self::getCustomData($location);
        //$html->setvar('custom_data', self::jsonEncodeParam($customData));

        $html->cond($userInfo['sound'], 'sound_off_hide', 'sound_on_hide');

        /*$parts = array('type', 'cap', 'face');
        $userGender = mb_strtolower($g_user['gender'], 'UTF-8');
        foreach ($parts as $part) {
            $html->parse("choose_avatar_part_{$part}_{$userGender}", false);
        }

        $avatar = array('cap', 'type');
        foreach ($avatar as $item) {
            $this->parseAvatarModelImage($html, $item, $userInfo[$item]);
        }*/
        $userGenders = array(mb_strtolower($g_user['gender'], 'UTF-8'));
        if (self::$isPlugin) {// && $optionTypeConnection == 'registration_wp'
            if (!Common::isOptionActive('one_gender', '3d_city_connection')) {
                $showChangeGenderOption = Common::getOption('show_change_gender', '3d_city_connection');
                $isAllowChoosingGenderMore = Common::isOptionActive('allow_choosing_gender_more', '3d_city_connection');
                if (($showChangeGenderOption == 'show_to_avatar' && !$g_user['is_choice_gender']) || $isAllowChoosingGenderMore) {
                    $html->setvar('is_change_gender_only_once', intval(!$isAllowChoosingGenderMore));
                    $genders = MyChat3d::getGender(true);
                    if (count($genders) > 1) {
                        $userGenders = $genders;
                        MyChat3d::parseFrmGenders($html, 'choose_gender_model', $g_user['gender']) ;
                    }
                }
            }
        }elseif (!self::$isMobile && self::isVisitorUser()) {
            $block = 'choose_gender_model';
            $userGenders = CityUser::getGender(true);
            if (count($userGenders) > 1) {
                $defaultGender = mb_strtolower($g_user['gender'], 'UTF-8');
                foreach ($userGenders as $key => $value) {
                    if ($defaultGender == $value || !$defaultGender) {
                        $defaultGender = $value;
                        $html->parse("{$block}_selected", false);
                    } else {
                        $html->clean("{$block}_selected");
                    }
                    $html->setvar("{$block}_value", $userGenders[$key]);
                    $html->parse("{$block}_item", true);
                }
                $html->parse($block, false);
            }
        }

        $parts = array('type', 'cap', 'face');
        $avatar = array('cap', 'type');
        $selectedFaceId = 0;
        if ($isFaceDefault) {
            $selectedFaceId = $userInfo['face_id'];
        }
        foreach ($userGenders as $userGender) {
            foreach ($parts as $part) {
                $html->parse("choose_avatar_part_{$part}_{$userGender}", false);
            }
            foreach ($avatar as $item) {
                $this->parseAvatarModelImage($html, $item, $userInfo[$item], 'png', $userGender);
            }
            $this->parseAvatarFaceDefault($html, $selectedFaceId, $userGender);
        }

        $html->setvar('user_gender', $g_user['gender']);

        /* Upload Face */
        $maxFileSize = Common::getOption('photo_size');
        $html->setvar('photo_file_size_limit', mb_to_bytes($maxFileSize));
        $html->setvar('max_photo_file_size_limit', lSetVars('max_file_size', array('size'=>$maxFileSize)));
        //if (!Common::isOptionActive('photo_approval')) {
            $html->parse('face_upload_add_first', false);
            $html->parse('face_upload_add_last', false);
        //}
        /* Upload Face */

        CProfilePhoto::parsePhotoProfile($html, 'public', $g_user['user_id'], false, 'm', true);

        /* Number users city */
        $usersToRooms = self::getNumberUsersVisitors();
        $html->setvar('number_users_visitors', self::jsonEncodeParam($usersToRooms));
        $html->setvar('room_count_all', $usersToRooms['all']);
        /* Number users city */
        /* Rooms */
        $blockRoom = 'room_item';
        DB::query("SELECT * FROM `" . self::getTable('city_rooms') . "` WHERE `status` = 1 ORDER BY position");
        $numberRooms = 0;
        $seo = Common::getSeoSite('3dcity', 0, null, true);
        $seoDefault = $g['main']['title'] . '.' . l('3dcity');
        $html->setvar('seo_title_default', toJs($seoDefault));
        if (isset($seo['title'])) {
            $seoTitle = $seo['title'];
        } else {
            $seoTitle = $seoDefault;
            $seoDefault = '';
        }
        while ($row = DB::fetch_row()) {
            $key = self::prepareSeoAlias($row['name']);

            $html->setvar("{$blockRoom}_id", $row['id']);
            $html->setvar("{$blockRoom}_logo_url", self::getLogoUrl($row['id']));
            $html->setvar("{$blockRoom}_location_url", self::getLocationUrl($row));
            $html->setvar("{$blockRoom}_location_url_in_tab", self::getLocationUrl($row, true));
            $html->setvar("{$blockRoom}_location_url_iframe", self::getLocationUrl($row, false, true, true));

            if ($seoDefault) {
                if ($row['game'] || $row['id'] == 12) {
                    $title = str_replace('{place}', self::getSeoTitlePlace($key), $seoTitle);
                } else {
                    $title = str_replace('{place}', l('3dcity'), $seoTitle);
                }
            } else {
                $title = $seoTitle;
            }
            $html->setvar("{$blockRoom}_location_seo_title", toJs($title));

            $html->parse("{$blockRoom}_js");
            if ($row['hide']) {
                //$html->clean($blockRoom);
                continue;
            }

            $html->setvar("{$blockRoom}_count", $usersToRooms[$row['id']]);
            $html->setvar("{$blockRoom}_name",lCascade(l($row['name']), array($key . '_city')));

            if ($row['game'] && !self::isLocationGameData($row['id'])) {
                $html->parse("{$blockRoom}_game", false);
            } else {
                $html->clean("{$blockRoom}_game");
            }
            if ($row['id'] == $location) {
                $html->parse("{$blockRoom}_name_selected", false);
                $html->parse("{$blockRoom}_selected", false);
            } else {
                $html->clean("{$blockRoom}_name_selected");
                $html->clean("{$blockRoom}_selected");
            }

            $numberRooms++;
            $html->parse($blockRoom);
        }
        $html->setvar('number_rooms', $numberRooms);
        /* Rooms */

        $this->parseChat($html, $location, null, true, $userPosMap);

        $html->setvar('last_msg_id', self::lastMsgId());

        $html->setvar('option_tmpl_set', $optionTmplSet);
		$html->setvar('option_tmpl_name', $optionTmplName);
        if (self::$isPlugin) {
            $urlHomePage = MyChat3d::getHomePage();
        } else {
            $urlHomePage = Common::getHomePage();
        }
        $html->setvar('url_home_page', $urlHomePage);

        if ($html->varExists('url_login_page')) {
            $html->setvar('url_login_page', Common::getLoginPage());
        }

        $html->setvar('is_demo', intval(self::isDemo()));
        $html->setvar('show_dev_info', intval(get_param('show_dev_info')));

        if (self::$isMobile) {
            $isApp = intval(Common::isApp());
            $html->setvar('is_app', $isApp);
            if ($html->varExists('header_url_logo_mobile')) {
                $urlLogo = Common::getUrlLogo('logo', 'mobile');
                $html->setvar('header_url_logo_mobile', $urlLogo);
            }
            $vars = array('list_users_item_id', 'message_id', 'message_send', 'message_from_user_id', 'message_to_user_id');
            foreach ($vars as $value) {
                $html->setvar($value, '');
            }
            $html->parse('prepare_template', false);
        }

		/* Logo */
        $logoBig = self::getLogoUrl($location);
        $setLogo = get_param('logo');
        if ($setLogo == 2) {
            $logoBig = $g['tmpl']['url_tmpl_city'] . 'images/logo_chat_360_big.png';
        }
		$html->setvar('logo_big', $logoBig);

		$prf = '';
		$unit = 'px';
		if (self::$isMobile) {
			$unit = '';
			$prf = '_mobile';
		}
		$logoParams = json_decode(Common::getOption('logo_param' . $prf, '3d_city'), true);
		foreach ($logoParams as $key => $logoParam) {
			if (self::$isMobile) {
				$width = floatval($logoParam['w']);
			} else {
				$width = intval($logoParam['w']);
				$height = intval($logoParam['h']);
				$logoParams[$key]['h'] = $height ? $height . $unit : 'auto';
			}
			$logoParams[$key]['w'] = $width ? $width . $unit : 'auto';
		}
		$html->setvar('logo_params', self::jsonEncodeParam($logoParams));
		$html->setvar('logo_id', $location);
		$html->setvar('logo_w', $logoParams[$location]['w']);
		if (!self::$isMobile) {
			$html->setvar('logo_h', $logoParams[$location]['h']);
		}

        if (self::$isPlugin) {
            $isParseLogoLoader = Common::isOptionActive('show_logo_loading', 'logo');
            $isParseLogoPage = Common::isOptionActive('show_logo_page', 'logo');
            if ($isParseLogoLoader) {
                $html->parse('logo_loader', false);
            }
            if ($isParseLogoPage) {
                $html->parse('logo_page', false);
            }
        }
		/* Logo */

        /* Gallery */
        $imagesGallery = CityGallery::getImagesGallery($location);
        if ($imagesGallery === null){
            $imagesGallery = 0;
        }
        $html->setvar('gallery_images', $imagesGallery);
        $html->setvar('is_gallery_uploading', intval(Common::isOptionActive('allow_image_uploading', '3d_city_gallery_options_' . $location)));
        /* Gallery */

		$html->setvar('google_maps_api_key', CityMap::getKeyMap());

        if ($html->varExists('url_site')) {
            $html->setvar('url_site', Common::urlSiteSubfolders());
        }

        if ($html->varExists('links_place')) {
            if (self::$isPlugin && self::isPluginEstateAgency()) {
                $linksPlace = array('12' => '');
            } else {
                $linksPlace = self::getListLinkPlace($userInfo, $location);
            }
			$html->setvar('links_place', self::jsonEncodeParam($linksPlace));
		}

        $html->setvar('is_visitor', intval(self::isVisitorUser()));

        if(Common::isOptionActive('seo_friendly_urls')) {
            $cityLocationPage = '3d/';
        } else {
            $cityLocationPage = '3d.php?p=';
        }
        if ($html->varExists('path_pano')) {
            $html->setvar('path_pano', $g['path']['url_files_city'] . 'city/pano_cache/');
        }
        $html->setvar('city_location_link_page', $cityLocationPage);

        $customDataLocation = array();
        if (self::isLocationCustomData($location)) {
            $customDataLocation = self::saveCustomData($location);
        }
        $html->setvar('custom_data_location', self::jsonEncodeParam($customDataLocation));

        $this->isLoadCity = false;
    }

    static function prepareInit()//For plugin
	{
        global $g_user;
        $optionTypeConnection = Common::getOption('type_connection', '3d_city_connection');
        $showChangeGender = Common::getOption('show_change_gender', '3d_city_connection');
        self::$isAllowLoad = true;
        $errorBan = '';
        if (MyChat3d::isBan()){
            $errorBan = 'error_ban_user';
        } elseif ($optionTypeConnection == 'anonym_random_params') {
            if ($g_user) {
                MyChat3d::updateGenderTempUser();
            } else {
                MyChat3d::setTempUser();
            }
        } elseif (!in_array($optionTypeConnection, array('registration_full', 'registration_wp')) && !self::$isPluginJustLoad) {
            self::$isAllowLoad = false;
        } elseif ($optionTypeConnection == 'registration_wp'
                && (Common::isOptionActive('one_gender', '3d_city_connection') || $showChangeGender == 'show_to_avatar')){
            $errorBan = MyChat3d::actionLoggedWp(true);
        }
        return $errorBan;
    }

	function parseBlock(&$html)
	{
		global $g, $g_user;
        $cmd = get_param('cmd');

        if ($g_user['user_id']) {
            self::setCurrentData();
            $location = get_param('location');
            if ($this->isLoadCity) {
                $this->loadCity($html);
            } elseif ($cmd == 'open_chat') {
                $this->parseChat($html);
            } elseif ($cmd == 'send_message') {
                self::addMessage($html);
            } elseif ($cmd == 'update_moving_and_chat') {
                self::updateMessages($html);
            } elseif ($cmd == 'change_room') {
                $this->parseChat($html);
            }
        }

		parent::parseBlock($html);
	}

    /* Plugin */
    static public function isPluginEstateAgency()
    {
        if (self::$isPlugin) {
            return EstateAgency::isEstateAgency();
        }
        return false;
    }

    static public function isPluginEstateAgencySite()
    {
        if (self::$isPlugin) {
            return EstateAgency::isEstateAgency()
                    && !EstateAgency::isPlaceEdit()
                        && !EstateAgency::isManagerEdit();
        }
        return false;
    }

    static public function isPluginPlaceEdit()
    {
        if (self::$isPlugin && self::isPluginEstateAgency()) {
            return EstateAgency::isPlaceEdit();
        }
        return false;
    }

    static public function isPluginManagerEdit()
    {
        if (self::$isPlugin && self::isPluginEstateAgency()) {
            return EstateAgency::isManagerEdit();
        }
        return false;
    }

    static public function isPluginUserManager()
    {
        if (self::$isPlugin && self::isPluginEstateAgency()) {
            return EstateAgency::userManager();
        }
        return false;
    }
    /* Plugin */

    static function getWhereOnlyManages($location, $alias = '', $addAnd = true)
	{
        return '';
    }

    static function getSeoTitlePlace($place)
	{
        if ($place == 'city' || !$place) {
            $title = l('3dcity');
        } else {
            if ($place == '3d_chess' || $place == 'chess') {
                $place = 'chess_city';
            }
            $title = l(str_replace('3d_', '', $place));
        }

        return $title;
    }
}