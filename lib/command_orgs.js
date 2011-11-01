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
      'create': ['Usage:'.cyan.bold.underline, '', '  scotty orgs create <organization name>', '', 'Creates a new organization for the logged in user.', 'An organization name must be unique within the namespace of scottyapp.com', 'and it must not conflict with a user name.'],
      'delete': ['Usage:'.cyan.bold.underline, '', '  scotty orgs delete <organization name>', ''],
      'list': ['Usage:'.cyan.bold.underline, '', '  scotty orgs list <user name>', '', 'Lists all organizations for the specified user, or if none is specified', 'then all organizations belonging to the logged in user.']
    };
    Commands.prototype.create = function(argumentResolver, cb) {
      var organizationName;
      organizationName = argumentResolver.params[0];
      return this.client.createOrganization(organizationName, {}, __bind(function(err, result) {
        if (err) {
          winston.error("Could not create organization " + err);
          return cb(err);
        } else {
          winston.info("Successfully ".cyan + ("created organization " + result.name));
          return cb(null);
        }
      }, this));
    };
    Commands.prototype["delete"] = function(argumentResolver, cb) {
      var organizationName;
      organizationName = argumentResolver.params[0];
      return this.client.deleteOrganization(organizationName, __bind(function(err, result) {
        if (err) {
          winston.error("Could not delete organization " + err);
          return cb(err);
        } else {
          winston.info("Successfully ".cyan + ("deleted organization " + organizationName));
          return cb(null);
        }
      }, this));
    };
    Commands.prototype.list = function(argumentResolver, cb) {
      var userName;
      userName = argumentResolver.params[0] || this.config.getUserName();
      return this.client.organizationsForUser(userName, __bind(function(err, result) {
        var org, _i, _len, _ref;
        if (err) {
          winston.error("Could not access organizations. " + err);
          return cb(err);
        } else {
          winston.info(("" + result.total_count).cyan + " organizations for user " + ("" + userName).cyan);
          _ref = result.collection;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            org = _ref[_i];
            winston.info("" + org.slug);
          }
          return cb(null);
        }
      }, this));
    };
    return Commands;
  })();
}).call(this);
