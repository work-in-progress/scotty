colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  
  actions : [
    'show']

  usage :
    'default' : [
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
      '  scotty help resource'
      '  scotty help resource action'
      ''

      'Additional Commands'.cyan.bold.underline
      '  scotty apps'
      '  scotty users'
      ''
      'scotty options'.cyan.bold.underline
      ''
      'scotty [commands] [options]'.cyan
      ''
      '--version             print scotty version and exit'] 
    'show' : []

  show: (action,cb) ->

    winston.help ''
    winston.help l for l in @usage['default']
    winston.help ''
  
    cb null