var HealthView = Parse.View.extend({

    initialize: function(options) {
        options.model.on('reset', this.fridgesChanged, this);
    },

    render: function() {
        badFridges = this.model.filter(this.fridgeIsBad);
        if (badFridges.length == 0) {
            $('#actual-health').html('Great').removeClass('soso').addClass('good');
        } else {
            $('#actual-health').html('Warnings').removeClass('good').addClass('soso');
        }
    },

    fridgesChanged: function() {
        this.render();
    },

    fridgeIsBad: function(fridge) {
        fourMinAgo = moment().subtract('minutes', 4);
        if (fourMinAgo.diff(moment(fridge.updated())) >= 0) {
            return true;
        }
        return fridge.usingBattery();
    },

});