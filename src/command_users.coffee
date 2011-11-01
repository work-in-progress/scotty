colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  resource : 'users'
  defaultAction: 'login'
  
  actions : [
    'signup',
    'login',
    'logout',
    'changepassword',
    'redeem']

  usage :
    'signup' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty signup'
#      '  scotty signup <username> <password> <email>'
      ''
      'Creates a new user within scottyapp.com. You can also create a'
      'user directly on http://scottyapp.com'      
    ]
    'login' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty login'
#      '  scotty login <username> <password>'
      ''
      'Attempts to log you in. When successful, stores the access token'
      'in .scottyconf.json. As of now this is stored in the current directory.'
    ]
    'logout' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty logout'
      ''      
      'Removes the access token information stored in .scottyconf.json' 
      ]
    'changepassword' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty changepassword'
      '  scotty changepassword <newPassword>'
      ''      
      'Changes the password for the currently logged in user.' 
      ]
    'redeem' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty redeem'
      '  scotty redeem <yourkey>'
      ''      
      'Validates your beta invitation key.' 
      ]
    
  
  signup: (argumentResolver,cb) =>
    @prompt.get 'username', (err, resultA) =>
      @prompt.get 'password', (err, resultB) =>
        @prompt.get 'email', (err, resultC) =>
          @client.createUser resultA.username,resultB.password,resultC.email, (err,result) =>
            if err
              winston.error "Signup failed. Make sure that your user name is at least 4 chars and your password at least 6 chars long #{err}. You can always signup at http://scottyapp.com"
              cb(err)
            else
              winston.info "Signed up " + "successfully".cyan.bold
              cb null
    
  logout: (argumentResolver,cb) =>
    @client.setAccessToken null
    @config.set null,null, =>
      winston.info "Logged out "+ "successfully".cyan.bold
      cb null
  
  login: (argumentResolver,cb) =>
    @prompt.get 'username', (err, resultA) =>
      @prompt.get 'password', (err, resultB) =>
        @client.authenticate resultA.username,resultB.password, (err,result) =>
          if err
            winston.error "Login failed"
            cb(err)
          else
            @client.setAccessToken result.access_token
            @config.set result.access_token,resultA.username, =>
              winston.info "Logged in " + "successfully".cyan.bold
            cb null
    
  changepassword: (argumentResolver,cb) =>
    @prompt.get 'password', (err, resultB) =>
        @client.updateMe password : resultB.password,(err,result) =>
          if err
            winston.error "Password change failed #{err}."
            cb(err)
          else
            winston.info "Password changed successfully" + "successfully".cyan.bold
            cb null
  
  redeem: (argumentResolver,cb) =>
    @prompt.get 'inviteCode', (err, resultB) =>
        @client.updateMe inviteCode : resultB.inviteCode,(err,result) =>
          if err
            winston.error "Sorry but that invitation code did not work. Pleae contact info@scottyapp.com so that we can fix this. #{err}."
            cb(err)
          else
            winston.info "Your account has been " + "activated".cyan.bold
            cb null
    