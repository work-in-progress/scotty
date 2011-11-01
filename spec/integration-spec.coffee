vows = require 'vows'
assert = require 'assert'

main = require '../lib/index'
specHelper = require './spec_helper'

vows.describe("integration_task")
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
    "Ensure we run in production" :
      topic: -> 
        return main.client
      "THEN the base url must be https://api.scottyapp.com": (client) ->
        assert.equal client.baseUrl,"https://api.scottyapp.com"
      "THEN the key must not be 4e36836cc2db1951a1000002": (client) ->
        assert.notEqual client.key,"4e36836cc2db1951a1000002"
      "THEN the secret must not be 2d61f8d3d660357bdbcb5dd42d91835fb2987dd16e8b5d18453c56699db782bf": (client) ->
        assert.notEqual client.secret,"2d61f8d3d660357bdbcb5dd42d91835fb2987dd16e8b5d18453c56699db782bf"

  .export module
  
    
