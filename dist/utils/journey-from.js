var RSVP, fs, journeyFrom;

fs = require('fs-extra');

RSVP = require('rsvp');

module.exports = journeyFrom = function(homePath) {
  return {
    to: function(targetPath) {
      return {
        whenIGetThere: function(success) {
          return {
            ifIShouldFail: function(failure) {
              return new RSVP.Promise(function(resolve, reject) {
                return fs.copy(home, destiny, function(err) {
                  if (typeof error !== "undefined" && error !== null) {
                    return reject(failure(err));
                  }
                  return resolve(success(targetPath));
                });
              });
            }
          };
        }
      };
    }
  };
};
