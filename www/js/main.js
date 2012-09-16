// Configure underscore.js templates
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g, // {{ verbatim }}
    escape:      /\{\%(.+?)\%\}/g, // {% escaped  %}
    evaluate:    /\[\[(.+?)\]\]/g, // [[ evaluate ]]
    variable:    'data'
};

// Templates.
var template = {
    map: _.template($('#map-template').html()),
    list: _.template($('#list-template').html()),
    offlineItem: _.template($('#offline-item-template').html()),
    batteryItem: _.template($('#battery-item-template').html()),
    okayItem: _.template($('#okay-item-template').html()),
};

Parse.initialize("XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
                 "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ");

var fridges = new Fridges();

var mapView = new MapView({model: fridges});
$('#map-container').append(mapView.render().el);

var listView = new ListView({model: fridges});
$('#list-container').append(listView.render().el);

var healthView = new HealthView({model: fridges});
healthView.render();

var fetchFridges = function (f, t) {
    fridges.fetch();
    _.delay(f, t, f, t);
}

fetchFridges(fetchFridges, 5000);