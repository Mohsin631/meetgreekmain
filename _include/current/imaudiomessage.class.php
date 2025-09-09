<?php
/* (C) Websplosion LTD., 2001-2014

IMPORTANT: This is a commercial software product
and any kind of using it must agree to the Websplosion's license agreement.
It can be found at http://www.chameleonsocial.com/license.doc

This notice may not be removed from the source code. */

class ImAudioMessage {

    public static $table = 'im_audio_message';

    public static function save()
    {
        $isSaved = false;

        $uid = guid();
        $fileString = Common::getFileFromStringParam('audio');

        if($fileString && $uid) {

            $hash = md5($uid . microtime() . hash_generate(32));

            $file = self::createFilePath(0, $uid, $hash);

            if(file_put_contents($file, $fileString) === strlen($fileString)) {

                $row = array(
                    'user_id' => $uid,
                    'hash' => $hash,
                    'date' => time(),
                );
                DB::insert(self::$table, $row);
                $id = DB::insert_id();

                $fileFinal = self::createFilePath($id, $uid, $hash);
                if(rename($file, $fileFinal)) {
                    $isSaved = $id;
                } else {
                    @unlink($file);
                    @unlink($fileFinal);
                }

            } else {
                if(file_exists($file)) {
                    @unlink($file);
                }
            }
        }

        return $isSaved;
    }

    public static function updateImMsgId($id, $imMessageId)
    {
        if($id) {
            $row = array('im_msg_id' => $imMessageId);
            DB::update(self::$table, $row, 'id = ' . to_sql($id));
        }
    }

    public static function delete($id, $uid = 0)
    {
        $isDeleted = false;

        if(!$uid) {
            $uid = guid();
        }

        if($uid) {
            $where = 'user_id = ' . to_sql($uid) . ' AND id = ' . to_sql($id);

            $row = DB::one(self::$table, $where);
            if($row) {
                $file = self::createFilePath($id, $uid, $row['hash']);
                if(file_exists($file)) {
                    @unlink($file);
                }
                DB::delete(self::$table, $where);

                $isDeleted = true;
            }
        }

        return $isDeleted;
    }

    public static function deleteByUid($uid)
    {

        $imAudioMessages = DB::select(self::$table, 'user_id = ' . to_sql($uid));
        if($imAudioMessages) {
            foreach($imAudioMessages as $imAudioMessage) {
                self::delete($imAudioMessage['id'], $imAudioMessage['user_id']);
            }
        }

    }

    public static function deleteNotUsedFiles()
    {
        $where = '`im_msg_id` = 0 AND `date` < ' . to_sql(time() - 3600 * 24 * 7);
        $rows = DB::select(self::$table, $where);
        if($rows) {
            foreach($rows as $row) {
                self::delete($row['id'], $row['user_id']);
            }
        }
    }

    public static function createBasePath($id, $uid, $hash)
    {
        return 'im_audio_message/' . $id . '_' . $uid . '_' . $hash . '.wav';
    }

    public static function createFilePath($id, $uid, $hash)
    {
        $filePath = Common::getOption('dir_files', 'path') . self::createBasePath($id, $uid, $hash);
        return $filePath;
    }

    public static function getUrl($id)
    {
        $url = '';

        $where = 'id = ' . to_sql($id);
        $row = DB::one(self::$table, $where);
        if($row) {
            $url = Common::getOption('url_files', 'path') . self::createBasePath($id, $row['user_id'], $row['hash']);
        }

        return $url;
    }

    public static function isActive()
    {
        return Common::isOptionActive('im_audio_messages') && Common::getAppIosApiVersion() >= 48;
    }

}