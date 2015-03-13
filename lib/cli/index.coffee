Project = require "../models/project"
Addon = require '../models/addon'
Migrator = require '../models/migrator'
Configstore = require 'configstore'
exit = require 'exit'

config = new Configstore "ember-addon-extractor", addonDir: "~/ember-addons"

inferPath = -> config.get("addonDir")

inferName = (name, ...) -> name

cli = (options) ->
  project = Project.closest process.cwd()
  addon = Addon.at inferPath()
  migrator = Migrator.lookingFor inferName options.cliArgs

  migrator
  .copyFilesFrom(project)
  .pasteFilesInto(addon)
  .then exit


module.exports = cli