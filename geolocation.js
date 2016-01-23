function initialize() {

    var javier = {
        lat: 10.592510,
        lng: -71.632508
    };

    function obtener( ubicacion ) {
        var miUbication = {
            lat: ubicacion.coords.latitude,
            lng: ubicacion.coords.longitude
        };

        // Set destination, origin and travel mode.
        var request = {
            destination: mapProp.center,
            origin: new google.maps.LatLng(miUbication.lat, miUbication.lng),
            travelMode: google.maps.TravelMode.DRIVING
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
            }
        });
    }

    var mapProp = {
        center: new google.maps.LatLng(javier.lat, javier.lng),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var marker = new google.maps.Marker({
        position: mapProp.center,
        animation:google.maps.Animation.BOUNCE
    });

    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
        content:"Aqui esta su destino"
    });

    infowindow.open(map,marker);

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    navigator.geolocation.getCurrentPosition(obtener);

}
google.maps.event.addDomListener(window, 'load', initialize);