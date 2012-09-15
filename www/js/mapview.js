var MapView = Parse.View.extend({

    initialize: function(options) {
        options.model.on('change', this.fridgesChanged, this);
    },

    render: function() {
        this.$el.toggleClass("map");
        this.$el.html(template.map());
        initializeMap(this.$('#map')[0]);
        return this;
    },

    fridgesChanged: function() {
        this.render();
    },
});
