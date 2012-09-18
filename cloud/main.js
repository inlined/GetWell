Parse.Cloud.useMasterKey(); // required to send pushes
function smearOnKey(className) {
  var Klass = Parse.Object.extend(className);
  var foreignKey = className.toLowerCase();
  return function(request, response) {
    var smeared = request.object.get(foreignKey);
    if (!smeared) {
      response.success();
      return;
    }

    Parse._.each(request.object.attributes, function(value, key) {
      if (key !== foreignKey) {
        smeared.set(key, value);
      }
    });
    var saveSmeared = function() {
      smeared.save(null, {
        success:function() {
          response.success();
        },
        error:function(object, error) {
          response.error(error);
        }
      });
    };

    // TODO(thomas): set up using generic alerts
    if (smeared.get("usingBattery")) {
      var query = new Parse.Query(Klass);
      query.equalTo("objectId", smeared.id);
      query.notEqualTo("usingBattery", true);
      query.find({
        success: function(results) {
          if (!results.length) { // already off battery
            saveSmeared();
            return;
          }
          Parse.Push.send({
            channels: [className + "_" + results[0].id],
            data: {
               alert: className + " " + results[0].get("name") + " is using battery" 
            }
          }, {
            success: function() { saveSmeared(); },
            error: function(error) { response.error("Failed to send push: " + error.message); }
          });
        },
        error: function(error) {
          response.error("Failed to look up current state: " + error.message);
        }
      });
    } else {
      saveSmeared();
    }
  };
}

Parse.Cloud.beforeSave("FridgeStatus", smearOnKey("Fridge"));
Parse.Cloud.beforeSave("WellStatus", smearOnKey("Well"));
