const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const {resolve} = require('./resolver')
const debug = require('../common/debug')

const babelTransformOption = {
  ast: true,
  code: false,
  root: Path.resolve(__dirname)
}

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
  constructor(name, root, modulePaths = []) {
    this.prefix = name
    this.deps = []
    this.root = root
    if (!modulePaths.includes(root)) modulePaths.push(root)
    this.modulePaths = modulePaths
  }

  resolve(filename) {
    if (filename === this.prefix || filename.startsWith(this.prefix + '/')) {
      filename = Path.resolve(this.root, filename.replace(this.prefix, '.'))
    }
    return resolve(filename, {paths: this.modulePaths})
  }

  transform(id) {
    this.deps = []

    let filename = this.resolve(id)
    let code = fs.readFileSync(filename)
    let type = 'js'

    if (isJsFile(filename)) {
      let result = this.transformJs(code, filename)
      code = result.code
    } else {
      const {ext} = Path.parse(filename)
      type = ext.substr(1)
      code = code.toString()
    }

    return {id, code, deps: this.deps, type, project: this.prefix}
  }

  transformJs(code, filename) {
    let result = babel.transform(code.toString(), babelTransformOption)
    traverse(result.ast, {
      enter: (path) => {
        // console.log(path.node.type)
      },
      CallExpression: (path) => {
        if (path.node.callee.name === 'require') {
          const args = path.node.arguments
          let file = args[0].value

          if (/^\./i.test(file)) {
            file = Path.resolve(Path.dirname(filename), file).replace(this.root, this.prefix).replace(/\\/g, '/')
          } else if(file.startsWith('~/')) {
            file = file.replace('~', this.prefix).replace(/\\/g, '/')
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
