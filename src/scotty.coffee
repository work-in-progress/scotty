###*
Parts modeled after Nodejitsu's jitsu
###


color = require 'colors'
_ = require "underscore"
eyes = require 'eyes'
winston = require 'winston'
utils = require './utils'
ScottyAppClient = require('scottyapp-api-client').Client

###*
Encapsulates the primary functionality for this module.
###
class exports.ScottyApp
  started: false
  
  prompt: require 'prompt'
  config: require './config'
  
  loader: new (require('./command_loader').CommandLoader)()
  client: null
  
  commands:
    help : new (require('./command_help').Commands)()
    login : new (require('./command_users').Commands)(@prompt,@config)

  constructor: () ->
    @client = new ScottyAppClient(@config.key,@config.secret)
    @prompt.properties = require('./prompt_properties').properties;
    @prompt.override   = require('optimist').argv;
    
  start: (argv, cb) ->
    @command = argv._;
    
    @loader.load(['./command_help','./command_apps','./command_users'])
    
    @commands.help.prompt = @prompt
    @commands.help.config = @config
    @commands.login.prompt = @prompt
    @commands.login.config = @config
    @commands.login.client = @client

    ### 
    Special -v command for showing current version without winston formatting
    ###
    if argv.version || argv.v
        console.log('using scotty v' + @version)
        process.exit(0);

    @prompt.start().pause();

    # Default to the `help` command.
    @command[0] = @command[0] || 'help'
    
    @config.load (err) =>
      #winston.info err
      return cb(err) if err?
      
      utils.checkVersion (err) =>
        return cb(err) if err?
      
        lib = @commands[@command[0]]
        func =  lib[@command[0]]
        func =>
          winston.info "Thank you for using scottyapp"