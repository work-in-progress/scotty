###*
Parts modeled after Nodejitsu's jitsu
###


color = require 'colors'
_ = require "underscore"
eyes = require 'eyes'
winston = require 'winston'
utils = require './utils'
ScottyAppClient = require('scottyapp-api-client').Client
ArgumentResolver = require('./argument_resolver').ArgumentResolver

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
    @client.baseUrl = "http://192.168.1.101:3000"
    @client.key = "4e36836cc2db1951a1000002"
    @client.secret = "2d61f8d3d660357bdbcb5dd42d91835fb2987dd16e8b5d18453c56699db782bf"
    
    @prompt.properties = require('./prompt_properties').properties;
    @prompt.override   = require('optimist').argv;
    
  start: (argv, cb) ->
    ### 
    Special -v command for showing current version without winston formatting
    ###
    if argv.version || argv.v
        console.log('using scotty v' + @version)
        process.exit(0);

    @prompt.start().pause();
    
    @config.load (err) =>
      return cb(err) if err?

      @client.setAccessToken @config.getAccessToken()
            
      utils.checkVersion (err) =>
        return cb(err) if err?

        @loader.load(@config.commandsForPath(),@prompt,@config,@client)

        @command = argv._;    
        # Default to the `help` command.
        @command[0] = @command[0] || 'help'
        args = if @command.length > 1 then @command.slice(1) else []

        resource = @command[0]
        action = null

        if @loader.isResource(@command[0])
          #winston.info " IS A RESOURCE"
          if @command.length > 1 && @loader.isActionForResource(@command[0],@command[1])
            action = @command[1]
            args = if @command.length > 2 then @command.slice(2) else []
            
          else
            action = @loader.defaultActionForResource(@command[0])
        else
          # first parameter is an action.
          resource = @loader.resourceforAction(@command[0])
          action = @command[0]
          
        #winston.info "RESOURCE #{resource} ACTION #{action}"
        # At this point we need to have 
        if resource == null || action == null
          winston.error "Command not found. Try " + "scotty help".cyan.bold
          return
          
      
        @loader.getActionFn resource,action, (err,actionFn) =>
          if err
            winston.error "Command not found. Try " + "scotty help".cyan.bold
          else
            actionFn args,=>
              #winston.info ""
            
          