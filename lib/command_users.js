(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    Commands.prototype.actions = ['create', 'login', 'logout', 'changepassword', 'redeem'];
    Commands.prototype.usage = {
      'default': [],
      'create': [],
      'login': [],
      'logout': [],
      'changepassword': [],
      'invitationkey': []
    };
    function Commands(prompt, config) {
      this.prompt = prompt;
      this.config = config;
      this.login = __bind(this.login, this);
    }
    Commands.prototype.create = function(cb) {
      return cb(null);
    };
    Commands.prototype.logout = function(cb) {
      return cb(null);
    };
    Commands.prototype.login = function(cb) {
      return this.prompt.get('username', __bind(function(err, resultA) {
        return this.prompt.get('password', __bind(function(err, resultB) {
          return this.client.authenticate(resultA.username, resultB.password, __bind(function(err, result) {
            if (err) {
              winston.error("Login failed");
              return cb(err);
            } else {
              this.client.setAccessToken(result.access_token);
              return this.config.setAccessToken(result.access_token, __bind(function() {
                winston.info("Logged in successfully");
                return cb(null);
              }, this));
            }
          }, this));
        }, this));
      }, this));
    };
    Commands.prototype.changepassword = function(cb) {
      return cb(null);
    };
    Commands.prototype.invitationkey = function(cb) {
      return cb(null);
    };
    return Commands;
  })();
}).call(this);
