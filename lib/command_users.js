(function() {
  var colors, winston;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  colors = require('colors');
  winston = require('winston');
  exports.Commands = (function() {
    function Commands() {
      this.redeem = __bind(this.redeem, this);
      this.changepassword = __bind(this.changepassword, this);
      this.login = __bind(this.login, this);
      this.logout = __bind(this.logout, this);
      this.create = __bind(this.create, this);
    }
    Commands.prototype.resource = 'users';
    Commands.prototype.defaultAction = 'login';
    Commands.prototype.actions = ['signup', 'login', 'logout', 'changepassword', 'redeem'];
    Commands.prototype.usage = {
      'signup': ['Usage:'.cyan.bold.underline, '', '  scotty signup', '  scotty signup <username> <password> <email>', '', 'Creates a new user within scottyapp.com. You can also create a', 'user directly on http://scottyapp.com'],
      'login': ['Usage:'.cyan.bold.underline, '', '  scotty login', '  scotty login <username> <password>', '', 'Attempts to log you in. When successful, stores the access token', 'in .scottyconf.json. As of now this is stored in the current directory.'],
      'logout': ['Usage:'.cyan.bold.underline, '', '  scotty logout', '', 'Removes the access token information stored in .scottyconf.json'],
      'changepassword': ['Usage:'.cyan.bold.underline, '', '  scotty changepassword', '  scotty changepassword <newPassword>', '', 'Changes the password for the currently logged in user.'],
      'redeem': ['Usage:'.cyan.bold.underline, '', '  scotty redeem', '  scotty redeem <yourkey>', '', 'Validates your beta invitation key.']
    };
    Commands.prototype.create = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.logout = function(args, cb) {
      this.client.setAccessToken(null);
      return this.config.set(null, null, __bind(function() {
        winston.info("Logged out " + "successfully".cyan.bold);
        return cb(null);
      }, this));
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
              this.config.set(result.access_token, resultA.username, __bind(function() {
                return winston.info("Logged in " + "successfully".cyan.bold);
              }, this));
              return cb(null);
            }
          }, this));
        }, this));
      }, this));
    };
    Commands.prototype.changepassword = function(args, cb) {
      return cb(null);
    };
    Commands.prototype.redeem = function(args, cb) {
      return cb(null);
    };
    return Commands;
  })();
}).call(this);
