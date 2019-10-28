const Path = require('path')
const fs = require('fs')
const Transformer = require('./transformer')
const debug = require('../common/debug')

const skip = (...args) => {
  debug('skip:', ...args)
}

const resolveModules = [
  Path.resolve('.'),
]

function isSymLink(filename) {
  let stat = fs.lstatSync(filename)
  return stat.isSymbolicLink()
}

function isRuntimeDeps(filename) {
  return new RegExp('^(core-js|\@babel\/runtime)').test(filename)
    || filename === 'path'
}

function findPackage(entry) {
  let stats = fs.lstatSync(entry)
  let dir = entry = Path.resolve(entry)

  if (stats.isFile()) {
    dir = Path.dirname(entry)
  }
  let name = Path.resolve(dir, 'package.json')
  while(true) {
    if (fs.existsSync(name)) {
      let pkg = JSON.parse(fs.readFileSync(name).toString('utf-8'))
      let root = Path.resolve(dir)
      return {pkg, root, entry: Path.relative(root, entry)}
    }

    let prev = dir
    dir = Path.dirname(dir)
    if (prev === dir) return null
    name = Path.resolve(dir, 'package.json')
  }
}

function parseProjectInfo(entry) {
  let pkg = findPackage(entry)
  if (pkg == null) throw `Invalid project: ${entry}`
  let {root, pkg: {name}} = pkg

  return {name, root}
}

class BaseParser {
  constructor(entry, cache) {
    this.projectInfo = parseProjectInfo(entry)
    this.transformer = new Transformer(this._moduleName)
    this.cache = cache
    this.skipped = new Set()
  }

  get moduleName() {
    return this.projectInfo.name
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
        if (this.transformer.isInProject(d)) {
          this.parse(d)
        } else {
          debug(d)
        }
      } catch(e) {
        debug(result.id, '  ', d, '\t', e.message)
      }
    })
  }
}

class Parser extends BaseParser {

}

module.exports = {
  Parser
};

(async () => {
  parseProjectInfo('../../icons/lib/icons.js')
})()