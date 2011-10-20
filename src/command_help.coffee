colors = require 'colors'
winston = require 'winston'
    
class exports.CommandHelp
  
  actions : [
    'show',
    'delete',
    'list']

  usage :
    'default' : [
      'blahblah'] 
    'show' : []

  show: (action,cb) ->

    winston.help ''
    winston.help l for l in @usage['default']
    winston.help ''
  
    cb null