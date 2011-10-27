(function() {
  /**
  Parts modeled after Nodejitsu's jitsu
  */
  var ScottyAppClient, color, eyes, utils, winston, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  color = require('colors');
  _ = require("underscore");
  eyes = require('eyes');
  winston = require('winston');
  utils = require('./utils');
  ScottyAppClient = require('scottyapp-api-client').Client;
  /**
  Encapsulates the primary functionality for this module.
  */
  exports.ScottyApp = (function() {
    ScottyApp.prototype.started = false;
    ScottyApp.prototype.prompt = require('prompt');
    ScottyApp.prototype.config = require('./config');
    ScottyApp.prototype.loader = new (require('./command_loader').CommandLoader)();
    ScottyApp.prototype.client = null;
    ScottyApp.prototype.commands = {
      help: new (require('./command_help').Commands)(),
      login: new (require('./command_users').Commands)(ScottyApp.prompt, ScottyApp.config)
    };
    function ScottyApp() {
      this.client = new ScottyAppClient(this.config.key, this.config.secret);
      this.prompt.properties = require('./prompt_properties').properties;
      this.prompt.override = require('optimist').argv;
    }
    ScottyApp.prototype.start = function(argv, cb) {
      this.command = argv._;
      this.loader.load(['./command_help', './command_apps', './command_users']);
      this.commands.help.prompt = this.prompt;
      this.commands.help.config = this.config;
      this.commands.login.prompt = this.prompt;
      this.commands.login.config = this.config;
      this.commands.login.client = this.client;
      /* 
      Special -v command for showing current version without winston formatting
      */
      if (argv.version || argv.v) {
        console.log('using scotty v' + this.version);
        process.exit(0);
      }
      this.prompt.start().pause();
      this.command[0] = this.command[0] || 'help';
      return this.config.load(__bind(function(err) {
        if (err != null) {
          return cb(err);
        }
        return utils.checkVersion(__bind(function(err) {
          var func, lib;
          if (err != null) {
            return cb(err);
          }
          lib = this.commands[this.command[0]];
          func = lib[this.command[0]];
          return func(__bind(function() {
            return winston.info("Thank you for using scottyapp");
          }, this));
        }, this));
      }, this));
    };
    return ScottyApp;
  })();
}).call(this);
