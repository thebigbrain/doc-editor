const path = require('path')
const {transform} = require('./transformer')

const cache = new Map()

function parse(id) {
  if (cache.has(id) || !isJsFile(id)) return
  cache.set(id, true)

  console.log(`parsing ${id} ...`)

  let name = id
  if (/^~\//.test(name)) name = name.substr(2)
  let out = path.resolve('./dist', name)
  let result = transform(name)

  let data = {id, deps: result.deps, code: result.code, out}
  debug(data)

  result.deps.forEach(d => {
    if (isProjectJs(d)) {
      parse(d)
    }
  })
}

function isProjectJs(file) {
  return /^~\//.test(file)
}

function isJsFile(file) {
  return !/\.css$/.test(file)
}

function debug(result) {
  // let {id, deps, code, out} = result
  // console.log(out, id)
  // console.log(deps)
}

module.exports = {
  parse
}
