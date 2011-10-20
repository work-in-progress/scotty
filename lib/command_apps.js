(function() {
  var colors, winston;
  colors = require('colors');
  winston = require('winston');
  exports.CommandApps = (function() {
    function CommandApps() {}
    CommandApps.prototype.actions = ['create', 'delete', 'list'];
    CommandApps.prototype.usage = {
      'default': [],
      'create': [],
      'delete': [],
      'list': []
    };
    CommandApps.prototype.create = function(cb) {};
    CommandApps.prototype["delete"] = function(cb) {};
    CommandApps.prototype.list = function(cb) {};
    return CommandApps;
  })();
}).call(this);
