(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {
      this.list = __bind(this.list, this);
      this["delete"] = __bind(this["delete"], this);
      this.create = __bind(this.create, this);
    }
    Commands.prototype.resource = 'apps';
    Commands.prototype.defaultAction = 'list';
    Commands.prototype.actions = ['create', 'delete', 'list'];
    Commands.prototype.usage = {
      'create': ['Usage:'.cyan.bold.underline, '', '  scotty apps create', '  scotty apps create <app name>', '  scotty apps create <organization name> <app name>', '', 'Creates a new app that belongs to the user\'s default organization', 'or the organization specified.'],
      'delete': ['Usage:'.cyan.bold.underline, '', '  scotty apps delete', '  scotty apps delete <app name>', '  scotty apps delete <organization name> <app name>', '', 'Deletes an app that belongs to the current user or the organization'],
      'list': ['Usage:'.cyan.bold.underline, '', '  scotty apps list', '  scotty apps list <organization name>', '', 'Lists all apps for the specified organization, or if none is specified', 'then the default organization belonging to the logged in user.', 'Apps are always grouped by organization, and each user gets a default', 'organization named after his user id uppon account creation.']
    };
    Commands.prototype.create = function(argumentResolver, cb) {
      var appName, organizationName;
      appName = argumentResolver.params[0];
      organizationName = this.config.getUserName();
      if (argumentResolver.params.length > 1) {
        organizationName = argumentResolver.params[0];
        appName = argumentResolver.params[1];
      }
      return this.client.createApp(organizationName, appName, "", false, __bind(function(err, result) {
        if (err) {
          winston.error("Could not create app " + err);
          return cb(err);
        } else {
          winston.info("App created");
          return cb(null);
        }
      }, this));
    };
    Commands.prototype["delete"] = function(argumentResolver, cb) {
      var appName, organizationName;
      appName = argumentResolver.params[0];
      organizationName = this.config.getUserName();
      if (argumentResolver.params.length > 1) {
        organizationName = argumentResolver.params[0];
        appName = argumentResolver.params[1];
      }
      return this.client.deleteApp(organizationName, appName, __bind(function(err, result) {
        if (err) {
          winston.error("Could not delete app " + err);
          return cb(err);
        } else {
          winston.info("Successfully ".cyan + ("deleted app " + organizationName + "/" + appName));
          return cb(null);
        }
      }, this));
    };
    Commands.prototype.list = function(argumentResolver, cb) {
      var organizationName;
      organizationName = argumentResolver.params[0] || this.config.getUserName();
      return this.client.appsForOrganization(organizationName, __bind(function(err, result) {
        var app, _i, _len, _ref, _results;
        if (err) {
          winston.error("Login failed");
          return cb(err);
        } else {
          winston.info(("" + result.total_count).cyan + " apps for organization " + ("" + organizationName).cyan);
          _ref = result.collection;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            app = _ref[_i];
            winston.info("" + app.name);
            _results.push(cb(null));
          }
          return _results;
        }
      }, this));
    };
    return Commands;
  })();
}).call(this);
