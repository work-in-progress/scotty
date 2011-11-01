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
      this.signup = __bind(this.signup, this);
    }
    Commands.prototype.resource = 'users';
    Commands.prototype.defaultAction = 'login';
    Commands.prototype.actions = ['signup', 'login', 'logout', 'changepassword', 'redeem'];
    Commands.prototype.usage = {
      'signup': ['Usage:'.cyan.bold.underline, '', '  scotty signup', '', 'Creates a new user within scottyapp.com. You can also create a', 'user directly on http://scottyapp.com'],
      'login': ['Usage:'.cyan.bold.underline, '', '  scotty login', '', 'Attempts to log you in. When successful, stores the access token', 'in .scottyconf.json. As of now this is stored in the current directory.'],
      'logout': ['Usage:'.cyan.bold.underline, '', '  scotty logout', '', 'Removes the access token information stored in .scottyconf.json'],
      'changepassword': ['Usage:'.cyan.bold.underline, '', '  scotty changepassword', '  scotty changepassword <newPassword>', '', 'Changes the password for the currently logged in user.'],
      'redeem': ['Usage:'.cyan.bold.underline, '', '  scotty redeem', '  scotty redeem <yourkey>', '', 'Validates your beta invitation key.']
    };
    Commands.prototype.signup = function(argumentResolver, cb) {
      return this.prompt.get('username', __bind(function(err, resultA) {
        return this.prompt.get('password', __bind(function(err, resultB) {
          return this.prompt.get('email', __bind(function(err, resultC) {
            return this.client.createUser(resultA.username, resultB.password, resultC.email, __bind(function(err, result) {
              if (err) {
                winston.error("Signup failed. Make sure that your user name is at least 4 chars and your password at least 6 chars long " + err + ". You can always signup at http://scottyapp.com");
                return cb(err);
              } else {
                winston.info("Signed up " + "successfully".cyan.bold);
                return cb(null);
              }
            }, this));
          }, this));
        }, this));
      }, this));
    };
    Commands.prototype.logout = function(argumentResolver, cb) {
      this.client.setAccessToken(null);
      return this.config.set(null, null, __bind(function() {
        winston.info("Logged out " + "successfully".cyan.bold);
        return cb(null);
      }, this));
    };
    Commands.prototype.login = function(argumentResolver, cb) {
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
    Commands.prototype.changepassword = function(argumentResolver, cb) {
      return this.prompt.get('password', __bind(function(err, resultB) {
        return this.client.updateMe({
          password: resultB.password
        }, __bind(function(err, result) {
          if (err) {
            winston.error("Password change failed " + err + ".");
            return cb(err);
          } else {
            winston.info("Password changed successfully" + "successfully".cyan.bold);
            return cb(null);
          }
        }, this));
      }, this));
    };
    Commands.prototype.redeem = function(argumentResolver, cb) {
      return this.prompt.get('inviteCode', __bind(function(err, resultB) {
        return this.client.updateMe({
          inviteCode: resultB.inviteCode
        }, __bind(function(err, result) {
          if (err) {
            winston.error("Sorry but that invitation code did not work. Pleae contact info@scottyapp.com so that we can fix this. " + err + ".");
            return cb(err);
          } else {
            winston.info("Your account has been " + "activated".cyan.bold);
            return cb(null);
          }
        }, this));
      }, this));
    };
    return Commands;
  })();
}).call(this);
