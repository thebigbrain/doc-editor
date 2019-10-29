const Path = require('path')

const Transformer = require('./transformer')
const debug = require('../common/debug')
const { parseProjectInfo, getPackageName } = require('./resolver')
const { isRuntimeDeps } = require('../common/utils')

class Parser {
  constructor(filename, cache, modulePaths = []) {
    const { name, root, entry } = parseProjectInfo(filename, [Path.resolve('.')])
    modulePaths.push(root)
    this.transformer = new Transformer(name, root, modulePaths)
    this.cache = cache
    this.skipped = new Set()

    this.name = name
    this.entry = entry
    this.root = root
  }

  get moduleName() {
    return this.name
  }

  parse() {
    let filename = this.entry
    this.doParse(filename)
  }

  doParse(filename) {
    if (this.cache.has(filename)) return null

    let result = this.transformer.transform(filename)
    this.cache.set(filename, result)
    // debug(result.deps)
    if (result.deps && result.deps.length > 0) this.parseDeps(result)
  }

  parseDeps(result) {
    result.deps.forEach(d => {
      if (this.cache.has(d)) return

      try {
        if (this.transformer.isInProject(d)) {
          this.parseProjectDeps(d)
        } else {
          if (this.parseNodeModules) this.parseNodeModules(d, result.id)
        }
      } catch (e) {
        debug(result.id, '  ', d, '\t', e.message)
      }
    })
  }

  parseProjectDeps(filename) {
    this.doParse(filename)
  }

  parseNodeModules(filename, parent) {
    if (isRuntimeDeps(filename)) {
      if (!this.skipped.has(filename)) {
        this.skipped.add(filename)
      }
      return
    }

    // if (parent.startsWith(this.name)) debug(parent, this.root)

    let parser = new Parser(filename, this.cache, [Path.resolve('.'), this.root])
    parser.parse()
  }
}


module.exports = {
  Parser,
};

// (async () => {
//   let filename = 'react'
//   filename = require.resolve('@csb/common/lib/version.js', {paths: [Path.resolve('../../../projects/codesandbox-app')]})
//   debug(filename)
//   debug(require('module').builtinModules)
// })()
