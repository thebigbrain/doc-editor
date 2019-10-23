const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const debug = require('../common/debug')

const ROOT = Path.resolve('.')
const PREFIX = '~/'

function readJsFile(filename) {
  return fs.readFileSync(filename)
}

function padJsPostfix(file) {
  let {ext} = Path.parse(file)
  if (!ext) {
    return `${file}.js`
  }
  return file
}

class Transformer {
  constructor(prefix) {
    this.prefix = prefix
    this.deps = []
  }

  resolve(name) {
    if (name.startsWith(this.prefix)) {
      return name.substring(this.prefix.length)
    } else if (name.startsWith(PREFIX)) {
      return name.substring(PREFIX.length)
    }
    return name
  }

  transform(filename, resolved = false) {
    this.deps = []
  
    filename = this.resolve(filename)
    filename = resolved ? filename : require.resolve(Path.resolve(ROOT, filename))
  
    let code = readJsFile(filename)
    let result = this.transformJs(code, filename)
  
    return {
      code: result.code,
      deps: this.deps
    }
  }

  transformJs(code, currentFile) {
    let result = babel.transform(code.toString(), {
      ast: true, 
      code: false, 
      root: Path.resolve(__dirname)
    })
    traverse(result.ast, {
      enter: (path) => {
        // console.log(path.node.type)
      },
      CallExpression: (path) => {
        if (path.node.callee.name === 'require') {
          const args = path.node.arguments
          const file = args[0].value
  
          if (/^\./i.test(file)) {
            let resource = Path.resolve(currentFile, '..', file)
            args[0].value = this.processJs(resource)
          } else if(file.startsWith('~/')) {
            let resource = Path.resolve(ROOT, file.substring(2))
            args[0].value = this.processJs(resource)
          } else {
            this.deps.push(file)
          }
        }
      }
    })
  
    return generate(result.ast)
  }

  processJs(resource) {
    resource = require.resolve(resource)
    resource = Path.relative(ROOT, resource)
    resource = Path.normalize(resource)
    debug(`${this.prefix}${resource}`.replace(/\\/g, '/'))
    let id = padJsPostfix(`${this.prefix}${resource}`.replace(/\\/g, '/'))
    this.deps.push(id)
    return id
  }
}

module.exports = Transformer