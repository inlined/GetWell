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

    // feature in development:
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
          Parse.Cloud.request({
            url: "https://api.parse.com/1/push",
            method: "POST",
            body: JSON.stringify({
              _ApplicationId: "XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
              _JavaScriptKey: "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ", 
              channels: [results[0].id],
              data: {
                 alert: className + " " + results[0].get("name") + " is using battery" 
              }
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }, function(externalResponse) {
            // Push is a best effort; don't hold up committing data
            saveSmeared();
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
