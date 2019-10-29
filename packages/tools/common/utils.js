const fs = require('fs')
const builtin = require('module').builtinModules

function existsSync(filename, extensions) {
  extensions.unshift('')
  for (let ext of extensions) {
    if (fs.existsSync(`${filename}${ext}`)) return `${filename}${ext}`
  }
  return null
}

function isSymLink(filename) {
  let stat = fs.lstatSync(filename)
  return stat.isSymbolicLink()
}

function isDirectory(filename) {
  let stat = fs.lstatSync(filename)
  return stat.isDirectory()
}

function isRuntimeDeps(filename) {
  return new RegExp('^(core-js|\@babel\/runtime)').test(filename)
    || builtin.includes(filename)
}

module.exports = {
  existsSync,
  isSymLink,
  isRuntimeDeps,
  isDirectory
}
