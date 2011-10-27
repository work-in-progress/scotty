colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  actions : [
    'create',
    'delete',
    'list']

  usage :
    'default' : [] 
    'create' : []
    'delete' : []
    'list' : []

  create: (cb) ->
    cb(null)

  delete: (cb) ->
    cb(null)

  list: (cb) ->
    cb(null)

