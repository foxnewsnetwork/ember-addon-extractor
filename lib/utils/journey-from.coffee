fs = require 'fs-extra'
RSVP = require 'rsvp'

module.exports = journeyFrom = (homePath) ->
  to: (targetPath) ->
    whenIGetThere: (success) ->
      ifIShouldFail: (failure) ->
        new RSVP.Promise (resolve, reject) ->
          fs.copy home, destiny, (err) ->
            return reject failure err if error?
            resolve success targetPath