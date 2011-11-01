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

        argumentResolver = new ArgumentResolver(argv._, @loader)

        resource = argumentResolver.resource
        action = argumentResolver.action

        if argumentResolver.isHelp
          resource = "help"
          action = "show"
        
        if argumentResolver.isValid
          @loader.getActionFn resource,action, (err,actionFn) =>
            if err
              winston.error "Command not found. Try " + "scotty help".cyan.bold
            else        
              actionFn argumentResolver,=>
                #winston.info ""
        else
          winston.error "Command not found. Try " + "scotty help".cyan.bold
        

   
      
            
          