const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const debug = require('../common/debug')

// let currentPathStack = []
let deps = []
const root = Path.resolve('.')
const prefix = '~/'

exports.transform = (filename, resolved = false) => {
  // currentPathStack = [Path.resolve(filename)]
  deps = []

  filename = resolved ? filename : require.resolve(Path.resolve(root, filename))

  let code = readJsFile(filename)
  let result = transformJs(code, filename)

  return {
    code: result.code,
    deps
  }
}

function transformJs(code, currentFile) {
  let result = babel.transform(code.toString(), {
    ast: true, 
    code: false, 
    root: Path.resolve(__dirname)
  })
  traverse(result.ast, {
    enter(path) {
      // console.log(path.node.type)
    },
    CallExpression(path) {
      if (path.node.callee.name === 'require') {
        const args = path.node.arguments
        const file = args[0].value

        if (/^\./i.test(file)) {
          // const prev = currentPathStack[currentPathStack.length - 1]
          // let resource = Path.resolve(prev, '..', file)
          // currentPathStack.push(resource)
          let resource = Path.resolve(currentFile, '..', file)
          args[0].value = processJs(resource)
        } else {
          deps.push(file)
        }
      }
    }
  })

  return generate(result.ast)
}

function processJs(resource) {
  resource = require.resolve(resource)
  resource = Path.relative(root, resource)
  resource = Path.normalize(resource)
  debug(`${prefix}${resource}`.replace(/\\/g, '/'))
  let id = padJsPostfix(`${prefix}${resource}`.replace(/\\/g, '/'))
  deps.push(id)
  return id
}

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
