var RSVP, resolve;

resolve = require('resolve');

RSVP = require('rsvp');

module.exports = new RSVP.Promise(function(success, failure) {
  return resolve('ember-cli', {
    basedir: process.cwd()
  }, function(error, projectLocalCli) {
    if (error != null) {
      return success(require('ember-cli'));
    } else {
      return success(require(projectLocalCli));
    }
  });
});
