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
    list: _.template($('#list-template').html())
};

Parse.initialize("XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
                 "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ");

var fridges = new Fridges([
    new Fridge({name: "fridge 1", battery: 100}),
    new Fridge({name: "fridge 2", battery: 100})
]);
var mapView = new MapView({model: fridges});
$('#map-container').append(mapView.render().el);

$('#list-container').append(template.list());



