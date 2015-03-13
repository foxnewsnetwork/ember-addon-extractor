var Addon, emberPromise, fs, path;

path = require('path');

fs = require('fs-extras');

emberPromise = require('../utils/ember-cli-promise');

module.exports = Addon = (function() {
  Addon.ensureExistence = function(addonPath) {
    if (fs.statSync(addonPath).isDirectory()) {
      return promiseLift(addonPath);
    }
    return emberPromise.then(function(cli) {
      return cli({
        cliArgs: ["addon", addonPath],
        inputStream: process.stdin,
        outputStream: process.stdout
      });
    }).then(function() {
      return addonPath;
    });
  };

  Addon.at = function(addonPath) {
    return new Addon(this.ensureExistence(path.normalize(addonPath)));
  };

  function Addon(pathPromise) {
    this.pathPromise = pathPromise;
    this.dirPromise = this.pathPromise.then(path.dirname);
  }

  return Addon;

})();
