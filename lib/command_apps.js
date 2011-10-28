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
      return cb(null);
    };
    return Commands;
  })();
}).call(this);
