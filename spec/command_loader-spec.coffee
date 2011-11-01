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
vows.describe("command_loader")
  .addBatch
    "CLEANUP TEMP":
      topic: () ->
        specHelper.cleanTmpFiles []
      "THEN IT SHOULD BE CLEAN :)": () ->
        assert.isTrue true        
  .addBatch
    "SETUP" :
      topic: () -> 
        specHelper.setup @callback
        return
      "THEN IT SHOULD BE SET UP :)": () ->
        assert.isTrue true        
  .addBatch
    "WHEN dealing with a valid action only" :
      topic: () ->
        return cmdLoader.hasAction("create")
      "THEN it should be true": (res) ->
        assert.isTrue res
    "WHEN dealing with an invalid action only" :
      topic: () ->
        return cmdLoader.hasAction("frodo")
      "THEN it should be true": (res) ->
        assert.isFalse res
  .export module
