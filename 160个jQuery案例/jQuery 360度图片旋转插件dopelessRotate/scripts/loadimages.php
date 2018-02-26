<?php
$fullpath = $_GET['fname'];
$zoomDir = $_GET['zoomdir'];

if ($fullpath[0] != '/'){
	$fullpath = '/'.$fullpath;
}

$path_parts = pathinfo($fullpath);
$imagedir =  $path_parts['dirname'];
$dir = $_SERVER['DOCUMENT_ROOT'].$imagedir;
$zdir = $dir.'/'.$zoomDir;
$images = array();
$imagesZoom = array();


$dh = opendir($dir);
while ($img = readdir($dh)) {
	if (preg_match('/(jpe?g|png|gif)$/', $img)) {
    array_push($images, "http://" . $_SERVER['HTTP_HOST'].$imagedir.'/'.$img);
	}
}
closedir($dh);

sort($images);

if (file_exists($zdir)){
$dz = opendir($zdir);
while ($imgz = readdir($dz)) {
	if (preg_match('/(jpe?g|png|gif)$/', $imgz)) {
    array_push($imagesZoom, "http://" . $_SERVER['HTTP_HOST'].$imagedir.'/'.$zoomDir.'/'.$imgz);
	}
}
closedir($dz);
sort($imagesZoom);
}
echo json_encode(array("imagelist" => $images, "zoomlist" => $imagesZoom));
?>