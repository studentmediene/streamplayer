var xmlhttp=false;
var xmldoc;
var xmldocShow;
var timerNp;
var url = document.URL + '/nowplaying/crossdomain.php?type=live';
var xmlhttpshow=false;
var timerShow;
var urlShow = document.URL + '/nowplaying/crossdomain.php?type=show';
var sts;

function update() {
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

function updateShow() {
	xmlhttpshow.open('GET', urlShow, true);
	xmlhttpshow.send();
}

function hideNP() {
	document.getElementById("nowplaying-song").style.visibility="hidden";
}

function showNP() {
	document.getElementById("nowplaying-song").style.visibility="visible";
}

function xmlReady() {
	if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
		xmldoc = xmlhttp.responseXML;
		hideNP();
		document.getElementById("nowplaying-song").innerHTML = "&nbsp;";
		var items = xmldoc.getElementsByTagName('item');
		if (items !== null && items.length !== 0) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var itemType = item.getAttribute("sequence");
				if (itemType === "past") {
					continue;
				}
				var artistNode = item.getElementsByTagName("artist")[0];
				var titleNode = item.getElementsByTagName("title")[0];
				if (itemType === "present") {
					sts = item.getElementsByTagName("Time_Stop")[0].childNodes[0].nodeValue;
					document.getElementById("nowplaying-song").innerHTML = "Nå: " + artistNode.childNodes[0].nodeValue + " - " + titleNode.childNodes[0].nodeValue;
					showNP();
					break;
				} else if (itemType === "future") {
					sts = item.getElementsByTagName("Time_Start")[0].childNodes[0].nodeValue;
					var startTime = getDateFromString(sts);
					var nowTime = new Date();
					if (((nowTime.getTime()+600000) > startTime.getTime()) && ((nowTime.getTime()-600000) < startTime.getTime())) {
						document.getElementById("nowplaying-song").innerHTML = "Neste: " + artistNode.childNodes[0].nodeValue + " - " + titleNode.childNodes[0].nodeValue;
					showNP();
					}
				}
			}
		}
	}
}

function xmlReadyShow() {
	if (xmlhttpshow.readyState==4 && xmlhttpshow.status == 200) {
		xmldocShow = xmlhttpshow.responseXML;
		var items = xmldocShow.getElementsByTagName('show');
		if (items !== null && items.length !== 0) {
			sts = items[0].getElementsByTagName("stop")[0].childNodes[0].nodeValue;
			var stopTime = getDateFromString(sts);
			if (stopTime > new Date()) {
				document.getElementById("nowplaying-show").innerHTML = getUrl(items[0].getElementsByTagName("name")[0].firstChild.nodeValue);
			} else {
				document.getElementById("nowplaying-show").innerHTML = "Radio Revolt";
			}
		}
	}
}

function loadShow() {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		xmlhttpshow=new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttpshow=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = xmlReady;
	xmlhttp.send();
	timerNp = setInterval(update, 60000);
	xmlhttpshow.open('GET', urlShow, true);
	xmlhttpshow.onreadystatechange = xmlReadyShow;
	xmlhttpshow.send();
	timerShow = setInterval(updateShow, 300000);
}

function getUrl(show) {
	if (show === "Radio Revolt") return show;
	var showurl = show.toLowerCase().replace("(r)","").replace("test","").replace("opptak","").replace(/\(.*?\)/, "").replace(/!/g,"").replace(/\?/g,"").replace(/\+/g,"-").replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/\s/g,"-");
	return '<a href="http://dusken.no/radio/' + showurl + '">' + show + '</a>';
}

function addRSS() {
	$(document).ready(function() {
		$("#podcasttable tr").each(function(i) {
			var podcastTitle = $('h4', this).html();
			$('h4', this).html(getUrl(podcastTitle));
			$('<link rel="alternate" type="application/rss+xml" title="' + podcastTitle + ' podkast" href="' + $('a.icon-feed:first', this).attr('href') + '" />').appendTo("head");
		});
	});
}

function getDateFromString(dateString) {
	return new Date(dateString.substring(0,4), (dateString.substring(5,7)-1), dateString.substring(8,10), dateString.substring(11,13), dateString.substring(14,16), dateString.substring(17,19))
}

function addAlternateRowsOnTable(selector) {
	$(selector + " tr:even").addClass("even");
}
