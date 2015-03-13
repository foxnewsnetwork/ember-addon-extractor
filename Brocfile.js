var filterCoffeeScript = require('broccoli-coffee');
var pickFiles = require('broccoli-static-compiler');

var coffeeTree = pickFiles("lib", {
  srcDir: "/",
  destDir: "/"
});

var jsTree = filterCoffeeScript(coffeeTree, {
  bare: true
});

module.exports = jsTree