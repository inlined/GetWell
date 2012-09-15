<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgH22cSr2NBTDs1lIlKR8RQsTX_qimclU&sensor=false">
    </script>
    <script type="text/javascript">
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

      function initialize() {
        var styledMap = new google.maps.StyledMapType(styles, {name: "Africa"});
        var mapOptions = {
          center: africa,
          zoom: 4,
          mapTypeId: 'map_style'
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
        //setHealthMarkers(map, fridges);
        setBatteryBars(map, fridges);
      }

      function setBatteryBars(map, fridges) {
        var batteryBar = {
          path: 'M -35,-35 L 35,-35 L 35,35 z',
          fillColor: "yellow",
          fillOpacity: 0.8,
          scale: 1,
          strokeColor: "gold",
          strokeWeight: 14
        };
        for (var fridgeIdx in fridges) {
          // Construct the bars for each value in fridges.
          var fridge = fridges[fridgeIdx];
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(fridge.location.latitude, fridge.location.longitude),
            icon: batteryBar,
            map: map
          });
        }
      }

      function setHealthMarkers(map, locations) {
        // Add markers to the map

        // Marker sizes are expressed as a Size of X,Y
        // where the origin of the image (0,0) is located
        // in the top left of the image.

        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        var image = new google.maps.MarkerImage('images/beachflag.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            new google.maps.Size(20, 32),
            // The origin for this image is 0,0.
            new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            new google.maps.Point(0, 32));
        var shadow = new google.maps.MarkerImage('images/beachflag_shadow.png',
            // The shadow image is larger in the horizontal dimension
            // while the position and offset are the same as for the main image.
            new google.maps.Size(37, 32),
            new google.maps.Point(0,0),
            new google.maps.Point(0, 32));
        // Shapes define the clickable region of the icon.
        // The type defines an HTML <area> element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
          coord: [1, 1, 1, 20, 18, 20, 18 , 1],
          type: 'poly'
        };
        for (var i = 0; i < locations.length; i++) {
          var beach = locations[i];
          var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            shadow: shadow,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3]
            });
        }
      }
    </script>
  </head>
  <body onload="initialize()">
    <div id="map_canvas" style="width:100%; height:100%"></div>
  </body>
</html>
