(function() {
  /**
  Parts modeled after Nodejitsu's jitsu
  */
  var color, eyes, utils, winston, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  color = require('colors');
  _ = require("underscore");
  eyes = require('eyes');
  winston = require('winston');
  utils = require('./utils');
  /**
  Encapsulates the primary functionality for this module.
  */
  exports.ScottyApp = (function() {
    ScottyApp.prototype.started = false;
    ScottyApp.prototype.prompt = require('prompt');
    ScottyApp.prototype.commands = {
      help: new (require('./command_help').CommandHelp)()
    };
    function ScottyApp() {
      this.prompt.properties = require('./prompt_properties').properties;
      this.prompt.override = require('optimist').argv;
    }
    ScottyApp.prototype.start = function(argv, cb) {
      this.command = argv._;
      /* 
      Special -v command for showing current version without winston formatting
      */
      if (argv.version || argv.v) {
        console.log('using scotty v' + this.version);
        process.exit(0);
      }
      this.prompt.start().pause();
      this.command[0] || (this.command[0] = 'help');
      return utils.checkVersion(__bind(function(err) {
        if (err != null) {
          return cb(err);
        }
        return this.commands['help'].show(null, __bind(function() {}, this));
      }, this));
    };
    return ScottyApp;
  })();
}).call(this);
