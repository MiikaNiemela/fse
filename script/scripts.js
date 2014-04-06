$("#sendChatText").on("click", function (e) {
    $.getJSON('https://rajapinta.com/fse/script/chatadd.php', { 'id': readCookie('venueId'), 'text': $("#chatentrytext").val() },
        function(data) {
            $.each(data.response, function(i,entries){
            content = '<div id="'+entries.timestamp+'">' + entries.text + '</div>';
            $(content).appendTo("#search-results");
        });
    });
});

function initLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation,showError,{maximumAge:600000, timeout:20000});
    } else {
        alert("no geolocation support, suck it.");
    }    
}

// sets location cookies, 
// AND calls setters for all location related ui components
function setLocation(lat,lon) {
    //temporary cookies for lat and lon
    createCookie('latitude', lat, 1);
    createCookie('longitude', lon, 1);
    google.maps.event.addDomListener(window, 'load', initializeGMap);
}
function getLastLocationCoordinates() {
    $.getJSON('https://api.foursquare.com/v2/users/self/checkins?oauth_token='+readCookie('foursquare_token')+'&limit=1&sort=newestfirst&v=20141017',
        function(data) {
            chekin = data.response.checkins.items[0];
            createCookie('venueId', chekin.venue.id, 1);
            setLocation(chekin.venue.location.lat, chekin.venue.location.lng);
            siteInfo = '<div id="last-login"> Last login at '+chekin.venue.name+'</div>';
            $(siteInfo).appendTo("#latlon");
        });
}

function showLocation() {
    latlon = '<div id="IRABABOON">'+readCookie('latitude')+','+readCookie('longitude')+'</div>';
    $(latlon).appendTo("#latlon");
    
}

function showNearbyVenues(lat,lon) {
    $.getJSON('https://api.foursquare.com/v2/venues/search?ll='+lat+','+lon+'&client_id=SPXZK20MB3HIMXZJPBXPPVA1RAJQWX2EEZP3R5EFUNRI050T&client_secret=R1H25EXVS1IXFEOFUB4OEARLLXCED0SF4EEF3E1MFOBEQVC0&v=20141017',
        function(data) {
            $.each(data.response.venues, function(i,venues){
                content = '<div id="'+venues.id+'">' + venues.name + '</div>';
                $(content).appendTo("#search-results");
            });
        });
}

function showFSUser() {
    
    if (readCookie('foursquare_token') == null) {
        fsLoginButton ='<a href="https://rajapinta.com/fse/script/4SQcallback.php"><img src="img/connect-blue.png"></a>';
        $(fsLoginButton).appendTo("#logon");
    } else {
        $.getJSON('https://api.foursquare.com/v2/users/self?oauth_token='+readCookie('foursquare_token')+'&v=20141017',
            function(data) {
                userInfo = '<div id="user"> Welcome '+$.trim(data.response.user.firstName)+' '+$.trim(data.response.user.lastName)+'</div>';
                $(userInfo).appendTo("#logon");
            });
    }
}

function showLastLoginVenue() {
    $.getJSON('https://api.foursquare.com/v2/users/self/checkins?oauth_token='+readCookie('foursquare_token')+'&limit=1&sort=newestfirst&v=20141017',
        function(data) {
            chekin = data.response.checkins.items[0];
            siteInfo = '<div id="last-login"> Last login at '+chekin.venue.name+'</div>';
            $(siteInfo).appendTo("#latlon");
            getAndShowVenueChat(chekin.venue.id);
        });
}

function getAndShowVenueChat(venueId) {
    $.getJSON('https://rajapinta.com/fse/script/chatcallback.php', {'id': venueId},
        function(data) {
            $.each(data.response, function(i,entries){
                content = '<div id="'+entries.timestamp+'">' + entries.text + '</div>';
                $(content).appendTo("#search-results");
            });
        });        
}

// Basic cookie creation, copied from the interweb
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

// "read cookie", copied from the interweb
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// "erase Cookie by over writing it", this came from the webs too.
function eraseCookie(name) {
    createCookie(name,"",-1);
}

// Function, shows errlo1s. 
// TODO: I am sure that it should not use alert dialog, that is just plain wrong.
function showError(error)
{
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function createMap(lat,lon) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lon),
                     zoom: 15,
                     mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var aMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var markerOptions = {
        position: new google.maps.LatLng(lat, lon),
                     map: aMap,
                     title: "you are here!"
    };
    var aMarker = new google.maps.Marker(markerOptions);
}

function centerMap(lat,lon) {
    var myLatlng1 = new google.maps.LatLng(lat, lon);
    
    var mapOptions = 
    {
        zoom: 10,
        center: myLatlng1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    map.setCenter(myLatlng1,12);

}

function initializeGMap() {
    createMap(readCookie('latitude'), readCookie('longitude'));
    // Try W3C Geolocation (Preferred)
    //if(navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(createMap,showError,{maximumAge:600000, timeout:20000});
    //} else {
    //    alert("no geolocation support, suck it.");
    //}
}