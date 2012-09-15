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

function initializeMap(domElement) {
  var styledMap = new google.maps.StyledMapType(styles, {name: "Africa"});
  var mapOptions = {
    center: africa,
    zoom: 3,
    mapTypeId: 'map_style'
  };
  var map = new google.maps.Map(domElement, mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  fridges = new Fridges();
  fridges.bind('reset', function() {
    setBatteryBars(map, fridges);
  });
  fridges.fetch();
}

function setBatteryBars(map, fridges) {
  fridges.each(function(fridge) {
    var batteryBar = {
      path: getBatteryPath(fridge.battery()),
      fillColor: getBatteryColor(fridge.battery()),
      fillOpacity: 0.85,
      strokeColor: "black",
      strokeWeight: 3.2,
      scale: 2.2
    };
    // Construct the bars for each value in fridges.
    if (fridge.has('location')) {
      var marker = new google.maps.Marker({
        title:  fridge.name(),
        position: new google.maps.LatLng(fridge.location().latitude,
                                       fridge.location().longitude),
        icon: batteryBar,
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
    }
  });
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
  infoWindowContent.push("<div>Battery: ",
                         fridge.battery() == null ? "On generator power" : fridge.battery(),
                         "</div>");
  infoWindowContent.push("<div>Last updated: ",
                         fridge.updatedAt,
                         "</div>");
  return infoWindowContent.join("");
}


function getBatteryColor(batteryLevel) {
  if (batteryLevel == null) {
    return "#12ff12";
  } else if (batteryLevel < 1) {
    return "black";
  } else if (batteryLevel < 50) {
    return "red";
  } else if (batteryLevel < 75) {
    return "orange";
  } else {
    return "#ffff52";
  }
}

function getBatteryPath(batteryLevel) {
  if (batteryLevel == null) {
    return 'M -7,10 L 0,-10 L 7,10 z';
  } else {
    return 'M -5,-10 L 5,-10 L 5,10 L -5,10 z M -3,-10 L -3,-12 3,-12 3,-10 z';
  }
}
