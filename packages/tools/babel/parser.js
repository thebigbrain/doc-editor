const path = require('path')
const fs = require('fs')
const Transformer = require('./transformer')
const debug = require('../common/debug')

const skip = (...args) => {
  debug('skip:', ...args)
}

const resolveModules = [
  path.resolve('.'),
]

function isSymLink(filename) {
  let stat = fs.lstatSync(filename)
  return stat.isSymbolicLink()
}

function isRuntimeDeps(filename) {
  return new RegExp('^(core-js|\@babel\/runtime)').test(filename)
    || filename === 'path'
}

class BaseParser {
  constructor(project, cache) {
    this.transformer = new Transformer(project)
    this.cache = cache
    this.skipped = new Set()
  }

  parse(filename) {
    if (this.cache.has(filename)) return

    let result = this.transformer.transform(filename)
    this.cache.set(filename, result)

    // debug(result.deps)

    result.deps.forEach(d => {
      try {
        if (isRuntimeDeps(d)) {
          if (!this.skipped.has(d)) {
            this.skipped.add(d)
            // skip(d)
          }
          return
        }
        this.parse(d)
      } catch(e) {
        debug(result.id, '  ', d, '\t', e.message)
      }
    })
  }
}

class Parser extends BaseParser {

}

module.exports = Parser
