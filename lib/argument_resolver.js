(function() {
  /**
  (C) 2011 Martin Wawrusch and Freshfugu Inc.
  */
  /**
  Handles the interpretation of arguments
  Basically it takes the args, as passed from the command line
  and tells us what we need to do. It is a one off class, eg
  you create one instance and it populates it's fields. If you need
  to parse another set of arguments you create a new instance.
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  exports.ArgumentResolver = (function() {
    /**
    The arguments, as passed through the command line.
    */    ArgumentResolver.prototype.args = [];
    /**
    A boolean indicating that this is a help action, instead of 
    a normal operation. If it is a help action then resource and action
    contain the information necessary for displaying help.
    */
    ArgumentResolver.prototype.isHelp = false;
    /**
    The action to perform. When this is set then it contains an action that can
    be executed and that has been resolved against a resource (e.g. the resource 
    field is valid too)
    */
    ArgumentResolver.prototype.action = null;
    /** 
    The resource to use. When this is set the action field is also set.
    */
    ArgumentResolver.prototype.resource = null;
    /**
    Additional parameters passed along, or an empty array. 
    */
    ArgumentResolver.prototype.params = [];
    /**
    A boolean indicating that the arguments have been resolved correctly.
    */
    ArgumentResolver.prototype.isValid = true;
    /**
    An error msg that is set and should be shown to the user, in case the args
    do not resolve to an action or help.
    */
    ArgumentResolver.prototype.errorMsg = "";
    /**
    Initializes a new instance of @see ArgumentResolver
    @param {String[]}  args the arguments as taken from the command line
    @param {CommandLoader} loader the loader object used to resolve commands
    */
    function ArgumentResolver(args, loader) {
      this.args = args != null ? args : [];
      this.loader = loader;
      this._resolve = __bind(this._resolve, this);
      this._resolve();
    }
    ArgumentResolver.prototype._resolve = function() {
      this.args[0] = this.args[0] || 'help';
      this.params = this.args.length > 1 ? this.args.slice(1) : [];
      this.args[0] = this.args[0].toLowerCase();
      if (this.args[0] === "help") {
        this.isHelp = true;
        this.args = this.args.splice(1);
      }
      if (this.isHelp && this.args.length === 0) {
        return;
      }
      if (this.loader.isResource(this.args[0])) {
        this.resource = this.args[0];
        this.params = this.args.length > 1 ? this.args.slice(1) : [];
        console.log(this.args);
        if (this.args.length > 1 && this.loader.isActionForResource(this.args[0], this.args[1])) {
          if (this.args[1]) {
            this.action = this.args[1];
          }
          this.params = this.args.length > 2 ? this.args.slice(2) : [];
        } else {
          if (!this.isHelp) {
            this.action = this.loader.defaultActionForResource(this.args[0]);
          }
        }
      } else {
        this.resource = this.loader.resourceforAction(this.args[0]);
        this.action = this.args[0];
      }
      if (!this.isHelp && (this.resource === null || this.action === null)) {
        this.isValid = false;
        this.errorMsg = "Command not found. Try " + "scotty help".cyan.bold;
      }
    };
    return ArgumentResolver;
  })();
}).call(this);
