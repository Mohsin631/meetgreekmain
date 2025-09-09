<?php
$dir = 'replays/tmp/';
$dir2 = 'replays/ready/';
file_put_contents($dir.'lock', 'lock');
$files = scandir($dir);
function sortByOrder($a, $b) {
    return $a - $b;
}
if($files)  {
    usort($files, 'sortByOrder');
    $result = '';
    foreach($files as $file){
        $result .= file_get_contents($dir.$file);
        unlink($dir.$file);
    }
    file_put_contents($dir2.date('U').'.webm', $result);
    unlink($dir.'lock');
}