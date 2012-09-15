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

  fridges = new Fridges();
  fridges.fetch({
    success: function() {
      setBatteryBars(map, fridges);
    },
    error: function(error) {
      console.error('Error ' + error.code + ': ' + error.message);
    }
  });
}

function setBatteryBars(map, fridges) {
  fridges.each(function(fridge) {
    var batteryBar = {
      path: 'M -35,-35 L 35,-35 L 35,35 L -35,35 z',
      fillColor: "yellow",
      fillOpacity: 0.8,
      scale: 1,
      strokeColor: "gold",
      strokeWeight: 14
    };
    // Construct the bars for each value in fridges.
    if (fridge.has('location')) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(fridge.location().latitude,
                                       fridge.location().longitude),
        icon: batteryBar,
        map: map
      });
    }
  });
}
