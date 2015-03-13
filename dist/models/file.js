var File, given;

given = function(string) {
  return {
    consume: function(substr) {
      if (substr.length === 0) {
        return {
          leftOvers: string
        };
      }
      if (string.charAt(0) === substr.charAt(0)) {
        return given(string.substr(1)).consume(substr.substr(1));
      }
      throw new Error("Don't know how to consume '" + substr + "' from '" + string + "'");
    }
  };
};

module.exports = File = (function() {
  function File(arg) {
    this.dir = arg.dir, this.filename = arg.filename, this.type = arg.type;
  }

  File.prototype.relativePath = function() {
    return given(this.filename).consume(this.dir).leftOvers;
  };

  File.prototype.absolutePath = function() {
    return this.filename;
  };

  return File;

})();
