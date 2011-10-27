(function() {
  var colors, winston;
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {}
    Commands.prototype.actions = ['show'];
    Commands.prototype.usage = {
      'default': ['  _|_|_|                        _|      _|              '.yellow.bold, '_|          _|_|_|    _|_|    _|_|_|_|_|_|_|_|  _|    _|'.yellow.bold, '  _|_|    _|        _|    _|    _|      _|      _|    _|'.yellow.bold, '      _|  _|        _|    _|    _|      _|      _|    _|'.yellow.bold, '_|_|_|      _|_|_|    _|_|        _|_|    _|_|    _|_|_|'.yellow.bold, '                                                      _|'.yellow.bold, '                                                  _|_|  '.yellow.bold, '', 'Build and manage your backends.', 'Hosted and fully customizable.', 'https://github.com/scottyapp/scotty', '', 'Usage:'.cyan.bold.underline, '', '  scotty <resource> <action> <param1> <param2> ...', '', 'Common Commands:'.cyan.bold.underline, '', 'To sign up for ScottyApp'.cyan, '  scotty signup', '', 'To log into ScottyApp'.cyan, '  scotty login', '', 'To redeem your beta access key'.cyan, '  scotty redeem', '', 'To create a new app'.cyan, '  scotty create', '', 'To lists all applications for the current user'.cyan, '  scotty list', '', 'To show specific help'.cyan, '  scotty help resource', '  scotty help resource action', '', 'Additional Commands'.cyan.bold.underline, '  scotty apps', '  scotty users', '', 'scotty options'.cyan.bold.underline, '', 'scotty [commands] [options]'.cyan, '', '--version             print scotty version and exit'],
      'show': []
    };
    Commands.prototype.show = function(action, cb) {
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
    return Commands;
  })();
}).call(this);
