
var Fridge = Parse.Object.extend("Fridge", {
  // Instance methods.

  name: function() {
    return this.get("name");
  },

  battery: function() {
    return this.get("battery");
  },

  location: function() {
    return this.get("location");
  },

  usingBattery: function() {
    return this.get("usingBattery");
  },

  updated: function() {
    return Parse._parseDate(this.updatedAt);
  }

}, {
  // Class methods.

  getById: function(id, options) {
    var query = new Parse.Query(Fridge);
    query.get(id, options);
  }

});

var Fridges = Parse.Collection.extend({
  model: Fridge
});

