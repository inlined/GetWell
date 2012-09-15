// Configure underscore.js templates
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g, // {{ verbatim }}
    escape:      /\{\%(.+?)\%\}/g, // {% escaped  %}
    evaluate:    /\[\[(.+?)\]\]/g, // [[ evaluate ]]
    variable:    'data'
};

// Templates.
var template = {
    example: _.template($('#example-template').html()),
    map: _.template($('#map-template').html())
};

$('#container').append(template.example({
        items: [{name:'Item 1'},
                {name:'Item 2'}]
    }));

Parse.initialize("XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
                 "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ");

$('#container').append(template.map());
initializeMap($('#map')[0]);
