var Addon, Configstore, Migrator, Project, cli, config, exit, inferName, inferPath;

Project = require("../models/project");

Addon = require('../models/addon');

Migrator = require('../models/migrator');

Configstore = require('configstore');

exit = require('exit');

config = new Configstore("ember-addon-extractor", {
  addonDir: "~/ember-addons"
});

inferPath = function() {
  return config.get("addonDir");
};

inferName = function() {
  var name;
  name = arguments[0];
  return name;
};

cli = function(options) {
  var addon, migrator, project;
  project = Project.closest(process.cwd());
  addon = Addon.at(inferPath());
  migrator = Migrator.lookingFor(inferName(options.cliArgs));
  return migrator.copyFilesFrom(project).pasteFilesInto(addon).then(exit);
};

module.exports = cli;
