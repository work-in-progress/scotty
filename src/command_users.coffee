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
        @client.authenticate resultA.username,resultB.password, (err,result) =>
          if err
            winston.error "Login failed"
            cb(err)
          else
            @client.setAccessToken result.access_token
            @config.setAccessToken result.access_token, =>
              winston.info "Logged in successfully"
              cb null
    
  changepassword: (cb) ->
    cb(null)
  
  invitationkey: (cb) ->
    cb(null)
    