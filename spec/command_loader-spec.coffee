vows = require 'vows'
assert = require 'assert'

specHelper = require './spec_helper'

main = require '../lib/index'
ArgumentResolver = require("../lib/argument_resolver").ArgumentResolver

prompt = "A"
config = "B"
client = "C"
cmdLoader = new (require('../lib/command_loader').CommandLoader)()

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
    "WHEN loading the default commands" :
      topic: () ->
        cmdLoader.load(main.config.commandsForPath("../lib/"),prompt,config,client)
        return true
      "THEN a resource help should exist": (res) ->
        assert.isTrue cmdLoader.isResource('help')
      "THEN a resource apps should exist": (res) ->
        assert.isTrue cmdLoader.isResource('apps')
      "THEN a resource users should exist": (res) ->
        assert.isTrue cmdLoader.isResource('users')
      "THEN a resource orgs should exist": (res) ->
        assert.isTrue cmdLoader.isResource('orgs')
      "THEN a command with blank help should exist": (res) ->
        assert.isNotNull cmdLoader.commands['help']
      "THEN a command with blank apps should exist": (res) ->
        assert.isNotNull cmdLoader.commands['apps']
      "THEN a command with blank users should exist": (res) ->
        assert.isNotNull cmdLoader.commands['users']
      "THEN a command with blank orgs should exist": (res) ->
        assert.isNotNull cmdLoader.commands['orgs']
      "THEN a command with help-show should exist": (res) ->
        assert.isNotNull cmdLoader.commands['help-show']
      "THEN a command with apps-list should exist": (res) ->
        assert.isNotNull cmdLoader.commands['apps-list']
      "THEN a command with apps-create should exist": (res) ->
        assert.isNotNull cmdLoader.commands['apps-create']
      "THEN a command with apps-delete should exist": (res) ->
        assert.isNotNull cmdLoader.commands['apps-delete']
      "THEN a command with orgs-list should exist": (res) ->
        assert.isNotNull cmdLoader.commands['orgs-list']
      "THEN a command with orgs-create should exist": (res) ->
        assert.isNotNull cmdLoader.commands['orgs-create']
      "THEN a command with orgs-delete should exist": (res) ->
        assert.isNotNull cmdLoader.commands['orgs-delete']
      "THEN a command with users-signin should exist": (res) ->
        assert.isNotNull cmdLoader.commands['users-signup']
      "THEN a command with users-login should exist": (res) ->
        assert.isNotNull cmdLoader.commands['users-login']
      "THEN a command with users-logout should exist": (res) ->
        assert.isNotNull cmdLoader.commands['users-logout']
      "THEN a command with users-changepassword should exist": (res) ->
        assert.isNotNull cmdLoader.commands['users-changepassword']
      "THEN a command with users-redeem should exist": (res) ->
        assert.isNotNull cmdLoader.commands['users-redeem']
      "THEN a command with list should exist but have the value DONOTCALL": (res) ->
        assert.equal cmdLoader.commands['list'],"DONOTCALL"
      "THEN a command with create should exist but have the value DONOTCALL": (res) ->
        assert.equal cmdLoader.commands['create'],"DONOTCALL"
      "THEN a command with delete should exist but have the value DONOTCALL": (res) ->
        assert.equal cmdLoader.commands['delete'],"DONOTCALL"

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
    "WHEN testing isActionForResource" :
      topic: () ->
        return cmdLoader.isActionForResource("apps","create")
      "THEN it should be true": (res) ->
        assert.isTrue res
    "WHEN testing isAmbiguousAction" :
      topic: () ->
        return true
      "THEN it create should result in true": (res) ->
        assert.isTrue cmdLoader.isAmbiguousAction("create")
      "THEN it delete should result in true": (res) ->
        assert.isTrue cmdLoader.isAmbiguousAction("delete")
      "THEN it list should result in true": (res) ->
        assert.isTrue cmdLoader.isAmbiguousAction("list")
      "THEN it signup should result in true": (res) ->
        assert.isFalse cmdLoader.isAmbiguousAction("signup")
    "WHEN testing getActionFn for users signup" :
      topic: () ->
        cmdLoader.getActionFn("users","signup",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res
    "WHEN testing getActionFn for apps create" :
      topic: () ->
        cmdLoader.getActionFn("apps","create",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res
    "WHEN testing getActionFn for orgs create" :
      topic: () ->
        cmdLoader.getActionFn("orgs","create",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res

    "WHEN testing getActionFn for apps delete" :
      topic: () ->
        cmdLoader.getActionFn("apps","delete",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res
    "WHEN testing getActionFn for orgs delete" :
      topic: () ->
        cmdLoader.getActionFn("orgs","delete",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res

    "WHEN testing getActionFn for apps list" :
      topic: () ->
        cmdLoader.getActionFn("apps","list",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res
    "WHEN testing getActionFn for orgs list" :
      topic: () ->
        cmdLoader.getActionFn("orgs","list",@callback)
        return
      "THEN it should not err": (err,res) ->
        assert.isNull err
      "THEN it should return a function": (err,res) ->
        assert.isNotNull res
        
  .export module
