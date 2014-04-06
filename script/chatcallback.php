<?php
    $venueId = $_GET["id"];
    $mysqli = new mysqli("188.121.44.166", "fseDB", "FSEjfGF887!", "fseDB");
    $result = $mysqli->query("SELECT `text` , `timestamp` FROM `chats_for_venue` WHERE `venueid` = '".$venueId."' ORDER BY `timestamp` DESC LIMIT 50");

    $resultArray = array();
    if ($result) {
        /* fetch associative array */
        while ($row = $result->fetch_assoc()) {
            $resultArray[] = array('timestamp' => $row['timestamp'], 'text' => $row['text']);
        }
        /* free result set */
        $result->free();
        /* close connection */
        $mysqli->close();
    }

    $wrapperArray["response"] = $resultArray;
    header('Content-Type: application/json');
    echo json_encode($wrapperArray);    
?>