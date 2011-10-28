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
    function ScottyApp() {
      this.client = new ScottyAppClient(this.config.key, this.config.secret);
      this.prompt.properties = require('./prompt_properties').properties;
      this.prompt.override = require('optimist').argv;
    }
    ScottyApp.prototype.start = function(argv, cb) {
      var args;
      this.command = argv._;
      this.loader.load(['./command_help', './command_apps', './command_users'], this.prompt, this.config, this.client);
      /* 
      Special -v command for showing current version without winston formatting
      */
      if (argv.version || argv.v) {
        console.log('using scotty v' + this.version);
        process.exit(0);
      }
      this.prompt.start().pause();
      this.command[0] = this.command[0] || 'help';
      args = this.command.length > 1 ? this.command.slice(1) : [];
      return this.config.load(__bind(function(err) {
        this.client.setAccessToken(this.config.getAccessToken());
        if (err != null) {
          return cb(err);
        }
        return utils.checkVersion(__bind(function(err) {
          var action, resource;
          if (err != null) {
            return cb(err);
          }
          resource = this.command[0];
          action = null;
          if (this.loader.isResource(this.command[0])) {
            if (this.command.length > 1 && this.loader.isActionForResource(this.command[0], this.command[1])) {
              action = this.command[1];
              args = this.command.length > 2 ? this.command.slice(2) : [];
            } else {
              action = this.loader.defaultActionForResource(this.command[0]);
            }
          } else {
            resource = this.loader.resourceforAction(this.command[0]);
            action = this.command[0];
          }
          if (resource === null || action === null) {
            winston.error("Command not found. Try " + "scotty help".cyan.bold);
            return;
          }
          return this.loader.getActionFn(resource, action, __bind(function(err, actionFn) {
            if (err) {
              return winston.error("Command not found. Try " + "scotty help".cyan.bold);
            } else {
              return actionFn(args, __bind(function() {}, this));
            }
          }, this));
        }, this));
      }, this));
    };
    return ScottyApp;
  })();
}).call(this);
