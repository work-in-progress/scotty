colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  actions : [
    'create',
    'delete',
    'list']

  usage :
    'create' : []
    'delete' : []
    'list' : []

  create: (args,cb) =>
    cb(null)

  delete: (args,cb) =>
    cb(null)

  list: (args,cb) =>
    cb(null)

