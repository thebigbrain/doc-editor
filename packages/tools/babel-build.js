const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const filename = process.argv[2]
const out = Path.resolve('./dist', filename)
const root = Path.resolve('.')
let currentPathStack = [Path.resolve(filename)]
let localModules = {}

let code = readJsFile(filename)
let result = transformJs(code)

writeOut(result)

function transformJs(code) {
  let result = babel.transform(code.toString(), {ast: true, code: false, root: Path.resolve(__dirname)})
  traverse(result.ast, {
    enter(path) {
      // console.log(path.node.type)
    },
    CallExpression(path) {
      if (path.node.callee.name === 'require') {
        const args = path.node.arguments
        const file = args[0].value

        if (/^\./i.test(file)) {
          const prev = currentPathStack[currentPathStack.length - 1]
          currentPathStack.push(Path.resolve(prev, '..', file))
          console.log(file)
          args[0].value = processJs()
        }
      }
    }
  })

  return generate(result.ast)
}

function processJs() {
  let resource = currentPathStack.pop()
  resource = require.resolve(resource)
  let id = `local:${Path.relative(root, resource)}`
  let code = readJsFile(resource)
  if (localModules[id] == null) {
    let result = transformJs(code)
    localModules[id] = result.code
  }
  return id
}

function readJsFile(filename) {
  return fs.readFileSync(filename)
}

function writeOut(result) {
  let code = `// load local modules early
  window.__localModules=window.__localModules || {};
Object.assign(window.__localModules, ${JSON.stringify(localModules)})

${result.code}
`
  fs.writeFileSync(out, code, 'utf-8')
}
