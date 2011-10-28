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
  
  constructor: () ->
    @client = new ScottyAppClient(@config.key,@config.secret)
    @prompt.properties = require('./prompt_properties').properties;
    @prompt.override   = require('optimist').argv;
    
  start: (argv, cb) ->
    @command = argv._;
    
    @loader.load(['./command_help','./command_apps','./command_users'],@prompt,@config,@client)
    
    ### 
    Special -v command for showing current version without winston formatting
    ###
    if argv.version || argv.v
        console.log('using scotty v' + @version)
        process.exit(0);

    @prompt.start().pause();

    # Default to the `help` command.
    @command[0] = @command[0] || 'help'
    args = if @command.length > 1 then @command.slice(1) else []
    
    @config.load (err) =>
      #winston.info err
      return cb(err) if err?
      
      utils.checkVersion (err) =>
        return cb(err) if err?
      
        @loader.getActionFn @command[0], (err,actionFn) =>
          if err
            winston.error "Command not found. Try scotty help"
          else
            actionFn args,=>
              winston.info "Thank you for using scotty"
            
          #lib = @commands[@command[0]]
          #func =  lib[@command[0]]
          #func =>
          #  winston.info "Thank you for using scottyapp"
          