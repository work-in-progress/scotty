nconf = require 'nconf'
path = require 'path'

class Config
  constructor: () ->
    nconf.argv = nconf.env = true
    nconf.add('file', { file: '.scottyconf.json' });
  
  load: (cb) ->
    nconf.load (err) =>
      err = null # Ignore file not found, and don't care about the rest
      cb(err)


  ###*
  Those are the official keys for the scotty app. 
  DO NOT USE THEM IN YOUR OWN APPS, generate your own at 
  http://scottyapp.com/developers/api-keys
  ###
  key: "4ea27b3dbab23e0001000002"
  secret: "12eba4683b5c1b014b114463afed70f036dbeea6951b092346b6b58ddfff524f"
  
  setAccessToken: (token,cb) =>
    nconf.set "accessToken",token
    nconf.save cb
  
  getAccessToken: () =>
    nconf.get "accessToken"
    
    
module.exports = new Config()
    
