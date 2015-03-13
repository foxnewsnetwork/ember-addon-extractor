path = require 'path'
fs = require 'fs-extras'
emberPromise = require '../utils/ember-cli-promise'


module.exports = class Addon
  @ensureExistence = (addonPath) ->
    return promiseLift(addonPath) if fs.statSync(addonPath).isDirectory()
    emberPromise
    .then (cli) ->
      cli
        cliArgs: ["addon", addonPath]
        inputStream: process.stdin
        outputStream: process.stdout
    .then -> addonPath

  @at = (addonPath) -> new Addon @ensureExistence path.normalize addonPath

  constructor: (@pathPromise) ->
    @dirPromise = @pathPromise.then path.dirname