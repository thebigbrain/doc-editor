const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')

function writeLocals(moduleName, localModules) {
  const prefix = `local@${moduleName}`

  return `// load local modules early
window.__localModules = window.__localModules || {};
window.__localModules['${prefix}'] = window.__localModules['${prefix}'] || {}
Object.assign(
  window.__localModules['${prefix}'],
  ${JSON.stringify(localModules)}
)
`
}

function writeOut(out, result) {
  let code = `${result.code}`
  mkdirp.sync(path.dirname(out))
  fs.writeFileSync(out, code, 'utf-8')
}

module.exports = {
  writeOut,
  writeLocals
}
