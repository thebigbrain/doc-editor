const path = require('path')
const fs = require('fs')
const Transformer = require('./transformer')
const debug = require('../common/debug')

const resolveModules = [
  path.resolve('.'),
]

function isSymLink(filename) {
  let stat = fs.lstatSync(filename)
  return stat.isSymbolicLink()
}

function isRuntimeDeps(filename) {
  return new RegExp('^(core-js|\@babel\/runtime|path)').test(filename)
}

function parseProjectRoot(filename) {
  let dirs = filename.split('/')
  let project = dirs.shift()
  let root = '.'
  while(dirs.length > 0) {
    try {
      debug('project: ', project)
      let resolvedName = require.resolve(project, { paths: resolveModules })
      debug(resolvedName)
      root = path.dirname(resolvedName)
      break
    } catch(e) {
      // debug(e)
    }

    project += '/' + dirs.shift()
  }
  debug(root, project)
  return {root, project}
}

function parseNodeModules(filename, cache) {
  let {project, root} = parseProjectRoot(filename)
  let parser = new BaseParser(project, cache, root)
  parser.parse(filename)
}


class BaseParser {
  constructor(project, cache, root = null) {
    this.transformer = new Transformer(project, root)
    this.cache = cache
  }

  parse(filename) {
    if (this.cache.has(filename)) return

    let result = this.transformer.transform(filename)
    this.cache.set(filename, result)

    result.deps.forEach(d => {
      if (this.transformer.isProjectJs(d)) {
        this.parse(d)
      } else if(this.parseNodeModules) {
        try {
          this.parseNodeModules(d)
        } catch(e) {
          debug(result.id, '  ', d, '\t', e.message)
        }
      }
    })
  }
}

class Parser extends BaseParser {
  parseNodeModules(filename) {
    if (isRuntimeDeps(filename)) return
    parseNodeModules(filename, this.cache)
  }
}

module.exports = Parser
