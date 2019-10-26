const path = require('path')
const fs = require('fs')
const Transformer = require('./transformer')
const debug = require('../common/debug')

function isSymLink(filename) {
  let stat = fs.lstatSync(filename)
  return stat.isSymbolicLink()
}

function isRuntimeDeps(filename) {
  return new RegExp('^(core-js|\@babel\/runtime|path)').test(filename)
}

function parseLerna() {

}

class Parser {
  constructor(project) {
    this.transformer = new Transformer(project)
    this.cache = null

    this.resolveModules = [
      path.resolve('.'),
    ]
  }

  parse(filename, cache = null) {
    if (this.cache == null) {
      this.cache = cache instanceof Map ? cache : new Map()
    }

    if (this.cache.has(filename)) return

    let result = this.transformer.transform(filename)
    this.cache.set(filename, result)
    result.deps.forEach(d => {
      if (this.transformer.isProjectJs(d)) {
        this.parse(d)
      } else {
        this.parseNodeModules(d, result)
      }
    })

    return this.cache
  }

  parseNodeModules(filename, parent) {
    if (isRuntimeDeps(filename)) {
      // debug('skip babel deps:', filename)
      return 
    }
    try {
      filename = require.resolve(filename, { paths: this.resolveModules })
      if (isSymLink(filename)) {
        debug('sym link:', filename)
      }
    } catch(e) {
      debug(parent.id, '  ', filename, '\t', e.message)
    }
  }
}

module.exports = Parser
