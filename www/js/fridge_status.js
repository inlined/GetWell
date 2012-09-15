
var FridgeStatus = Parse.Object.extend("FridgeStatus", {
  // Instance methods.

  fridge: function() {
    return this.get("fridge");
  },

  battery: function() {
    return this.get("battery");
  },

  name: function() {
    return this.get("fridge").get("name");
  }

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
  model: FridgeStatus,
  query: (new Parse.Query(FridgeStatus)).include("fridge")
});

