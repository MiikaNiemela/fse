<?php
// Foursquare login step 2, echo back $code from QUERY_STRING
require_once('dongle'); // defines CLIENT_ID & CLIENT_SECRET

// get $code from QUERY_STRING
parse_str($_SERVER['QUERY_STRING'], $query);
$code = $query['code'];

// If the headers do not have a fs authentication code, then open fs login
if ($code == NULL) {
    $url = 'https://foursquare.com/oauth2/authenticate?client_id='.$CLIENT_ID.'&response_type=code&redirect_uri=https://rajapinta.com/fse/script/4SQcallback.php';
    header( "Location: $url" );

} else {

    // build url
    $url = 'https://foursquare.com/oauth2/access_token';
    $url .= '?client_id='.$CLIENT_ID;
    $url .= '&client_secret='.$CLIENT_SECRET;
    $url .= '&grant_type=authorization_code';
    $url .= '&redirect_uri=https://rajapinta.com/fse/script/4SQcallback.php'; // this 
    $url .= '&code='.$code;

    //CURL SETUP
    // 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result = curl_exec($ch);
    curl_close($ch);

    // get access token
    $values = json_decode($result, true);
    $token = $values['access_token'];

    // set access_token cookie
    $expire = time()+2592000; // 30 days from now
    setcookie("foursquare_token", $token, $expire, '/');

    // Go to index 
    $url = 'https://rajapinta.com/fse/index.php';
    header( "Location: $url" );
}
?>