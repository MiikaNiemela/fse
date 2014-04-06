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
  #map-canvas { height: 500px; width: 500px; border: 1px;}
</style>

<!--SCRIPTS-->
<script type="text/javascript" src="script/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="script/jquery-ui.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1Tnbxn7Ii4I2e4Pb-sKC2-XDDKGCwDZY&sensor=true"></script>
<script type="text/javascript" src="script/scripts.js"></script>
<script type="text/javascript">
  
  $('document').ready(function() { 
    //Google maps magic
    google.maps.event.addDomListener(window, 'load', initializeGMap);
  });
</script>
</head>
<body>

<div id="logon">
<a href="https://rajapinta.com/fse/script/4SQcallback.php"><img src="img/connect-blue.png"></a>
</div>
<div id="latlon"></div>
<div id="map-canvas"></div>
<div id="names"></div>




</body>
</html>
