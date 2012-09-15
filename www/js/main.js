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

$('#container').append(template.map());
initializeMap($('#map')[0]);
