
//
// Setup stuff.
//
localStorage = require('localStorage');
XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Parse = require('../www/js/parse-1.0.24').Parse;

Parse.initialize("XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
                 "6Nk7jtlwTcXHJc07DDHht2VxPfVsr6UGF1v38axQ");

var tomsFridgeId = "baQc56FC1r";

//
// Checking for offline objects.
//

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
    channels: [ className + "_" + object.id ],
    data: {
      alert: object.get('name') + " is offline."
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

var sendPushes = function(objects) {
  Parse._.each(objects, function(object) {
    sendPush(object);
  });
};

var pushToDropped = function(className, timeElapsed) {
  checkForDropped(className, timeElapsed, {
    success: function(objects) {
      console.log(objects);
      sendPushes(objects, className);
    },
    error: function(error) {
      console.error(error);
    }
  });
};

//
// Heartbeat ping.
//

var pingAll = function(className) {
  console.warn("Pinging all " + className);
  var query = new Parse.Query(className);
  query.limit(1000);
  query.find({
    success: function(results) {
      Parse._.each(results, function(object) {
        if (object.id !== tomsFridgeId) {
        object.save(null, {
          success: function(object) {
            // Do nothing on success.
          },
          error: function(object, error) {
            console.error("Failed to update instance of " + className);
          }
        });
        }
      });
    },
    error: function() {
      console.error("Failed to get instances of " + className);
    }
  });
};

//
// Cron.
//

var cron = function() {
  pingAll("Fridge");
  pushToDropped("Fridge", 180000);
  setTimeout(function() {
    cron();
  }, 60000);
};

cron();

