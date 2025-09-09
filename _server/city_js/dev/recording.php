<?php
var_dump($_FILES);
//file_put_contents('debug', $debug);
if($_FILES['file']['tmp_name']) {
    file_put_contents('replays/tmp/'.date('U'), file_get_contents($_FILES['file']['tmp_name']));
}

