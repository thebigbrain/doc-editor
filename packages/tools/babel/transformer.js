const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const debug = require('../common/debug')

const ROOT = Path.resolve('.')
const PREFIX = '~/'

function isJsFile(file) {
  let {ext} = Path.parse(file)
  return !ext || ext === '.js'
}

function readFile(filename) {
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
  constructor(project, root = null) {
    this.prefix = `${project}/`
    this.deps = []
    this.root = root || Path.resolve('.')
  }

  resolve(name) {
    if (name.startsWith(this.prefix)) {
      return name.substring(this.prefix.length)
    } else if (name.startsWith(PREFIX)) {
      return name.substring(PREFIX.length)
    }
    return name
  }

  transform(filename) {
    this.deps = []

    filename = this.resolve(filename)
    filename = require.resolve(Path.resolve(this.root, filename))

    let id = this.processJs(filename)
    let code = readFile(filename)
    let type = 'js'

    if (isJsFile(filename)) {
      let result = this.transformJs(code, filename)
      code = result.code
    } else {
      const {ext} = Path.parse(filename)
      type = ext.substr(1)
      code = code.toString()
    }

    return {id, code, deps: this.deps, type}
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
          let file = args[0].value

          if (/^\./i.test(file)) {
            let resource = Path.resolve(currentFile, '..', file)
            file = this.processJs(resource)
          } else if(file.startsWith('~/')) {
            let resource = Path.resolve(this.root, file.substring(2))
            file = this.processJs(resource)
          } else {
            // debug(file)
          }

          this.deps.push(file)
          args[0].value = file
        }
      }
    })

    return generate(result.ast)
  }

  processJs(resource) {
    resource = require.resolve(resource)
    let id = this.processResourceName(resource)
    // debug(id)
    return id
  }

  processResourceName(resource) {
    resource = Path.relative(this.root, resource)
    resource = Path.normalize(resource)
    return `${this.prefix}${resource}`.replace(/\\/g, '/')
  }

  isProjectJs(file) {
    return file.startsWith(PREFIX) || file.startsWith(this.prefix)
  }
}

module.exports = Transformer
