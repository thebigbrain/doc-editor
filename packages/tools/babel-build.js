const fs = require('fs')
const Path = require('path')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const filename = process.argv[2]
const out = filename.replace('src', 'dist')

const sourceBuffer = fs.readFileSync(filename)
let code = sourceBuffer.toString()

let result = babel.transform(code, {ast: true, code: false})

let currentPath = filename
traverse(result.ast, {
  enter(path) {
    // console.log(path.node.type)
  },
  CallExpression(path) {
    if (path.node.callee.name === 'require') {
      const args = path.node.arguments
      const file = args[0].value
      currentPath = Path.resolve(currentPath, '..', file)

      if (/.js$/i.test(file)) {
        processJs(currentPath)
      }

      // if (/.css$/i.test(file)) {
      //   if (/^\./i.test(file)) {
      //     processCss(currentPath)
      //   } else {
      //     console.log(require.resolve(file))
      //   }
      // }
    }
  }
});

result = generate(result.ast)

fs.writeFileSync(out, result.code, 'utf-8')

function processCss(source) {
  const css = fs.readFileSync(source)
  const to = source.replace('src', 'dist')
  postcss([precss, autoprefixer])
    .process(css, { from: source, to })
    .then(result => {
      fs.writeFile(to, result.css, () => true)
      if ( result.map ) {
        fs.writeFile(`${to}.map`, result.map, () => true)
      }
    })
}

function processJs(source) {
  console.log(require.resolve(resource))
}
