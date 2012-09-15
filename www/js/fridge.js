
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

  updatedAt: function() {
    return this.get("updatedAt");
  }

}, {
  // Class methods.

  getById: function(id, options) {
    var query = new Parse.Query(Fridge);
    query.get(id, options);
  }

});

