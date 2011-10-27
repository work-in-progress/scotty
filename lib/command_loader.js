(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.CommandLoader = (function() {
    function CommandLoader() {
      this.load = __bind(this.load, this);
    }
    CommandLoader.prototype.load = function(commands) {};
    return CommandLoader;
  })();
}).call(this);
