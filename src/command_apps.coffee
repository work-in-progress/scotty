colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  resource : 'apps'
  defaultAction : 'list'
  
  actions : [
    'create',
    'delete',
    'list']

  usage :
    'create' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty apps create'
      '  scotty apps create <app name>'
      '  scotty apps create <organization name> <app name>'
      ''
      'Creates a new app that belongs to the user\'s default organization'
      'or the organization specified.'      
      ]
    'delete' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty apps delete'
      '  scotty apps delete <app name>'
      '  scotty apps delete <organization name> <app name>'
      ''
      'Deletes an app that belongs to the current user or the organization'            
      ]
    'list' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty apps list'
      '  scotty apps list <organization name>'
      ''
      'Lists all apps for the specified organization, or if none is specified'
      'then the default organization belonging to the logged in user.'
      'Apps are always grouped by organization, and each user gets a default'
      'organization named after his user id uppon account creation.'      
      ]

  create: (argumentResolver,cb) =>
    appName = argumentResolver.params[0]
    organizationName = @config.getUserName()
    
    if argumentResolver.params.length > 1
      organizationName = argumentResolver.params[0]
      appName = argumentResolver.params[1]

    @client.createApp organizationName,appName,"",false, (err,result) =>
      if err
        winston.error "Could not create app #{err}"
        cb(err)
      else
        winston.info "App created"
        cb null


  delete: (argumentResolver,cb) =>
    cb(null)

  list: (argumentResolver,cb) =>
    organizationName = argumentResolver.params[0] || @config.getUserName()
    @client.appsForOrganization organizationName, (err,result) =>
      if err
        winston.error "Login failed"
        cb(err)
      else
        winston.info "#{result.total_count}".cyan + " apps for organization " + "#{organizationName}".cyan
        for app in result.collection
          winston.info "#{app.name}"
          cb null

