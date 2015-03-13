var File, Project, RSVP, findup, flatten, glob, makeForType, path;

RSVP = require('rsvp');

flatten = require("lodash-node/modern/array/flatten");

findup = require('findup');

glob = require('glob');

path = require('path');

File = require('../models/file');

makeForType = function(dir, type) {
  return function(filename) {
    return new File({
      dir: dir,
      filename: filename,
      type: type
    });
  };
};

module.exports = Project = (function() {
  Project.closest = function(dir) {
    return new Project(findup(dir, 'package.json'));
  };

  function Project(dirPromise) {
    this.dirPromise = dirPromise;
  }

  Project.prototype.filesRelevantTo = function(name) {
    return RSVP.all([this.appFiles(name), this.serverFiles(name), this.testFiles(name)]).then(flatten);
  };

  Project.prototype.appFiles = function(name) {
    return this.dirPromise.then(function(dir) {
      return glob.sync(path.join(dir, "app", "**/" + name + ".*"));
    }).then(function(fileNames) {
      return map(fileNames, makeForType(dir, "app"));
    });
  };

  Project.prototype.serverFiles = function(name) {
    return this.dirPromise.then(function(dir) {
      return glob.sync(path.join(dir, "server", "**/" + name + ".*"));
    }).then(function(fileNames) {
      return map(fileNames, makeForType(dir, "server"));
    });
  };

  Project.prototype.testFiles = function(name) {
    return this.dirPromise.then(function(dir) {
      return glob.sync(path.join(dir, "tests", "unit", "**/" + name + ".*"));
    }).then(function(fileNames) {
      return map(fileNames, makeForType(dir, "test"));
    });
  };

  return Project;

})();
