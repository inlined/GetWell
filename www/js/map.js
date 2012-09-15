var styles = [
  {
    "featureType": "administrative.province",
      "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.locality",
      "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.neighborhood",
      "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.land_parcel",
      "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
      "stylers": [
      { "color": "#808080" },
      { "lightness": -62 }
    ]
  },{
    "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
      { "color": "#DAF935" },
      { "weight": 3.2 }
    ]
  },{
    "featureType": "landscape",
      "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.natural",
      "stylers": [
      { "visibility": "on" },
      { "color": "#808080" }
    ]
  },{
    "featureType": "poi",
      "stylers": [
      { "visibility": "off" }
    ]
  }
];

var africa = new google.maps.LatLng(3.024641, 22.497545);

var currentlyOpenInfoWindow = null;

function initializeMap(domElement, fridges) {
  var styledMap = new google.maps.StyledMapType(styles, {name: "Africa"});
  var mapOptions = {
    center: africa,
    zoom: 3,
    mapTypeId: 'map_style'
  };
  var map = new google.maps.Map(domElement, mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  addMarkers(map, fridges);
  return map;
}

var markers = [];

function addMarkers(map, fridges) {
  fridges.each(function(fridge) {
    var markerIcon = {
      path: getMarkerPath(fridge),
      fillColor: getMarkerColor(fridge, false),
      fillOpacity: 0.85,
      strokeColor: "black",
      strokeWeight: 3.2,
      scale: 2.2
    };
    if (fridge.has('location')) {
      var marker = new google.maps.Marker({
        title:  fridge.name(),
        position: new google.maps.LatLng(fridge.location().latitude,
                                       fridge.location().longitude),
        icon: markerIcon,
        map: map
      });
      google.maps.event.addListener(marker, 'click', function() {
        if (currentlyOpenInfoWindow != null) {
          currentlyOpenInfoWindow.close();
        }
        var infowindow = new google.maps.InfoWindow({
          content: getFridgeInfoContent(fridge),
        });
        infowindow.open(map, marker);
        currentlyOpenInfoWindow = infowindow;
      });
      markers.push(marker);
    }
  });
}

function reloadMarkers(map, fridges) {
  deleteMarkers();
  addMarkers(map, fridges);
}

function deleteMarkers() {
  if (markers) {
    for (i in markers) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }
}

function getFridgeInfoContent(fridge) {
  var infoWindowContent = [];
  infoWindowContent.push("<div>Fridge: ",
                         fridge.name(),
                         "</div><div>Lat/Long: ",
                         fridge.location().latitude,
                         ", ",
                         fridge.location().longitude,
                         "</div>");
  infoWindowContent.push("<div>Using battery: ",
                         fridge.usingBattery(),
                         "</div>");
  infoWindowContent.push("<div>Battery: ",
                         fridge.battery() == null ? "100" : fridge.battery(),
                         "%</div>");
  infoWindowContent.push("<div>Last updated: ",
                         Parse._parseDate(fridge.updatedAt),
                         "</div>");
  return infoWindowContent.join("");
}


function getMarkerColor(fridge, colorTowers) {
  if (fridge.battery() == null || (!fridge.usingBattery() && !colorTowers)) {
    return "#12ff12";
  } else if (fridge.battery() < 1) {
    return "black";
  } else if (fridge.battery() < 50) {
    return "red";
  } else if (fridge.battery() < 75) {
    return "orange";
  } else {
    return "#ffff52";
  }
}

function getMarkerPath(fridge) {
  if (fridge.usingBattery()) {
    return 'M -5,-10 L 5,-10 L 5,10 L -5,10 z M -3,-10 L -3,-12 3,-12 3,-10 z';
  } else {
    return 'M -7,10 L 0,-10 L 7,10 z';
  }
}
