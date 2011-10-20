
color = require 'colors'
_ = require "underscore"


require('pkginfo')(module,'version')

###*
Encapsulates the primary functionality for this module.
###
class exports.ScottyApp

  ###*
  Initializes a new instance of the @see ScottyApp class.
  ###
  constructor: (opts = {}) ->

  start: () ->
    console.log "ScottyApp"
