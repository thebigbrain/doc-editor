const path = require('path')
const {transform} = require('./transformer')


function parse(id, cache = new Map()) {
  if (cache.has(id) || !isJsFile(id)) return

  // console.log(`parsing ${id} ...`)

  let name = id
  if (/^~\//.test(name)) name = name.substr(2)
  let out = path.resolve('./dist', name)
  let result = transform(name)

  let data = {id, deps: result.deps, code: result.code, out}
  debug(data)

  cache.set(id, data)

  result.deps.forEach(d => {
    if (isProjectJs(d)) {
      parse(d, cache)
    }
  })

  return cache
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
