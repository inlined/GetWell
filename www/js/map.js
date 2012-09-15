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
      { "color": "#52ff54" },
      { "weight": 5 }
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

var fridges = [
  {
    name: "Fridge on diesel",
    battery: null,
    location: {
      latitude: 11.275387,
      longitude: 30.166809
    },
    updatedAt: new Date(2012, 9, 15,  2, 31, 31),
  },{
    name: "Fridge with good battery",
    battery: 98.9,
    location: {
      latitude: -25.076892,
      longitude: 16.917366
    },
    updatedAt: new Date(2012, 9, 15,  2, 32, 30),
  },{
    name: "Fridge with low battery",
    battery: 11.2,
    location: {
      latitude: -7.808963, 
      longitude: 23.168518
    },
    updatedAt: new Date(2012, 9, 15,  2, 33, 31),
  },{
    name: "Fridge with old status",
    battery: null,
    location: {
      latitude: 5.495704,
      longitude: 39.054749
    },
    updatedAt: new Date(2012, 9, 14,  2, 33, 31),
  }
];

function initializeMap(domElement) {
  var styledMap = new google.maps.StyledMapType(styles, {name: "Africa"});
  var mapOptions = {
    center: africa,
    zoom: 4,
    mapTypeId: 'map_style'
  };
  var map = new google.maps.Map(domElement, mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
  setBatteryBars(map, fridges);
}

function setBatteryBars(map, fridges) {
  for (var fridgeIdx in fridges) {
    // Construct the bars for each value in fridges.
    var fridge = fridges[fridgeIdx];
    var batteryColor = getBatteryColor(fridge.battery)
    var batteryBar = {
      path: 'M -5,-10 L 5,-10 L 5,10 L -5,10 z M -3,-10 L -3,-12 3,-12 3,-10 z',
      fillColor: batteryColor,
      fillOpacity: 0.8,
      scale: 1,
      strokeColor: "black",
      strokeWeight: 4,
      scale: 3
    };

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(fridge.location.latitude, fridge.location.longitude),
      icon: batteryBar,
      map: map
    });
  }
}

function getBatteryColor(batteryLevel) {
  if (batteryLevel == null) {
    return "green";
  } else if (batteryLevel < 1) {
    return "black";
  } else if (batteryLevel < 50) {
    return "red";
  } else if (batteryLevel < 75) {
    return "orange";
  } else {
    return "yellow";
  }
}
