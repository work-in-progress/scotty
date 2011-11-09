(function() {
  /**
  Parts modeled after Nodejitsu's jitsu
  */
  var ArgumentResolver, ScottyAppClient, color, eyes, utils, winston, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  color = require('colors');
  _ = require("underscore");
  eyes = require('eyes');
  winston = require('winston');
  utils = require('./utils');
  ScottyAppClient = require('scottyapp-api-client').Client;
  ArgumentResolver = require('./argument_resolver').ArgumentResolver;
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
      /* 
      Special -v command for showing current version without winston formatting
      */      if (argv.version || argv.v) {
        console.log('using scotty v' + this.version);
        process.exit(0);
      }
      this.prompt.start().pause();
      return this.config.load(__bind(function(err) {
        if (err != null) {
          return cb(err);
        }
        this.client.setAccessToken(this.config.getAccessToken());
        return utils.checkVersion(__bind(function(err) {
          var action, argumentResolver, resource;
          if (err != null) {
            return cb(err);
          }
          this.loader.load(this.config.commandsForPath(), this.prompt, this.config, this.client);
          argumentResolver = new ArgumentResolver(argv._, this.loader);
          resource = argumentResolver.resource;
          action = argumentResolver.action;
          if (argumentResolver.isHelp) {
            resource = "help";
            action = "show";
          }
          if (argumentResolver.isValid) {
            return this.loader.getActionFn(resource, action, __bind(function(err, actionFn) {
              if (err) {
                return winston.error("Command not found. Try " + "scotty help".cyan.bold);
              } else {
                return actionFn(argumentResolver, __bind(function() {}, this));
              }
            }, this));
          } else {
            return winston.error("Command not found. Try " + "scotty help".cyan.bold);
          }
        }, this));
      }, this));
    };
    return ScottyApp;
  })();
}).call(this);
