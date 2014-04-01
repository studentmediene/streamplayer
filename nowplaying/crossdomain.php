<?php

$xml = null;
$type = $_GET["type"];
switch ($type) {
	case 'autoavvikler-live':
		$xml = file_get_contents('http://pappagorg.radiorevolt.no/digaswebexport/nowplaying_autoavvikler.xml');
		break;
	case 'studio-live':
		$xml = file_get_contents('http://pappagorg.radiorevolt.no/digaswebexport/nowplaying_studio.xml');
		break;
	case 'live':
		$xml = file_get_contents('http://pappagorg.radiorevolt.no/digaswebexport/nowplaying.xml');
		break;
	case 'show':
		getLastProgram();
		break;
	case 'spotify':
		$xml = file_get_contents('http://ws.spotify.com/search/1/track?q=' . urlencode($_GET["q"]));
		break;
}

if ($xml != null) {
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
	header('Content-type: text/xml; charset=utf-8');
	echo str_replace("UTF-16", "UTF-8", $xml);
}

function getLastProgram() {
	global $xml;
	$names = getFileNames();
	foreach ($names as $name) {
		$url = get_headers($name);
		if (strpos($url[0], "200") !== false) {
			$xml = file_get_contents($name);
			break;
		}
	}
	unset($names);
}

function getFileNames() {
	$date = mktime(date("H"), 0, 0, date("m"), date("d"), date("Y"));
	for ($i = 0; $i < 6; $i++) {
		$names[$i] = "http://pappagorg.radiorevolt.no/digaswebexport/" . date("Ymd-Hi", $date) . ".xml";
		$date=$date-3600;
	}
	return $names;
}

?>