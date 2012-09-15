
var Fridge = Parse.Object.extend("Fridge", {
  // Instance methods.

  name: function() {
    return this.get("name");
  },

  battery: function() {
    return this.get("battery");
  },

}, {
  // Class methods.

});

