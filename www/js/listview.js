var ListView = Parse.View.extend({

    initialize: function(options) {
        options.model.on('reset', this.fridgesChanged, this);
        this.$el.html(template.list());        
    },

    render: function() {
        offlineFridges = this.model.filter(this.fridgeIsOffline);

        batteryFridges = this.model.filter(function(fridge) {
            return !this.fridgeIsOffline(fridge) && fridge.usingBattery();
        }, this);

        batteryFridges = _.sortBy(batteryFridges, function(fridge) {
            return fridge.battery();
        });

        okayFridges = this.model.filter(function(fridge) {
            return !this.fridgeIsOffline(fridge) && !fridge.usingBattery();
        }, this);

        this.$('#offline-tab').html('');
        _.each(offlineFridges, function(fridge) {
            this.$('#offline-tab').append(
                template.offlineItem(this.toTemplateData(fridge)));
        }, this);

        this.$('#battery-tab').html('');
        _.each(batteryFridges, function(fridge) {
            this.$('#battery-tab').append(
                template.batteryItem(this.toTemplateData(fridge)));
        }, this);

        this.$('#okay-tab').html('');
        _.each(okayFridges, function(fridge) {
            this.$('#okay-tab').append(
                template.okayItem(this.toTemplateData(fridge)));
        }, this);

        this.model.each(function(fridge) {
            this.$('#' + fridge.id).click(function() {
                alert(fridge.id);
            });
        });

        this.$('#offline-count').html(offlineFridges.length);
        this.$('#battery-count').html(batteryFridges.length);
        this.$('#okay-count').html(okayFridges.length);
        return this;
    },

    fridgesChanged: function() {
        this.render();
    },

    fridgeIsOffline: function(fridge) {
        fourMinAgo = moment().subtract('minutes', 30);
        return fourMinAgo.diff(moment(fridge.updated())) >= 0;
    },

    toTemplateData: function(fridge) {
        var json = fridge.toJSON();
        json.id = fridge.id
        return json;
    },
});