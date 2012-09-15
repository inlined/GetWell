
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
      Parse._.each(results, function(object) {
        var updatedAt = Parse._parseDate(object.updatedAt);
        var elapsed = now - updatedAt;
        console.log(elapsed);
        if (elapsed > timeElapsed) {
          dropped.push(object);
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

var sendPush = function(object, className) {
  console.log("Trying to send push.");
  Parse._ajax('POST', 'https://api.parse.com/1/push', JSON.stringify({
    _ApplicationId: "XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
    _JavaScriptKey: "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ",
    channels: [ "" ],
    data: {
      alert: "A " + className + " has been dropped."
    }
  }), function(responseText) {
    // success
    console.log('success');
    console.log(responseText);
  }, function(responseText) {
    // error
    console.log('error');
    console.log(responseText);
  });
};

var sendPushes = function(objects, className) {
  Parse._.each(objects, function(object) {
    sendPush(object, className);
  });
};

checkForDropped("Fridge", 2946019, {
  success: function(objects) {
    console.log(objects);
    sendPushes(objects, "Fridge");
  },
  error: function(error) {
    console.error(error);
  }
});

