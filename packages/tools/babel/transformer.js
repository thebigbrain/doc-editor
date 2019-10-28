const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const debug = require('../common/debug')

function isJsFile(file) {
  let {ext} = Path.parse(file)
  return !ext || ext === '.js'
}

function padJsPostfix(file) {
  let {ext} = Path.parse(file)
  if (!ext) {
    return `${file}.js`
  }
  return file
}

class Transformer {
  constructor(project) {
    this.prefix = project
    this.deps = []
    this.root = Path.resolve('.')
  }

  readFile(filename) {
    if (filename.startsWith(this.prefix)) filename = Path.join(this.root, filename.replace(this.prefix, ''))
    let file = require.resolve(filename, {paths: [this.root]})
    // debug('read file:', filename, file)
    return fs.readFileSync(file)
  }

  resolve(name) {
    if (name.startsWith('.')) name = Path.join(this.prefix, name)
    if (name.startsWith('~')) name = name.replace('~', this.prefix)
    return name.replace(/\\/g, '/')
  }

  transform(filename) {
    this.deps = []

    filename = this.resolve(filename)
    // debug('enter:', filename)

    let id = filename
    let code = this.readFile(filename)
    let type = 'js'

    if (isJsFile(filename)) {
      let filedir = Path.dirname(filename)
      if (filedir === '.') filedir = filename
      let result = this.transformJs(code, filedir)
      code = result.code
    } else {
      const {ext} = Path.parse(filename)
      type = ext.substr(1)
      code = code.toString()
    }

    return {id, code, deps: this.deps, type}
  }

  transformJs(code, filedir) {
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
            file = Path.join(filedir, file)
          } else if(file.startsWith('~/')) {
            file = this.resolve(file)
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

  isInProject(name) {
    return name.startsWith(this.prefix)
  }
}

module.exports = Transformer
