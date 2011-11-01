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
      'create': [],
      'delete': [],
      'list': ['Usage:'.cyan.bold.underline, '', '  scotty apps list', '  scotty apps list <organization name>', '', 'Lists all apps for the specified organization, or if none is specified', 'then the default organization belonging to the logged in user.', 'Apps are always grouped by organization, and each user gets a default', 'organization named after his user id uppon account creation.']
    };
    Commands.prototype.create = function(argumentResolver, cb) {
      return cb(null);
    };
    Commands.prototype["delete"] = function(argumentResolver, cb) {
      return cb(null);
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
