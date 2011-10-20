(function() {
  /**
  Parts modeled after Nodejitsu's jitsu
  */
  var ScottyApp, color, eyes, scotty, winston, _;
  ScottyApp = require('./scotty').ScottyApp;
  color = require('colors');
  _ = require("underscore");
  eyes = require('eyes');
  winston = require('winston');
  scotty = module.exports = new ScottyApp();
  require('pkginfo')(module, 'version');
}).call(this);
