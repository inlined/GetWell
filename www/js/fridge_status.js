
var FridgeStatus = Parse.Object.extend("FridgeStatus", {
  // Instance methods.

  fridge: function() {
    return this.get("fridge");
  },

  battery: function() {
    return this.get("battery");
  },

}, {
  // Class methods.

  getByFridgeId: function(id, options) {
    var fridge = new Fridge();
    fridge.id = id;

    var query = new Parse.Query(FridgeStatus);
    query.equalTo(fridge);
    query.find(options);
  }

});

var FridgeStatuses = Parse.Collection.extend({
  model: FridgeStatus
});

