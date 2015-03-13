resolve = require 'resolve'
RSVP = require 'rsvp'

module.exports = new RSVP.Promise (success, failure) ->
  resolve 'ember-cli', basedir: process.cwd(), (error, projectLocalCli) ->
    # Try to find a local ember-cli
    if error?
      # use the ember-cli that ships with this
      success require 'ember-cli'
    else
      success require projectLocalCli
