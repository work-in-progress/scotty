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
    'create' : []
    'delete' : []
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
    cb(null)

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

