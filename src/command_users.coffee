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
    'create' : []
    'login' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty login'
      '  scotty login username password'
      ''      
    ]
    'logout' : []
    'changepassword' : []
    'invitationkey' : []
    
  
  create: (args,cb) =>
    cb(null)
    
  logout: (args,cb) =>
    cb(null)
  
  login: (args,cb) =>
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
    
  changepassword: (args,cb) =>
    cb(null)
  
  invitationkey: (args,cb) =>
    cb(null)
    