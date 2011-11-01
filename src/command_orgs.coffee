colors = require 'colors'
winston = require 'winston'
    
class exports.Commands
  resource : 'orgs'
  defaultAction : 'list'
  
  actions : [
    'create',
    'delete',
    'list']

  usage :
    'create' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty orgs create'
      '  scotty orgs create <organization name>'
      ''
      'Creates a new organization for the logged in user.'
      'An organization name must be unique within the namespace of scottyapp.com'
      'and it must not conflict with a user name.']
    'delete' : []
    'list' : [
      'Usage:'.cyan.bold.underline,
      ''
      '  scotty orgs list'
      '  scotty orgs list <user name>'
      ''
      'Lists all organizations for the specified user, or if none is specified'
      'then all organizations belonging to the logged in user.'
      ]

  create: (argumentResolver,cb) =>
    organizationName = argumentResolver.params[0]
    puts organizationName
    @client.createOrganization organizationName,{}, (err,result) =>
      if err
        winston.error "Login failed"
        cb(err)
      else
        winston.info "Successfully ".cyan + "created organization #{result.name}"
        cb null

  delete: (argumentResolver,cb) =>
    cb(null)

  list: (argumentResolver,cb) =>
    userName = argumentResolver.params[0] || @config.getUserName()
    @client.organizationsForUser userName, (err,result) =>
      if err
        winston.error "Login failed"
        cb(err)
      else
        winston.info "#{result.total_count}".cyan + " organizations for user " + "#{userName}".cyan
        for org in result.collection
          winston.info "#{org.name}"
        cb null

