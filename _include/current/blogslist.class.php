<?php

/* (C) Websplosion LTD., 2001-2014

  IMPORTANT: This is a commercial software product
  and any kind of using it must agree to the Websplosion's license agreement.
  It can be found at http://www.chameleonsocial.com/license.doc

  This notice may not be removed from the source code. */

class BlogsList extends Blogs{

    static $isGetDataWithFilter = false;
    static $tbPost = 'blogs_post';
    static $tbTags = 'blogs_post_tags';
    static $tbTagsRelations = 'blogs_post_tags_relations';

    static public function getTotalBlogsFromUser($uid = null) {
        if ($uid === null) {
            $uid = User::getParamUid(0);
        }

        $where = self::getWhereList('', $uid);
        return DB::count(self::$tbPost, $where);
    }
}