var MapView = Parse.View.extend({

    map: null,

    initialize: function(options) {
        options.model.on('reset', this.fridgesChanged, this);
    },

    render: function() {
        this.$el.toggleClass("map");
        this.$el.html(template.map());
        this.map = initializeMap(this.$('#map')[0], this.model);
        return this;
    },

    fridgesChanged: function() {
        reloadMarkers(this.map, this.model);
    },
});
