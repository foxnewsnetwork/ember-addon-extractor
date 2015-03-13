RSVP = require 'rsvp'
flatten = require "lodash-node/modern/array/flatten"
findup = require 'findup'
glob = require 'glob'
path = require 'path'
File = require '../models/file'

makeForType = (dir, type) -> 
  (filename) -> 
    new File dir: dir, filename: filename, type: type

module.exports = class Project
  @closest = (dir) ->
    new Project findup dir, 'package.json'

  constructor: (@dirPromise) ->

  filesRelevantTo: (name) ->
    RSVP
    .all [@appFiles(name), @serverFiles(name), @testFiles(name)]
    .then flatten

  appFiles: (name) ->
    @dirPromise
    .then (dir) ->
      glob.sync path.join(dir, "app", "**/#{name}.*")
    .then (fileNames) -> map fileNames, makeForType(dir, "app")

  serverFiles: (name) ->
    @dirPromise
    .then (dir) ->
      glob.sync path.join(dir, "server", "**/#{name}.*")
    .then (fileNames) -> map fileNames, makeForType(dir, "server")

  testFiles: (name) ->
    @dirPromise
    .then (dir) ->
      glob.sync path.join(dir, "tests", "unit", "**/#{name}.*")
    .then (fileNames) -> map fileNames, makeForType(dir, "test")

