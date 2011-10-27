colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  actions : [
    'create',
    'login',
    'logout',
    'changepassword',
    'redeem']

  usage :
    'default' : [] 
    'create' : []
    'login' : []
    'logout' : []
    'changepassword' : []
    'invitationkey' : []
    
  constructor: (@prompt,@config) ->
  
  create: (cb) ->
    cb(null)
    
  logout: (cb) ->
    cb(null)
  
  login: (cb) =>
    @prompt.get 'username', (err, resultA) =>
      @prompt.get 'password', (err, resultB) =>
    
        winston.info "LOGIN #{resultA.username} #{resultB.password}"
        cb(null)
    
  changepassword: (cb) ->
    cb(null)
  
  invitationkey: (cb) ->
    cb(null)
    