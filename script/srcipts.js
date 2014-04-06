function initLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation,showError,{maximumAge:600000, timeout:20000});
    } else {
        alert("no geolocation support, suck it.");
    }    
}

// Callback setter for location cookies
function setLocation(position) {
    var coords = position.coords;
    //temporary cookies for lat and lon
    createCookie('latitude', coords.latitude, 0);
    createCookie('longitude', coords.longitude, 0);
    showLocation();
    showNearbyVenues(coords.latitude,coords.longitude);
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
            $(content).appendTo("#names");
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

function createMap(position) {
    setLocation(position);
    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                     zoom: 15,
                     mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var aMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var markerOptions = {
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                     map: aMap,
                     title: "you are here!"
    };
    var aMarker = new google.maps.Marker(markerOptions);
}



function initializeGMap() {
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createMap,showError,{maximumAge:600000, timeout:20000});
    } else {
        alert("no geolocation support, suck it.");
    }
}