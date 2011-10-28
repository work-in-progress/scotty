colors = require 'colors'
winston = require 'winston'
    
class exports.CommandLoader
  resourceNames: {}
  
  addCommand: (cmd,action,name) =>
    @commands[name] = 
     resource : cmd
     action : action
     usage : cmd.usage[action] || []
  
  load: (commandsToRequire,prompt,config,client) =>
    @commands = {}
    for req in commandsToRequire || []
       cmd = new (require(req).Commands)()
       # Why does the constructor not work, ah I HATE this madness
       cmd.prompt = prompt
       cmd.config = config
       cmd.client = client
       cmd.loader = @
       
       @resourceNames[cmd.resource] = cmd.resource 
       
       for action in cmd.actions
         # First we add the command as the canonical resource-action combination,
         # like help-show or apps-list
         @addCommand cmd,action,"#{cmd.resource}-#{action}"
         
         #@commands["#{cmd.resource}-#{action}"] = 
         # resource : cmd
         # action : action
         # usage : cmd.usage[action] || []
          
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
           
           #@commands["#{cmd.resource}"] = 
           #  resource : cmd
           # action : action
           #  usage : cmd.usage[action] || []
           
  
  hasAction: (actionName) =>
    !!@commands[actionName]
    
  getActionFn: (actionName,cb) =>
    action = @commands[actionName]
    return cb(new Error("Action #{actionName} not found.")) unless action
    cb(null,action.resource[actionName])
  
  getActionUsage: (actionName,cb) =>
    action = @commands[actionName]
    return cb(new Error("Action #{actionName} not found.")) unless action
    cb(null,action.usage)
    