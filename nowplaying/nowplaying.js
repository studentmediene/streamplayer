// Should be rewritten to use jQuery, but haven't found the time yet.
// Author: Jørgen Jervidalo (jervi@radiorevolt.no)

var xmlhttp=false;
var xmldoc;
var xmldocShow;
var url = document.URL + '/nowplaying/crossdomain.php?type=live';
var timerNp;
var xmlhttpshow=false;
var timerShow;
var urlShow = document.URL + '/nowplaying/crossdomain.php?type=show';
var sts;

var xmlreqsspotify = new Array();

function CXMLReq(freed) {
	this.freed = freed;
	this.xmlhttp = false;
	if (window.XMLHttpRequest) {
		this.xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function xmlreqspotify(url) {
	var pos = -1;
	for (var i=0; i<xmlreqsspotify.length; i++) {
		if (xmlreqsspotify[i].freed == 1) { pos = i; break; }
	}
	if (pos == -1) { pos = xmlreqsspotify.length; xmlreqsspotify[pos] = new CXMLReq(1); }
	if (xmlreqsspotify[pos].xmlhttp) {
		xmlreqsspotify[pos].freed = 0;
		xmlreqsspotify[pos].xmlhttp.open("GET",url,true);
		xmlreqsspotify[pos].xmlhttp.onreadystatechange = function() {
			if (typeof(xmlhttpChangeSpotify) != 'undefined') { xmlhttpChangeSpotify(pos); }
		}
		if (window.XMLHttpRequest) {
			xmlreqsspotify[pos].xmlhttp.send(null);
		} else if (window.ActiveXObject) {
			xmlreqsspotify[pos].xmlhttp.send();
		}
	}
}

function update() {
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

function updateShow() {
	xmlhttpshow.open('GET', urlShow, true);
	xmlhttpshow.send();
}

function updateSpotify(songtitle) {
	xmlreqspotify(document.URL + '/nowplaying/crossdomain.php?type=spotify&q=' + encodeURIComponent(cleanTitle(songtitle)));
}

function cleanTitle(songtitle) {
	songtitle = songtitle.replace(/ – /gi, " ");
	songtitle = songtitle.replace(/\(.*?\)/gi, "");
	songtitle = songtitle.replace(/feat[^\s]+/gi, "");
	return decodeURIComponent(songtitle);
}

function hideNP() {
	document.getElementById("nowplaying").style.visibility="hidden";
	clearInterval(timerNp);
	timerNp = setInterval(update, 300000);
	document.title = "Radio Revolt Live";
}

function showNP() {
	document.getElementById("nowplaying").style.visibility="visible";
	clearInterval(timerNp);
	timerNp = setInterval(update, 30000);
}

function xmlReady() {
	if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
		xmldoc = xmlhttp.responseXML;
		document.getElementById("pastRow").style.visibility="hidden";
		document.getElementById("presentRow").style.visibility="hidden";
		document.getElementById("futureRow").style.visibility="hidden";
		document.getElementById("past").innerHTML = "";
		document.getElementById("present").innerHTML = "";
		document.getElementById("future").innerHTML = "";
		document.title = "Radio Revolt Live";
		
		var items = xmldoc.getElementsByTagName('item');
		if (items !== null && items.length !== 0) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var itemType = item.getAttribute("sequence");
				var artistNode = item.getElementsByTagName("artist")[0];
				var titleNode = item.getElementsByTagName("title")[0];
				if (itemType === "past") {
					sts = item.getElementsByTagName("Time_RealStop")[0].childNodes[0].nodeValue;
					var stopTime = getDateFromString(sts);
					if ((new Date().getTime()-600000) < stopTime.getTime()) {
						document.getElementById("pastRow").style.visibility="visible";
					}
				} else if (itemType === "present") {
					document.getElementById("presentRow").style.visibility="visible";
					document.title = artistNode.childNodes[0].nodeValue + " - " + titleNode.childNodes[0].nodeValue + " :: Radio Revolt Live";
				} else if (itemType === "future") {
					sts = item.getElementsByTagName("Time_Start")[0].childNodes[0].nodeValue;
					var startTime = getDateFromString(sts);
					if (((new Date().getTime()+600000) > startTime.getTime()) && ((new Date().getTime()-600000) < startTime.getTime())) {
						document.getElementById("futureRow").style.visibility="visible";
					}
				}
				var searchTerms = artistNode.childNodes[0].nodeValue + " " + titleNode.childNodes[0].nodeValue;
				var spotify = $.read(cleanTitle(searchTerms).replace(/\s/gi, ""));
				if (spotify !== null && spotify !== "false") {
					document.getElementById(itemType).innerHTML = '<a href="' + spotify + '"><img src="http://blogs.dusken.no/wp/wp-content/themes/simple-magazine/img/spotify-logo-liten.png" alt="Spotify" /> ' + artistNode.childNodes[0].nodeValue + " - " + titleNode.childNodes[0].nodeValue + '</a>';
				} else {
					document.getElementById(itemType).innerHTML = artistNode.childNodes[0].nodeValue + " - " + titleNode.childNodes[0].nodeValue;
					if (spotify !== "false") updateSpotify(searchTerms);
				}
			}
			if (document.getElementById("nowplaying").style.visibility === "hidden") {
				showNP();
			}
		} else {
			hideNP();
		}
		if ((document.getElementById("nowplaying").style.visibility === "hidden") || (document.getElementById("pastRow").style.visibility === "hidden" && document.getElementById("presentRow").style.visibility === "hidden" && document.getElementById("futureRow").style.visibility === "hidden")) {
			document.getElementById("info").style.visibility="visible";
		} else {
			document.getElementById("info").style.visibility="hidden";
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
				document.getElementById("show").innerHTML = items[0].getElementsByTagName("name")[0].firstChild.nodeValue;
			} else {
				document.getElementById("show").innerHTML = "Radio Revolt";
			}
		}
	}
}

function handleSpotify(xmldocspotify) {
	var searchterms = xmldocspotify.getElementsByTagName('Query');
	if (searchterms == null || searchterms.length == 0) {
		searchterms = xmldocspotify.getElementsByTagName('query');
		if (searchterms == null || searchterms.length == 0) {
			searchterms = xmldocspotify.getElementsByTagName('opensearch:Query');
			if (searchterms == null || searchterms.length == 0) {
				searchterms = xmldocspotify.getElementsByTagName('opensearch:query');
			}
		}
	}
	var items = xmldocspotify.getElementsByTagName('track');
	if ((searchterms !== null && searchterms.length !== 0) && (items !== null && items.length !== 0)) {
		$.store(searchterms[0].getAttribute("searchTerms").replace(/\s/gi, ""), items[0].getAttribute("href"));
	} else if (searchterms !== null && searchterms.length !== 0) {
		$.store(searchterms[0].getAttribute("searchTerms").replace(/\s/gi, ""), 'false');
	}
}

function xmlhttpChangeSpotify(pos) {
	if (typeof(xmlreqsspotify[pos]) != 'undefined' && xmlreqsspotify[pos].freed == 0 && xmlreqsspotify[pos].xmlhttp.readyState == 4) {
		if (xmlreqsspotify[pos].xmlhttp.status == 200 || xmlreqsspotify[pos].xmlhttp.status == 304) {
			handleSpotify(xmlreqsspotify[pos].xmlhttp.responseXML);
		}
		xmlreqsspotify[pos].freed = 1;
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
	timerNp = setInterval(update, 30000);
	xmlhttpshow.open('GET', urlShow, true);
	xmlhttpshow.onreadystatechange = xmlReadyShow;
	xmlhttpshow.send();
	timerShow = setInterval(updateShow, 300000);
}

function getDateFromString(dateString) {
	return new Date(dateString.substring(0,4), (dateString.substring(5,7)-1), dateString.substring(8,10), dateString.substring(11,13), dateString.substring(14,16), dateString.substring(17,19))
}
