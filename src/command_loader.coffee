colors = require 'colors'
winston = require 'winston'
    
class exports.CommandLoader
 
  
  load: (commandsToRequire,prompt,config,client) =>
    @commands = {}
    for req in commandsToRequire || []
       cmd = new (require(req).Commands)()
       # Why does the constructor not work, ah I HATE this madness
       cmd.prompt = prompt
       cmd.config = config
       cmd.client = client
       cmd.loader = @
       
       for action in cmd.actions
         @commands[action] = 
          resource : cmd
          action : action
          usage : cmd.usage[action] || []
  
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
    