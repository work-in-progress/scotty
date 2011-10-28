(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {
      this.invitationkey = __bind(this.invitationkey, this);
      this.changepassword = __bind(this.changepassword, this);
      this.login = __bind(this.login, this);
      this.logout = __bind(this.logout, this);
      this.create = __bind(this.create, this);
    }
    Commands.prototype.actions = ['create', 'login', 'logout', 'changepassword', 'redeem'];
    Commands.prototype.usage = {
      'create': [],
      'login': ['Usage:'.cyan.bold.underline, '', '  scotty login', '  scotty login username password', ''],
      'logout': [],
      'changepassword': [],
      'invitationkey': []
    };
    Commands.prototype.create = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.logout = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.login = function(args, cb) {
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
    Commands.prototype.changepassword = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.invitationkey = function(args, cb) {
      return cb(null);
    };
    return Commands;
  })();
}).call(this);
