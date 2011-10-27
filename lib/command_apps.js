(function() {
  var colors, winston;
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {}
    Commands.prototype.actions = ['create', 'delete', 'list'];
    Commands.prototype.usage = {
      'default': [],
      'create': [],
      'delete': [],
      'list': []
    };
    Commands.prototype.create = function(cb) {
      return cb(null);
    };
    Commands.prototype["delete"] = function(cb) {
      return cb(null);
    };
    Commands.prototype.list = function(cb) {
      return cb(null);
    };
    return Commands;
  })();
}).call(this);
