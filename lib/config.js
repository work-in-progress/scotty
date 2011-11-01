(function() {
  var Config, nconf, path, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  nconf = require('nconf');
  path = require('path');
  _ = require("underscore");
  Config = (function() {
    function Config() {
      this.set = __bind(this.set, this);
      this.setUserName = __bind(this.setUserName, this);
      this.getUserName = __bind(this.getUserName, this);
      this.getAccessToken = __bind(this.getAccessToken, this);
      this.setAccessToken = __bind(this.setAccessToken, this);
      this.commandsForPath = __bind(this.commandsForPath, this);      nconf.argv = nconf.env = true;
      nconf.add('file', {
        file: process.env.HOME + '/.scottyconf.json'
      });
    }
    Config.prototype.load = function(cb) {
      return nconf.load(__bind(function(err) {
        err = null;
        return cb(err);
      }, this));
    };
    /**
    List of command files used by scotty. This is the canonical place for it.
    */
    Config.prototype.commands = ['command_help', 'command_apps', 'command_users', 'command_orgs'];
    /**
      Returns a list of commands, with the path adjused 
      based on the prefix path, which defaults to ./
    */
    Config.prototype.commandsForPath = function(path) {
      if (path == null) {
        path = "./";
      }
      return _.map(this.commands, function(item) {
        return "" + path + item;
      });
    };
    /**
    Those are the official keys for the scotty app. 
    DO NOT USE THEM IN YOUR OWN APPS, generate your own at 
    http://scottyapp.com/developers/api-keys
    */
    Config.prototype.key = "4ea27b3dbab23e0001000002";
    Config.prototype.secret = "12eba4683b5c1b014b114463afed70f036dbeea6951b092346b6b58ddfff524f";
    Config.prototype.setAccessToken = function(token, cb) {
      nconf.set("accessToken", token);
      return nconf.save(cb);
    };
    Config.prototype.getAccessToken = function() {
      return nconf.get("accessToken");
    };
    Config.prototype.getUserName = function() {
      return nconf.get("userName");
    };
    Config.prototype.setUserName = function(userName, cb) {
      nconf.set("userName", userName);
      return nconf.save(cb);
    };
    Config.prototype.set = function(token, userName, cb) {
      nconf.set("accessToken", token);
      nconf.set("userName", userName);
      return nconf.save(cb);
    };
    return Config;
  })();
  module.exports = new Config();
}).call(this);
