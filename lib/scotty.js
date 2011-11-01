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
      this.client.baseUrl = "http://192.168.1.101:3000";
      this.client.key = "4e36836cc2db1951a1000002";
      this.client.secret = "2d61f8d3d660357bdbcb5dd42d91835fb2987dd16e8b5d18453c56699db782bf";
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
  /*
          @command = argv._;    
          # Default to the `help` command.
          @command[0] = @command[0] || 'help'
          args = if @command.length > 1 then @command.slice(1) else []
  
          resource = @command[0]
          action = null
  
          if @loader.isResource(@command[0])
            #winston.info " IS A RESOURCE"
            if @command.length > 1 && @loader.isActionForResource(@command[0],@command[1])
              action = @command[1]
              args = if @command.length > 2 then @command.slice(2) else []
              
            else
              action = @loader.defaultActionForResource(@command[0])
          else
            # first parameter is an action.
            resource = @loader.resourceforAction(@command[0])
            action = @command[0]
            
          #winston.info "RESOURCE #{resource} ACTION #{action}"
          # At this point we need to have 
          if resource == null || action == null
            winston.error "Command not found. Try " + "scotty help".cyan.bold
            return
  
          @loader.getActionFn resource,action, (err,actionFn) =>
            if err
              winston.error "Command not found. Try " + "scotty help".cyan.bold
            else
              actionFn args,=>
                #winston.info ""
  
  */
}).call(this);
