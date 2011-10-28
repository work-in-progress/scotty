(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.CommandLoader = (function() {
    function CommandLoader() {
      this.getActionUsage = __bind(this.getActionUsage, this);
      this.getActionFn = __bind(this.getActionFn, this);
      this.hasAction = __bind(this.hasAction, this);
      this.load = __bind(this.load, this);
      this.addCommand = __bind(this.addCommand, this);
    }
    CommandLoader.prototype.resourceNames = {};
    CommandLoader.prototype.addCommand = function(cmd, action, name) {
      return this.commands[name] = {
        resource: cmd,
        action: action,
        usage: cmd.usage[action] || []
      };
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
            this.addCommand(cmd, action, "" + cmd.resource + "-" + action);
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
    CommandLoader.prototype.getActionFn = function(actionName, cb) {
      var action;
      action = this.commands[actionName];
      if (!action) {
        return cb(new Error("Action " + actionName + " not found."));
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
