var Migrator, RSVP, chalk, journeyFrom, letThemKnowWhereImFrom, map, mayOthersLearnFromMyMistakes, path, promiseLift;

path = require('path');

chalk = require('chalk');

map = require('lodash-node/modern/collection/map');

journeyFrom = require('../utils/journey-from');

RSVP = require('rsvp');

module.exports = Migrator = (function() {
  Migrator.lookingFor = function(name) {
    return new Migrator(name);
  };

  function Migrator(name1) {
    this.name = name1;
  }

  Migrator.prototype.whereIsMyDestiny = function(file) {
    return this.dirPromise.then(function(dir) {
      return path.join(dir, file.relativePath());
    });
  };

  Migrator.prototype.whereIsMyHome = function(file) {
    return file.absolutePath();
  };

  Migrator.prototype.copyFilesFrom = function(project) {
    this.files = project.filesRelevantTo(this.name);
    return this;
  };

  Migrator.prototype.pasteFilesInto = function(addon) {
    this.dirPromise = addon.dirPromise;
    return RSVP.all(map(this.files, this.migrate, this));
  };

  Migrator.prototype.migrate = function(file) {
    var home;
    home = this.whereIsMyHome(file);
    return this.whereIsMyDestiny(file).then(function(destiny) {
      return journeyFrom(home).to(destiny).whenIGetThere(letThemKnowWhereImFrom(home)).ifIShouldFail(mayOthersLearnFromMyMistakes);
    });
  };

  return Migrator;

})();

promiseLift = function(value) {
  return new RSVP.Promise(function(r) {
    return r(value);
  });
};

letThemKnowWhereImFrom = function(startPath) {
  return function(endPath) {
    return chalk.green([startPath, endPath].join(" ~> "));
  };
};

mayOthersLearnFromMyMistakes = chalk.red;
