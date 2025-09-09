<?php
$dir = 'replays/tmp/';
if(!file_exists($dir.'lock')) {
	
	$files = scandir($dir);
	if($files)  {
		foreach($files as $file){
			unlink($dir.$file);
		}
	}
}
