const fs = require('fs')
const Path = require('path')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const mkdirp = require('mkdirp')
const commander = require('commander')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .parse(process.argv)

const filename = program.entry
const moduleName = program.name
const prefix = '~/'/*`local@${moduleName}`*/
const out = Path.resolve('./dist', filename)
const root = Path.resolve('.')
console.log(root)
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
          let resource = Path.resolve(prev, '..', file)
          currentPathStack.push(resource)
          args[0].value = processJs()
        } else {
          console.log(file)
        }
      }
    }
  })

  return generate(result.ast)
}

function processJs() {
  let resource = currentPathStack.pop()
  resource = require.resolve(resource)
  resource = Path.relative(root, resource)
  let id = `${prefix}${resource}`
  console.log(id)
  // let code = readJsFile(resource)
  // if (localModules[id] == null) {
  //   let result = transformJs(code)
  //   localModules[id] = result.code
  // }
  return id
}

function readJsFile(filename) {
  return fs.readFileSync(filename)
}

function writeLocals() {
  return `// load local modules early
window.__localModules = window.__localModules || {};
window.__localModules['${prefix}'] = window.__localModules['${prefix}'] || {}
Object.assign(
  window.__localModules['${prefix}'],
  ${JSON.stringify(localModules)}
)
`
}

function writeOut(result) {
  let code = `${result.code}`
  mkdirp.sync(Path.dirname(out))
  fs.writeFileSync(out, code, 'utf-8')
}
