###*
Parts modeled after Nodejitsu's jitsu
###


color = require 'colors'
_ = require "underscore"
eyes = require 'eyes'
winston = require 'winston'
utils = require './utils'

###*
Encapsulates the primary functionality for this module.
###
class exports.ScottyApp
  started: false
  
  prompt: require 'prompt'
  commands:
    help : new (require('./command_help').CommandHelp)()
      
  constructor: () ->
    @prompt.properties = require('./prompt_properties').properties;
    @prompt.override   = require('optimist').argv;
    
  start: (argv, cb) ->
    @command = argv._;

    ### 
    Special -v command for showing current version without winston formatting
    ###
    if argv.version || argv.v
        console.log('v' + @version)
        process.exit(0);

    @prompt.start().pause();

    # Default to the `help` command.
    @command[0] || (@command[0] = 'help')

    utils.checkVersion (err) =>
      return cb(err) if err?
      
      
      @commands['help'].show null,=>
        @prompt.get (cb) =>
          winston.log "Prompted"