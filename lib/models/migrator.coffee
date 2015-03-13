path = require 'path'
chalk = require 'chalk'
map = require 'lodash-node/modern/collection/map'
journeyFrom = require '../utils/journey-from'
RSVP = require 'rsvp'

module.exports = class Migrator
  @lookingFor = (name) -> new Migrator name

  constructor: (@name) ->

  whereIsMyDestiny: (file) ->
    @dirPromise.then (dir) -> path.join dir, file.relativePath()

  whereIsMyHome: (file) ->
    file.absolutePath()

  copyFilesFrom: (project) ->
    @files = project.filesRelevantTo @name
    @

  pasteFilesInto: (addon) ->
    @dirPromise = addon.dirPromise
    RSVP.all map @files, @migrate, @

  migrate: (file) ->
    home = @whereIsMyHome file

    @whereIsMyDestiny(file).then (destiny) ->
      journeyFrom home
      .to destiny
      .whenIGetThere letThemKnowWhereImFrom(home)
      .ifIShouldFail mayOthersLearnFromMyMistakes

promiseLift = (value) -> new RSVP.Promise (r) -> r value

letThemKnowWhereImFrom = (startPath) ->
  (endPath) ->
    chalk.green [startPath, endPath].join " ~> "

mayOthersLearnFromMyMistakes = chalk.red