given = (string) ->
  consume: (substr) ->
    return leftOvers: string if substr.length is 0
    return given(string.substr 1).consume(substr.substr 1) if string.charAt(0) is substr.charAt(0)
    throw new Error("Don't know how to consume '#{substr}' from '#{string}'")

module.exports = class File
  constructor: (dir: @dir, filename: @filename, type: @type) -> 

  relativePath: ->
    given(@filename).consume(@dir).leftOvers
  absolutePath: -> @filename