(function() {
  var Config, nconf, path;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  nconf = require('nconf');
  path = require('path');
  Config = (function() {
    function Config() {
      this.getAccessToken = __bind(this.getAccessToken, this);
      this.setAccessToken = __bind(this.setAccessToken, this);      nconf.argv = nconf.env = true;
      nconf.add('file', {
        file: '.scottyconf.json'
      });
    }
    Config.prototype.load = function(cb) {
      return nconf.load(__bind(function(err) {
        err = null;
        return cb(err);
      }, this));
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
    return Config;
  })();
  module.exports = new Config();
}).call(this);
