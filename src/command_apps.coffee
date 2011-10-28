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
    'list' : []

  create: (args,cb) =>
    cb(null)

  delete: (args,cb) =>
    cb(null)

  list: (args,cb) =>
    # args[0] ||
    organizationName = @config.getUserName()
    @client.appsForOrganization organizationName, (err,result) =>
      if err
        winston.error "Login failed"
        cb(err)
      else
        winston.info "#{result.total_count}".cyan + " apps for organization " + "#{organizationName}".cyan
        for app in result.collection
          winston.info "#{app.name}"
          cb null

