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
      'list': []
    };
    Commands.prototype.create = function(args, cb) {
      return cb(null);
    };
    Commands.prototype["delete"] = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.list = function(args, cb) {
      var organizationName;
      organizationName = args[0] || this.config.getUserName();
      return this.client.appsForOrganization(organizationName, __bind(function(err, result) {
        var app, _i, _len, _ref, _results;
        if (err) {
          winston.error("Login failed");
          return cb(err);
        } else {
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
