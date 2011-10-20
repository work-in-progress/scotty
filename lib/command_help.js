(function() {
  var colors, winston;
  colors = require('colors');
  winston = require('winston');
  exports.CommandHelp = (function() {
    function CommandHelp() {}
    CommandHelp.prototype.actions = ['show', 'delete', 'list'];
    CommandHelp.prototype.usage = {
      'default': ['blahblah'],
      'show': []
    };
    CommandHelp.prototype.show = function(action, cb) {
      var l, _i, _len, _ref;
      winston.help('');
      _ref = this.usage['default'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        winston.help(l);
      }
      winston.help('');
      return cb(null);
    };
    return CommandHelp;
  })();
}).call(this);
