
localStorage = require('localStorage');
XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Parse = require('../www/js/parse-1.0.24').Parse;

Parse.initialize("XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
                 "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ");

var checkForDropped = function(className, timeElapsed, options) {
  var query = new Parse.Query(className);
  query.limit(1000);
  query.find({
    success: function(results) {
      var dropped = [];
      var now = new Date();
      Parse._.each(results, function(fridge) {
        var updatedAt = Parse._parseDate(fridge.updatedAt);
        var elapsed = now - updatedAt;
        // console.log(elapsed);
        if (elapsed > timeElapsed) {
          dropped.push(fridge);
        }
      });
      options.success(dropped);
    },
    error: function(error) {
      if (options && options.error) {
        options.error(error);
      }
    }
  });
};

checkForDropped("Fridge", 5654775, {
  success: function(results) {
    console.warn(results);
  },
  error: function(error) {
    console.warn(error);
  }
});

