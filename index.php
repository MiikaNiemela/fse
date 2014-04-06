<?php


?>
<!DOCTYPE html>
<html>
<head>
<title>Rajapinta.com comes here</title>
<!--META-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />

<!--IMPORTS-->
<link rel="icon" href="https://rajapinta.com/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="https://rajapinta.com/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">

<!--STYLE-->
<style type="text/css">
  html { height: 100% }
  body { height: 100%; margin: 0; padding: 0 }
  #top{ height: 42px; width: 1002px; border: 1px;}
  #logon{ height: 20px; width: 1000px; border: 1px;}
  #latlon{ height: 20px; width: 1000px; border: 1px;}
  #content{ height: 502px; width: 1002px; border: 1px;}
  #map-canvas { height: 500px; width: 500px; border: 1px; float: left;}
  #search-results { height: 500px; width: 500px; border: 1px; float: right;}
</style>

<!--SCRIPTS-->
<script type="text/javascript" src="script/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="script/jquery-ui.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1Tnbxn7Ii4I2e4Pb-sKC2-XDDKGCwDZY&sensor=true"></script>
<script type="text/javascript" src="script/scripts.js"></script>
<script type="text/javascript">
  $('document').ready(function() { 
    if (readCookie('foursquare_token') == null 
      || readCookie('latitude')  == null 
      || readCookie('longitude')  == null ) {
        getLastLocationCoordinates();
    }
    showFSUser();
    showLastLoginVenue();
    setLocation(readCookie('latitude'), readCookie('longitude'));
  });
</script>
</head>
<body>

<div id="top">
    <div id="logon"></div>
    <div id="latlon"></div>
</div>
<div id="content">
    <div id="map-canvas"></div>
    <div id="search-results"></div>
    <div id="chat-entry">
        Speak your mind:<input type="text" id="chatentrytext" name="chatentrytext"/>
        <button name="sendChatText" id="sendChatText" type="button">send</button>
    </div>
</div>
</body>
</html>
