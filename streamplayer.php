<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<?php
$string = strstr(file_get_contents('settings.json'), "{");
$settings = json_decode($string, true);
?>
<head>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
<meta http-equiv="refresh" content="4200" /> <!-- Pga. Flash < v10 som stjeler minne over tid ved mp3-streaming. -->
<title>Radio Revolt Live</title>

<link rel="stylesheet" type="text/css" href="style.css" />

</head>

<body onload="loadShow()">
<div id="text">
    <h1 id="header"><a href="<?php print($settings['url_to_stream'])?>/<?php print($settings['stream']); ?>" class="sm2_link">Du hører på <?php if ($settings['custom_listening_string']) { print($settings['custom_listening_string']); } else { print("<span id=\"show\">". $settings['channel_name'] ."</span>"); } ?></a></h1>
    
    <p></p>
    <?php
    $start_range1 = ip2long("78.91.50.0");
	$end_range1 = ip2long("78.91.100.255");
	$start_range2 = ip2long("10.20.0.0");
	$end_range2 = ip2long("10.20.255.255");
	
	$user_ip = ip2long( $_SERVER['REMOTE_ADDR'] );
	
	if ( ($user_ip >= $start_range1 && $user_ip <= $end_range1) || ($user_ip >= $start_range2 && $user_ip <= $end_range2) || $_SERVER['REMOTE_ADDR'] == "129.241.61.254" ) {
		$ssid = "ntnu";
		if (($_SERVER['REMOTE_ADDR'] == "129.241.61.254") ||($user_ip >= $start_range2 && $user_ip <= $end_range2) ) $ssid = "ntnuguest";
		echo '<div id="iperror" class="error"><h2>Ingen lyd?</h2><p>Det ser ut som om du er koblet til internett via det trådløse nettet kalt "' . $ssid . '". Dette nettet er dessverre sperret for det meste av trafikk utenom vanlige internettsider. Hvis du er NTNU-student, anbefaler vi at du kobler til nettet ved hjelp av trådløsnettet kalt "eduroam". Informasjon om hvordan du gjør dette finner du <a href="http://www.ntnu.no/itinfo/nett-tilkobling/eduroam/eduroam.html" target="_blank">her</a>.</p><p class="quiet small">Hører du lyd, men får denne feilmeldingen likevel? Send gjerne en mail til <a href="mailto:'. $settings['contact_email'] .'?subject=Feilaktig feilmelding på RR-streamer&body=IP: '. $_SERVER['REMOTE_ADDR'] .', SSID: ' . $ssid . '">'.$settings['contact_email'].'</a> og si ifra. Inkluder gjerne din IP-adresse og hvilket nettverk du er tilkoblet.</p><p style="text-align:right;"><a href="#" onclick="document.getElementById(\'iperror\').style.display=\'none\'">[Lukk]</a></p></div>';
	}
    ?>
    <?php if ($settings['custom_notice']) { $a = $settings['custom_notice']; print <<<END
    <div class="notice">$a</div>
END;
    } else { print <<<END
    <div id="info" class="notice">Ingen sanginformasjon er tilgjengelig. Sannsynligvis er dette fordi du hører på en reprise eller et opptak.</div>
END;
    } ?>
    <?php if ($settings['enable_nowplaying']) { if ($settings['enable_nowplaying'] == 'true') { print <<<END
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
END;
} else {} } else {}
?>
</div>

<div id="sm2-container" class="swf-default">
 	  <!-- flash is appended here -->
</div>

<script type="text/javascript" src="settings.json"></script>
<script type="text/javascript" src="soundmanager2-nodebug-jsmin.js"></script>
<script type="text/javascript" src="flashblock.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="inlineplayer.js"></script>
<script type="text/javascript" src="nowplaying/jquery.storage.js"></script>
<script type="text/javascript" src="nowplaying/nowplaying.js"></script>
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
