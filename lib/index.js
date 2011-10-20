(function() {
  var color, _;
  color = require('colors');
  _ = require("underscore");
  require('pkginfo')(module, 'version');
  /**
  Encapsulates the primary functionality for this module.
  */
  exports.ScottyApp = (function() {
    /**
    Initializes a new instance of the @see ScottyApp class.
    */    function ScottyApp(opts) {
      if (opts == null) {
        opts = {};
      }
    }
    ScottyApp.prototype.start = function() {
      return console.log("ScottyApp");
    };
    return ScottyApp;
  })();
}).call(this);
