<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">

<head>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
<meta http-equiv="refresh" content="6300" />
<title>Radio Revolt Live</title>

<link rel="stylesheet" type="text/css" href="style.css" />

<script type="text/javascript" src="../nowplaying/nowplaying.js"></script>

</head>

<body onload="loadShow()">
<div id="text">

	<h1 id="headerHTML5"><a href="http://streamer.radiorevolt.no:8000/revolt" onclick="playPause(); return false" id="html5" class="playing">Du hører på <span id="show">Radio Revolt</span></a></h1>

	<audio autoplay="autoplay">
		<source src="http://streamer.radiorevolt.no:8000/revolt" type="audio/mpeg" />
		<div class="error">Din nettleser støtter dessverre ikke HTML5.</div>
	</audio>
    
    <p></p>
    <div id="info" class="notice">Ingen sanginformasjon er tilgjengelig. Sannsynligvis er dette fordi du hører på en reprise eller et opptak.</div>
    <table id="nowplaying">
        <tr class="grey" id="pastRow">
            <td>
                <strong>Forrige sang:</strong>
            </td>
            <td id="past">
            </td>
        </tr>
        <tr id="presentRow">
            <td>
                <strong>Spilles nå:</strong>
            </td>
            <td id="present">
            </td>
        </tr>
        <tr class="grey" id="futureRow">
            <td>
                <strong>Neste sang:</strong>
            </td>
            <td id="future">
            </td>
        </tr>
    </table>
</div>

<script>
var myAudio = document.getElementsByTagName('audio')[0];

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
 
function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
 
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function playPause() {
 	var link = document.getElementById('html5');
 	if (myAudio.paused) {
 		myAudio.src="http://streamer.radiorevolt.no:8000/revolt";
		myAudio.load();
    	myAudio.play();
		removeClass(link, "paused");
		addClass(link, "playing");
	} else {
    	myAudio.pause();
    	link.className.replace('playing','')
	   	removeClass(link, "playing");
   		addClass(link, "paused");
	}
}

</script>

<!-- Google Analytics -->
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try{
var pageTracker = _gat._getTracker("UA-5361862-2");
pageTracker._trackPageview();
} catch(err) {}
</script>
</body>

</html>