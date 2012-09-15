
var FridgeStatus = Parse.Object.extend("FridgeStatus", {
  // Instance methods.

  fridge: function() {
    return this.get("fridge");
  },

  battery: function() {
    return this.get("battery");
  }

}, {
  // Class methods.

});

