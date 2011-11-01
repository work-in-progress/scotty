(function() {
  var colors, winston, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  _ = require("underscore");
  /**
  Loads the commands and makes them available. Is a bit of a mess right now, 
  needs some love and improvement.
  */
  exports.CommandLoader = (function() {
    function CommandLoader() {
      this.getActionUsage = __bind(this.getActionUsage, this);
      this.getActionFn = __bind(this.getActionFn, this);
      this.hasAction = __bind(this.hasAction, this);
      this.load = __bind(this.load, this);
      this.nameFrom = __bind(this.nameFrom, this);
      this.isActionForResource = __bind(this.isActionForResource, this);
      this.defaultActionForResource = __bind(this.defaultActionForResource, this);
      this.ambiguousResourcesForAction = __bind(this.ambiguousResourcesForAction, this);
      this.isAmbiguousAction = __bind(this.isAmbiguousAction, this);
      this.resourceforAction = __bind(this.resourceforAction, this);
      this.isResource = __bind(this.isResource, this);
      this.addCommand = __bind(this.addCommand, this);
    }
    CommandLoader.prototype.resourceNames = {};
    CommandLoader.prototype.commands = {};
    CommandLoader.prototype.addCommand = function(cmd, action, name) {
      return this.commands[name] = {
        resource: cmd,
        resourceName: cmd.resource,
        action: action,
        usage: cmd.usage[action] || []
      };
    };
    CommandLoader.prototype.isResource = function(name) {
      return !!this.resourceNames[name];
    };
    CommandLoader.prototype.resourceforAction = function(actionName) {
      var res;
      res = this.commands[actionName];
      if (res === "DONOTCALL") {
        return null;
      }
      if (!res) {
        return null;
      }
      return res.resourceName;
    };
    CommandLoader.prototype.isAmbiguousAction = function(actionName) {
      return this.commands[actionName] === "DONOTCALL";
    };
    CommandLoader.prototype.ambiguousResourcesForAction = function(actionName) {
      return _.select(this.resourceNames, __bind(function(resource) {
        return this.isActionForResource(resource, actionName);
      }, this));
    };
    CommandLoader.prototype.defaultActionForResource = function(resourceName) {
      if (this.commands[resourceName]) {
        return this.commands[resourceName].action;
      } else {
        return null;
      }
    };
    /**
    Returns true if the specified action exists for the resource.
    */
    CommandLoader.prototype.isActionForResource = function(resourceName, actionName) {
      return !!this.commands[this.nameFrom(resourceName, actionName)];
    };
    CommandLoader.prototype.nameFrom = function(resourceName, actionName) {
      return "" + resourceName + "-" + actionName;
    };
    CommandLoader.prototype.load = function(commandsToRequire, prompt, config, client) {
      var action, cmd, req, _i, _len, _ref, _results;
      this.commands = {};
      _ref = commandsToRequire || [];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        req = _ref[_i];
        cmd = new (require(req).Commands)();
        cmd.prompt = prompt;
        cmd.config = config;
        cmd.client = client;
        cmd.loader = this;
        this.resourceNames[cmd.resource] = cmd.resource;
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = cmd.actions;
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            action = _ref2[_j];
            this.addCommand(cmd, action, this.nameFrom(cmd.resource, action));
            if (this.commands[action]) {
              this.commands[action] = "DONOTCALL";
            } else {
              this.addCommand(cmd, action, "" + action);
            }
            _results2.push(cmd.defaultAction && cmd.defaultAction === action ? this.addCommand(cmd, action, cmd.resource) : void 0);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    CommandLoader.prototype.hasAction = function(actionName) {
      return !!this.commands[actionName];
    };
    CommandLoader.prototype.getActionFn = function(resourceName, actionName, cb) {
      var action;
      action = this.commands[this.nameFrom(resourceName, actionName)];
      if (!action) {
        return cb(new Error("" + resourceName + " " + actionName + " not found."));
      }
      return cb(null, action.resource[actionName]);
    };
    CommandLoader.prototype.getActionUsage = function(actionName, cb) {
      var action;
      action = this.commands[actionName];
      if (!action) {
        return cb(new Error("Action " + actionName + " not found."));
      }
      return cb(null, action.usage);
    };
    return CommandLoader;
  })();
}).call(this);
