colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  
  resource : 'help'
  defaultAction : 'show'
  
  actions : [
    'show']

  usage :
    'show' : [
      '  _|_|_|                        _|      _|              '.yellow.bold
      '_|          _|_|_|    _|_|    _|_|_|_|_|_|_|_|  _|    _|'.yellow.bold 
      '  _|_|    _|        _|    _|    _|      _|      _|    _|'.yellow.bold
      '      _|  _|        _|    _|    _|      _|      _|    _|'.yellow.bold
      '_|_|_|      _|_|_|    _|_|        _|_|    _|_|    _|_|_|'.yellow.bold
      '                                                      _|'.yellow.bold 
      '                                                  _|_|  '.yellow.bold
      ''
      'Build and manage your backends.'
      'Hosted and fully customizable.'
      'https://github.com/scottyapp/scotty'
      ''

      'Usage:'.cyan.bold.underline,
      ''
      '  scotty <resource> <action> <param1> <param2> ...'
      ''

      'Common Commands:'.cyan.bold.underline
      ''

      'To sign up for ScottyApp'.cyan
      '  scotty signup'
      ''

      'To log into ScottyApp'.cyan
      '  scotty login'
      ''

      'To redeem your beta access key'.cyan
      '  scotty redeem'
      ''

      'To create a new app'.cyan
      '  scotty create'
      ''

      'To lists all applications for the current user'.cyan
      '  scotty list'
      '',
      'To show specific help'.cyan
      '  scotty help <resource>'
      '  scotty help <resource> <action>'
      ''

      'Additional Commands'.cyan.bold.underline
      '  scotty help apps'
      '  scotty help users'
      '  scotty help orgs'
      ''
      'scotty options'.cyan.bold.underline
      ''
      'scotty [commands] [options]'.cyan
      ''
      '--version             print scotty version and exit'] 
    'show' : []

  show: (argumentResolver,cb) =>
    usage = argumentResolver.action
      
    if argumentResolver.isAmbiguous
      winston.help "Command #{usage} is ambiguous. Please specify one of the following:"
      for resource in argumentResolver.ambiguousResources 
        winston.help "scotty help #{resource.cyan} #{usage}"
    else if argumentResolver.resource && !argumentResolver.action
      @loader.getResourceUsage argumentResolver.resource, (err,usageResult) =>
        if err
          winston.help "Command #{usage} not found. Try scotty help."
          cb err
        else      
          winston.help ''
          winston.help l for l in usageResult
          winston.help ''
          cb null
      
    else
      usage = 'help' unless usage

      @loader.getActionUsage usage, (err,usageResult) =>
        if err
          winston.help "Command #{usage} not found. Try scotty help."
          cb err
        else      
          winston.help ''
          winston.help l for l in usageResult
          winston.help ''
          cb null
          
          