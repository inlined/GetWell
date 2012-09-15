function smearOnKey(foreignKey) {
  return function(request, response) {
    var smeared = request.object.get(foreignKey);
    Parse._.each(request.object.attributes, function(value, key) {
      if (key !== foreignKey) {
        smeared.set(key, value);
      }
    });
    smeared.save(null, {
      success:function() {
        response.success();
      },
      error:function(object, error) {
        response.error(error);
      }
    });
  };
}
Parse.Cloud.beforeSave("FridgeStatus", smearOnKey("fridge"));
Parse.Cloud.beforeSave("WellStatus", smearOnKey("well"));
