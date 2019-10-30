const Path = require('path')

const Transformer = require('./transformer')
const debug = require('../common/debug')
const { parseProjectInfo, getPackageName } = require('./resolver')
const { isRuntimeDeps } = require('../common/utils')

const resolvedPaths = Path.resolve('.')

class Parser {
  constructor(filename, cache, modulePaths = [resolvedPaths]) {
    this.filename = filename
    this.paths = modulePaths
    this.cache = cache
    this.skipped = new Set()
  }

  get moduleName() {
    return this.name
  }

  async preParse() {
    const { name, root, entry } = await parseProjectInfo(this.filename, this.paths)
    this.transformer = new Transformer(name, root, this.paths)
    this.name = name
    return entry
  }

  async parse() {
    let filename = await this.preParse()
    await this.doParse(filename)
  }

  async doParse(filename) {
    if (this.cache.has(filename)) return null

    let result = await this.transformer.transform(filename)
    this.cache.set(filename, result)
    // debug(result.deps)
    if (result.deps && result.deps.length > 0) await this.parseDeps(result)
  }

  parseDeps(result) {
    let promises = result.deps.map(async d => {
      if (this.cache.has(d)) return

      try {
        if (this.transformer.isInProject(d)) {
          this.parseProjectDeps(d)
        } else {
          if (this.parseNodeModules) await this.parseNodeModules(d)
        }
      } catch (e) {
        debug(result.id, '  ', d, '\t', e.message)
      }
    })

    return Promise.all(promises)
  }

  parseProjectDeps(filename) {
    this.doParse(filename)
  }

  async parseNodeModules(filename) {
    if (isRuntimeDeps(filename)) {
      if (!this.skipped.has(filename)) {
        this.skipped.add(filename)
      }
      return
    }

    let parser = new Parser(filename, this.cache, [].concat(this.paths))
    await parser.parse()
  }
}


module.exports = {
  Parser,
};