colors = require 'colors'
winston = require 'winston'
_ = require "underscore"

###*
Loads the commands and makes them available. Is a bit of a mess right now, 
needs some love and improvement.
###
class exports.CommandLoader
  resourceNames: {}
  commands: {}
  
  addCommand: (cmd,action,name) =>
    @commands[name] = 
     resource : cmd
     resourceName : cmd.resource
     action : action
     usage : cmd.usage[action] || []
  
  isResource: (name) =>
    !!@resourceNames[name]
    
  resourceforAction: (actionName) =>
    res = @commands[actionName]
    return null if res == "DONOTCALL"
    return null unless res
    res.resourceName
    
  isAmbiguousAction: (actionName) =>
    @commands[actionName] == "DONOTCALL"
    
  ambiguousResourcesForAction: (actionName) =>
    _.select @resourceNames, (resource) => 
      @isActionForResource(resource,actionName)
    
  defaultActionForResource: (resourceName) =>
    if @commands[resourceName] then @commands[resourceName].action else null
    
  ###*
  Returns true if the specified action exists for the resource.
  ###
  isActionForResource: (resourceName,actionName) =>
    !!@commands[@nameFrom(resourceName,actionName)]
      
  nameFrom:(resourceName,actionName) =>
    "#{resourceName}-#{actionName}"
  
  load: (commandsToRequire,prompt,config,client) =>
    @commands = {}
    for req in commandsToRequire || []
       cmd = new (require(req).Commands)()
       # Why does the constructor not work, ah I HATE this madness
       cmd.prompt = prompt
       cmd.config = config
       cmd.client = client
       cmd.loader = @
       
       #winston.info cmd.resource
       @resourceNames[cmd.resource] = cmd.resource 
       
       for action in cmd.actions
         # First we add the command as the canonical resource-action combination,
         # like help-show or apps-list
         @addCommand cmd,action,@nameFrom(cmd.resource,action)
                   
         # Now we add it as the action name, but only if it does not exist
         # if it exists we should mark it as do not call.
         if @commands[action]
          @commands[action] = "DONOTCALL"
         else
           @addCommand cmd,action,"#{action}"
          
         # Now if this is the default action for the resource, then we 
         # add the command under the resource name as well. Cheap but works.
         if cmd.defaultAction && cmd.defaultAction == action
           @addCommand cmd,action,cmd.resource
           
  
  hasAction: (actionName) =>
    !!@commands[actionName]
    
  getActionFn: (resourceName,actionName,cb) =>
    action = @commands[@nameFrom(resourceName,actionName)]
    
    res = action.resource[actionName] if action

    #console.log res

    return cb(new Error("#{resourceName} #{actionName} not found.")) unless action && res
    
    cb null,res
  
  getActionUsage: (actionName,cb) =>
    action = @commands[actionName]
    return cb(new Error("Action #{actionName} not found.")) unless action
    cb(null,action.usage)
    
    
  getResourceUsage: (resourceName,cb) =>
    cmd = @commands[resourceName]
    return cb(new Error("Resource #{resourceName} not found.")) unless cmd

    res = []
    
    _.each cmd.resource.usage,(value) =>
      for item in value
        res.push(item)
      res.push ""
    cb(null,res)
  
    