vows = require 'vows'
assert = require 'assert'

specHelper = require './spec_helper'

main = require '../lib/index'
ArgumentResolver = require("../lib/argument_resolver").ArgumentResolver

prompt = "A"
config = "B"
client = "C"
cmdLoader = new (require('../lib/command_loader').CommandLoader)()
cmdLoader.load(main.config.commandsForPath("../lib/"),prompt,config,client)

###

nothing
help
help 
help resource
help resource action
resource
resource action
resource action data



###
vows.describe("argument_resolver")
  .addBatch
    "CLEANUP TEMP":
      topic: ->
        specHelper.cleanTmpFiles []
      "THEN IT SHOULD BE CLEAN :)": () ->
        assert.isTrue true        
  .addBatch
    "SETUP" :
      topic: -> 
        specHelper.setup @callback
        return
      "THEN IT SHOULD BE SET UP :)": () ->
        assert.isTrue true        
  .addBatch
    "WHEN resolving an empty argument list" :
      topic: ->        
        return new ArgumentResolver(null,cmdLoader)
      "THEN it should be marked as help": (resolver) ->
        assert.isTrue resolver.isHelp
      "THEN it's resource should be null": (resolver) ->
        assert.isNull resolver.resource
      "THEN it's action should be null": (resolver) ->
        assert.isNull resolver.action
      "THEN it's error message should be an empty string": (resolver) ->
        assert.equal resolver.errorMsg, ""
      "THEN it should be marked as valid": (resolver) ->
        assert.isTrue resolver.isValid
      "THEN it's params should have a length 0": (resolver) ->
        assert.equal resolver.params.length,0
      "THEN it should not be marked as isAmbiguous": (resolver) ->
        assert.isFalse resolver.isAmbiguous
      "THEN it's ambiguousResources should have a length 0": (resolver) ->
        assert.equal resolver.ambiguousResources.length,0
        
    "WHEN resolving an empty argument list with a single help" :
      topic: ->        
        return new ArgumentResolver(["help"],cmdLoader)
      "THEN it should be marked as help": (resolver) ->
        assert.isTrue resolver.isHelp
      "THEN it's resource should be null": (resolver) ->
        assert.isNull resolver.resource
      "THEN it's action should be null": (resolver) ->
        assert.isNull resolver.action
      "THEN it's error message should be an empty string": (resolver) ->
        assert.equal resolver.errorMsg, ""
      "THEN it should be marked as valid": (resolver) ->
        assert.isTrue resolver.isValid
      "THEN it's params should have a length 0": (resolver) ->
        assert.equal resolver.params.length,0
      "THEN it should not be marked as isAmbiguous": (resolver) ->
        assert.isFalse resolver.isAmbiguous
      "THEN it's ambiguousResources should have a length 0": (resolver) ->
        assert.equal resolver.ambiguousResources.length,0

    "WHEN resolving an empty argument list with a help and a resource" :
      topic: ->        
        return new ArgumentResolver(["help","apps"],cmdLoader)
      "THEN it should be marked as help": (resolver) ->
        assert.isTrue resolver.isHelp
      "THEN it's resource should be apps": (resolver) ->
        assert.equal resolver.resource,"apps"
      "THEN it's action should be null": (resolver) ->
        assert.isNull resolver.action
      "THEN it's error message should be an empty string": (resolver) ->
        assert.equal resolver.errorMsg, ""
      "THEN it should be marked as valid": (resolver) ->
        assert.isTrue resolver.isValid
      "THEN it's params should have a length 0": (resolver) ->
        assert.equal resolver.params.length,0
      "THEN it should not be marked as isAmbiguous": (resolver) ->
        assert.isFalse resolver.isAmbiguous
      "THEN it's ambiguousResources should have a length 0": (resolver) ->
        assert.equal resolver.ambiguousResources.length,0
    "WHEN resolving an empty argument list with a help and a resource and an action" :
      topic: ->
        return new ArgumentResolver(["help","apps","create"],cmdLoader)
      "THEN it should be marked as help": (resolver) ->
        assert.isTrue resolver.isHelp
      "THEN it's resource should be apps": (resolver) ->
        assert.equal resolver.resource,"apps"
      "THEN it's action should be create": (resolver) ->
        assert.equal resolver.action,"create"
      "THEN it's error message should be an empty string": (resolver) ->
        assert.equal resolver.errorMsg, ""
      "THEN it should be marked as valid": (resolver) ->
        assert.isTrue resolver.isValid
      "THEN it's params should have a length 0": (resolver) ->
        assert.equal resolver.params.length,0
      "THEN it should not be marked as isAmbiguous": (resolver) ->
        assert.isFalse resolver.isAmbiguous
      "THEN it's ambiguousResources should have a length 0": (resolver) ->
        assert.equal resolver.ambiguousResources.length,0
    "WHEN resolving an empty argument list with a help and an unambigous action" :
      topic: ->        
        return new ArgumentResolver(["help","login"],cmdLoader)
      "THEN it should be marked as help": (resolver) ->
        assert.isTrue resolver.isHelp
      "THEN it's resource should be users": (resolver) ->
        assert.equal resolver.resource,"users"
      "THEN it's action should be login": (resolver) ->
        assert.equal resolver.action,"login"
      "THEN it's error message should be an empty string": (resolver) ->
        assert.equal resolver.errorMsg, ""
      "THEN it should be marked as valid": (resolver) ->
        assert.isTrue resolver.isValid
      "THEN it's params should have a length 0": (resolver) ->
        assert.equal resolver.params.length,0
      "THEN it should not be marked as isAmbiguous": (resolver) ->
        assert.isFalse resolver.isAmbiguous
      "THEN it's ambiguousResources should have a length 0": (resolver) ->
        assert.equal resolver.ambiguousResources.length,0
    "WHEN resolving an empty argument list with a help and an ambigous action" :
      topic: ->        
        return new ArgumentResolver(["help","create"],cmdLoader)
      "THEN it should be marked as help": (resolver) ->
        assert.isTrue resolver.isHelp
      "THEN it's resource should be null": (resolver) ->
        assert.isNull resolver.resource
      "THEN it's action should be create": (resolver) ->
        assert.equal resolver.action,"create"
      "THEN it's error message should be an empty string": (resolver) ->
        assert.equal resolver.errorMsg, ""
      "THEN it should be marked as valid": (resolver) ->
        assert.isTrue resolver.isValid
      "THEN it's params should have a length 0": (resolver) ->
        assert.equal resolver.params.length,0
      "THEN it should be marked as isAmbiguous": (resolver) ->
        assert.isTrue resolver.isAmbiguous
      "THEN it's ambiguousResources should have a length 0": (resolver) ->
        assert.equal resolver.ambiguousResources.length,2
  .export module
