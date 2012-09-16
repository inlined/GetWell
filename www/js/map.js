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

var terribleGlobalMap = null;

function initializeMap(domElement, fridges) {
  var styledMap = new google.maps.StyledMapType(styles, {name: "Africa"});
  var mapOptions = {
    center: africa,
    zoom: 3,
    mapTypeId: 'map_style',
    streetViewControl: false,
  };
  var map = new google.maps.Map(domElement, mapOptions);
  terribleGlobalMap = map;
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  addMarkers(map, fridges);
  return map;
}

var markers = [];

function getFridgeIcon(fridge) {
    var markerIcon = {
      path: getMarkerPath(fridge),
      fillColor: getMarkerColor(fridge, false),
      fillOpacity: 1, 
      strokeColor: "black",
      strokeWeight: 2.3,
      scale: 15.0
    };
    return markerIcon;
}

function addMarkers(map, fridges) {
  fridges.each(function(fridge) {
    addMarker(map, fridge);
  });
}

function addMarker(map, fridge) {
  if (fridge.has("location")) {
    var marker = new google.maps.Marker({
      title:  fridge.name(),
      position: new google.maps.LatLng(fridge.location().latitude,
                                       fridge.location().longitude),
      icon: getFridgeIcon(fridge),
      map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
      fridgeClicked(marker.fridge.id); 
    });
    marker.infowindow = new google.maps.InfoWindow({
      content: getFridgeInfoContent(fridge),
    });
    marker.fridge = fridge;
    markers.push(marker);
  }
}

function reloadMarkers(map, fridges) {
  if (markers.length > 0) {
    for (i in markers) {
      fridges.each(function(fridge) {
        if (fridge.id == markers[i].fridge.id) {
          if (fridge.updatedAt > markers[i].fridge.updatedAt) {
            markers[i].infowindow.setContent(getFridgeInfoContent(fridge));
            markers[i].setIcon(getFridgeIcon(fridge));
              if (markers[i].infowindow === currentlyOpenInfoWindow) {
                  updateChart(fridge);
              }

          }
          delete markers[i].fridge;
          markers[i].fridge = fridge;
        }
      });
    }
    fridges.each(function(fridge) {
      if (!fridge.has("markerAdded")) {
        addMarker(map, fridge);
      }
    });
  } else {
    addMarkers(map, fridges);
  }
}

function getFridgeInfoContent(fridge) {
    /*
  var infoWindowContent = [];
  infoWindowContent.push("<div>Fridge: ",
                         fridge.name(),
                         "</div><div>Lat/Long: ",
                         fridge.location().latitude,
                         ", ",
                         fridge.location().longitude,
                         "</div>");
  infoWindowContent.push("<div>Power Source: ",
                         fridge.usingBattery() ? "Battery" : "Generator",
                         "</div>");
  infoWindowContent.push("<div>Battery: ",
                         fridge.battery() == null ? "100" : fridge.battery(),
                         "%</div>");
  infoWindowContent.push("<div>Last updated: ",
                         fridge.updatedAt,
                         "</div>");
  infoWindowContent.push("<div id='fridgeChart'></div>");
  return infoWindowContent.join("");
  */
    var data = fridge.toJSON();
    data.timestamp = moment(fridge.updated()).format('MMMM Do YYYY, h:mm:ss a');

    var progressclass = "progress-info";
    fourMinAgo = moment().subtract('minutes', 4);
    if (fourMinAgo.diff(moment(fridge.updated())) >= 0) {
        progressclass = "progress-danger";
    } else if (fridge.usingBattery()) {
        if (fridge.battery() < 50) {
            progressclass = "progress-danger";
        } else {
            progressclass = "progress-warning";
        }
    }
    data.progressbar = "<div class=\"progress " + progressclass + "\"><div class=\"bar\" style=\"width:" + data.battery + "%\"></div></div>";
    return template.popup(data);
}


function getMarkerColor(fridge, colorTowers) {
  if (fridgeIsOffline(fridge)) {
    return "#4B4B4B";
  } else if ((!fridge.usingBattery() && !colorTowers)) {
    return "#12ff12";
  } else if (fridge.battery() < 1) {
    return "black";
  } else if (fridge.battery() < 50) {
    return "red";
  } else {
    return "#F89406";
  }
}

function fridgeIsOffline(fridge) {
  fourMinAgo = moment().subtract('minutes', 4); 
  return fourMinAgo.diff(moment(fridge.updated())) >= 0; 
}

function getMarkerPath(fridge) {
  if (fridge.usingBattery()) {
    return 'M -.5,-1.0 L .5,-1.0 L .5,1.0 L -.5,1.0 z M -.3,-1.0 L -.3,-1.25 .3,-1.25 .3,-1.0 z';
  } else if (fridgeIsOffline(fridge)){
    return google.maps.SymbolPath.CIRCLE;
  } else {
    return 'M -.7,1.0 L 0,-1.0 L .7,1.0 z';
  }
}

function fridgeClicked(fridgeId) {
  for (i in markers) {
    if (markers[i].fridge.id == fridgeId) {
      if (currentlyOpenInfoWindow != null) {
        currentlyOpenInfoWindow.close();
      }
      markers[i].infowindow.open(terribleGlobalMap, markers[i]);
      currentlyOpenInfoWindow = markers[i].infowindow;
      updateChart(markers[i].fridge);
    }
  }
}

function updateChart(fridge) {
    statuses = new FridgeStatuses();
    statuses.query = new Parse.Query(FridgeStatus);
    statuses.query.equalTo("fridge", fridge);
    statuses.query.limit(1000);
    statuses.query.ascending("updatedAt");
    statuses.on('reset', function(){updateTable(statuses)});
    statuses.fetch();
}

function updateTable(statuses) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Time');
  data.addColumn('number', 'Battery');
  statuses.each(function(status) {
    if (status.get("fridge")) {
      data.addRow([Parse._parseDate(status.updatedAt),
                   status.battery()]);
    }
  });
 
  // Show graph
  drawChart(data);
  //drawTable(data);
}

// Draw chart
function drawChart(data) {
 var chart = {
    "containerId": "fridgeChart",
    "dataTable": data,
    "refreshInterval": 0,
    "chartType": "LineChart",
    "options": {
      "title": "History",
      "alternatingRowStyle": true,
      "showRowNumber" : true,
    }
  };
  google.visualization.drawChart(chart);
}

// Draw table
function drawTable(data) {
 var table = {
    "containerId": "fridgeTable",
    "dataTable": data,
    "refreshInterval": 0,
    "chartType": "Table",
    "options": {
      "title": "History",
      "alternatingRowStyle": true,
      "showRowNumber" : true,
    }
  };
  google.visualization.drawChart(table);
}
