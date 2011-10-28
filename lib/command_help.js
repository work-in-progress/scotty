(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {
      this.help = __bind(this.help, this);
    }
    Commands.prototype.actions = ['help'];
    Commands.prototype.usage = {
      'help': ['  _|_|_|                        _|      _|              '.yellow.bold, '_|          _|_|_|    _|_|    _|_|_|_|_|_|_|_|  _|    _|'.yellow.bold, '  _|_|    _|        _|    _|    _|      _|      _|    _|'.yellow.bold, '      _|  _|        _|    _|    _|      _|      _|    _|'.yellow.bold, '_|_|_|      _|_|_|    _|_|        _|_|    _|_|    _|_|_|'.yellow.bold, '                                                      _|'.yellow.bold, '                                                  _|_|  '.yellow.bold, '', 'Build and manage your backends.', 'Hosted and fully customizable.', 'https://github.com/scottyapp/scotty', '', 'Usage:'.cyan.bold.underline, '', '  scotty <resource> <action> <param1> <param2> ...', '', 'Common Commands:'.cyan.bold.underline, '', 'To sign up for ScottyApp'.cyan, '  scotty signup', '', 'To log into ScottyApp'.cyan, '  scotty login', '', 'To redeem your beta access key'.cyan, '  scotty redeem', '', 'To create a new app'.cyan, '  scotty create', '', 'To lists all applications for the current user'.cyan, '  scotty list', '', 'To show specific help'.cyan, '  scotty help <resource>', '  scotty help <resource> <action>', '', 'Additional Commands'.cyan.bold.underline, '  scotty apps', '  scotty users', '', 'scotty options'.cyan.bold.underline, '', 'scotty [commands] [options]'.cyan, '', '--version             print scotty version and exit'],
      'show': []
    };
    Commands.prototype.help = function(args, cb) {
      var usage;
      usage = 'help';
      if (args.length > 0 && this.loader.hasAction(args[0])) {
        usage = args[0];
      }
      return this.loader.getActionUsage(usage, __bind(function(err, usageResult) {
        var l, _i, _len;
        if (err) {
          winston.help("Command " + usage + " not found. Try scotty help.");
          return cb(err);
        } else {
          for (_i = 0, _len = usageResult.length; _i < _len; _i++) {
            l = usageResult[_i];
            winston.help(l);
          }
          winston.help('');
          return cb(null);
        }
      }, this));
    };
    return Commands;
  })();
}).call(this);
