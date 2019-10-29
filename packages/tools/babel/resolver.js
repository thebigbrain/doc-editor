const fs = require('fs')
const Path = require('path')

const {existsSync, isDirectory} = require('../common/utils')
const debug = require('../common/debug')
const extensions = ['.js']

function findPackage(entry) {
  let stats = fs.lstatSync(entry)
  let dir = entry = Path.resolve(entry)

  if (stats.isFile()) {
    dir = Path.dirname(entry)
  }
  let name = Path.resolve(dir, 'package.json')
  while(true) {
    if (fs.existsSync(name)) {
      let pkg = JSON.parse(fs.readFileSync(name).toString('utf-8'))
      let root = Path.resolve(dir)
      return {pkg, root}
    }

    let prev = dir
    dir = Path.dirname(dir)
    if (prev === dir) return null
    name = Path.resolve(dir, 'package.json')
  }
}

function parseProjectInfo(filename, paths) {
  let entry = resolve(filename, {paths})
  let pkg = findPackage(entry)
  if (pkg == null) throw `Invalid project: ${entry}`
  let {root, pkg: {name}} = pkg

  // debug(Path.normalize(entry.replace(root, name)).replace(/\\/g, '/'))
  return {name, root, entry: entry.replace(root, name).replace(/\\/g, '/')}
}

function resolve(filename, {paths}){
  let name = null
  for (let p of paths) {
    name = existsSync(Path.resolve(p, 'node_modules', filename), extensions)
    if(name) break
  }

  if (name && isDirectory(name)) {
    let pkg = findPackage(name)
    if (pkg && pkg.pkg.browser) {
      let {name: project, browser, main} = pkg.pkg
      if (typeof browser === 'string') {
        return require.resolve(Path.resolve(name, browser))
      } else {
        let k = Object.keys(browser).filter(v => v.endsWith(main))
        if (k.length > 0) {
          return require.resolve(Path.resolve(name, browser[k[0]]))
        } else {
          // debug(name, main, k, filename)
        }
      }
    }
  }

  return require.resolve(filename, {paths})
}

function getPackageName(filename) {
  let pkg = findPackage(filename)
  return pkg && pkg.pkg.name
}

module.exports = {
  resolve,
  findPackage,
  parseProjectInfo,
  getPackageName
}
