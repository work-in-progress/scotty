(function() {
  var colors, winston;
  colors = require('colors');
  winston = require('winston');
  exports.CommandUsers = (function() {
    function CommandUsers() {}
    CommandUsers.prototype.actions = ['create', 'login', 'logout', 'changepassword', 'redeem'];
    CommandUsers.prototype.usage = {
      'default': [],
      'create': [],
      'login': [],
      'logout': [],
      'changepassword': [],
      'invitationkey': []
    };
    CommandUsers.prototype.create = function(cb) {};
    CommandUsers.prototype.logout = function(cb) {};
    CommandUsers.prototype.login = function(cb) {};
    CommandUsers.prototype.changepassword = function(cb) {};
    CommandUsers.prototype.invitationkey = function(cb) {};
    return CommandUsers;
  })();
}).call(this);
