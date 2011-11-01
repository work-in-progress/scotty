(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {
      this.show = __bind(this.show, this);
    }
    Commands.prototype.resource = 'help';
    Commands.prototype.defaultAction = 'show';
    Commands.prototype.actions = ['show'];
    Commands.prototype.usage = {
      'show': ['  _|_|_|                        _|      _|              '.yellow.bold, '_|          _|_|_|    _|_|    _|_|_|_|_|_|_|_|  _|    _|'.yellow.bold, '  _|_|    _|        _|    _|    _|      _|      _|    _|'.yellow.bold, '      _|  _|        _|    _|    _|      _|      _|    _|'.yellow.bold, '_|_|_|      _|_|_|    _|_|        _|_|    _|_|    _|_|_|'.yellow.bold, '                                                      _|'.yellow.bold, '                                                  _|_|  '.yellow.bold, '', 'Build and manage your backends.', 'Hosted and fully customizable.', 'https://github.com/scottyapp/scotty', '', 'Usage:'.cyan.bold.underline, '', '  scotty <resource> <action> <param1> <param2> ...', '', 'Common Commands:'.cyan.bold.underline, '', 'To sign up for ScottyApp'.cyan, '  scotty signup', '', 'To log into ScottyApp'.cyan, '  scotty login', '', 'To redeem your beta access key'.cyan, '  scotty redeem', '', 'To create a new app'.cyan, '  scotty create', '', 'To lists all applications for the current user'.cyan, '  scotty list', '', 'To show specific help'.cyan, '  scotty help <resource>', '  scotty help <resource> <action>', '', 'Additional Commands'.cyan.bold.underline, '  scotty help apps', '  scotty help users', '  scotty help orgs', '', 'scotty options'.cyan.bold.underline, '', 'scotty [commands] [options]'.cyan, '', '--version             print scotty version and exit'],
      'show': []
    };
    Commands.prototype.show = function(argumentResolver, cb) {
      var resource, usage, _i, _len, _ref, _results;
      usage = argumentResolver.action;
      if (argumentResolver.isAmbiguous) {
        winston.help("Command " + usage + " is ambiguous. Please specify one of the following:");
        _ref = argumentResolver.ambiguousResources;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          resource = _ref[_i];
          _results.push(winston.help("scotty help " + resource.cyan + " " + usage));
        }
        return _results;
      } else if (argumentResolver.resource && !argumentResolver.action) {
        return this.loader.getResourceUsage(argumentResolver.resource, __bind(function(err, usageResult) {
          var l, _j, _len2;
          if (err) {
            winston.help("Command " + usage + " not found. Try scotty help.");
            return cb(err);
          } else {
            winston.help('');
            for (_j = 0, _len2 = usageResult.length; _j < _len2; _j++) {
              l = usageResult[_j];
              winston.help(l);
            }
            winston.help('');
            return cb(null);
          }
        }, this));
      } else {
        if (!usage) {
          usage = 'help';
        }
        return this.loader.getActionUsage(usage, __bind(function(err, usageResult) {
          var l, _j, _len2;
          if (err) {
            winston.help("Command " + usage + " not found. Try scotty help.");
            return cb(err);
          } else {
            winston.help('');
            for (_j = 0, _len2 = usageResult.length; _j < _len2; _j++) {
              l = usageResult[_j];
              winston.help(l);
            }
            winston.help('');
            return cb(null);
          }
        }, this));
      }
    };
    return Commands;
  })();
}).call(this);
