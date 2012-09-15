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
      latitude: -23.170033, 
      longitude: 45.271122
    },
    updatedAt: new Date(2012, 9, 15,  2, 31, 31),
  },{
    name: "Fridge with good battery",
    battery: 98.9,
    location: {
      latitude: -23.170033, 
      longitude: 45.271122
    },
    updatedAt: new Date(2012, 9, 15,  2, 32, 30),
  },{
    name: "Fridge with low battery",
    battery: 11.2,
    location: {
      latitude: -23.170033, 
      longitude: 45.271122
    },
    updatedAt: new Date(2012, 9, 15,  2, 33, 31),
  },{
    name: "Fridge with old status",
    battery: null,
    location: {
      latitude: -23.170033, 
      longitude: 45.271122
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
    var batteryBar = {
      path: 'M -35,-35 L 35,-35 L 35,35 L -35,35 z',
      fillColor: "yellow",
      fillOpacity: 0.8,
      scale: 1,
      strokeColor: "gold",
      strokeWeight: 14
    };
    // Construct the bars for each value in fridges.
    var fridge = fridges[fridgeIdx];
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(fridge.location.latitude, fridge.location.longitude),
      icon: batteryBar,
      map: map
    });
  }
}
