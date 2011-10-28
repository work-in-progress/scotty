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
    organizationName = args[0] || @config.getUserName()
    @client.appsForOrganization organizationName, (err,result) =>
      if err
        winston.error "Login failed"
        cb(err)
      else
        for app in result.collection
          winston.info "#{app.name}"
          cb null

