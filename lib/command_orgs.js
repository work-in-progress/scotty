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
    Commands.prototype.resource = 'orgs';
    Commands.prototype.defaultAction = 'list';
    Commands.prototype.actions = ['create', 'delete', 'list'];
    Commands.prototype.usage = {
      'create': ['Usage:'.cyan.bold.underline, '', '  scotty orgs create', '  scotty orgs create <organization name>', '', 'Creates a new organization for the logged in user.', 'An organization name must be unique within the namespace of scottyapp.com', 'and it must not conflict with a user name.'],
      'delete': [],
      'list': ['Usage:'.cyan.bold.underline, '', '  scotty orgs list', '  scotty orgs list <user name>', '', 'Lists all organizations for the specified user, or if none is specified', 'then all organizations belonging to the logged in user.']
    };
    Commands.prototype.create = function(args, cb) {
      var organizationName;
      organizationName = args[1];
      puts(organizationName);
      return this.client.createOrganization(organizationName, {}, __bind(function(err, result) {
        if (err) {
          winston.error("Login failed");
          return cb(err);
        } else {
          winston.info("Successfully ".cyan + ("created organization " + result.name));
          return cb(null);
        }
      }, this));
    };
    Commands.prototype["delete"] = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.list = function(args, cb) {
      var userName;
      userName = args[1] || this.config.getUserName();
      return this.client.organizationsForUser(userName, __bind(function(err, result) {
        var org, _i, _len, _ref;
        if (err) {
          winston.error("Login failed");
          return cb(err);
        } else {
          winston.info(("" + result.total_count).cyan + " organizations for user " + ("" + userName).cyan);
          _ref = result.collection;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            org = _ref[_i];
            winston.info("" + org.name);
          }
          return cb(null);
        }
      }, this));
    };
    return Commands;
  })();
}).call(this);
