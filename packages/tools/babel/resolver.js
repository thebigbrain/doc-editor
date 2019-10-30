const fs = require('fs')
const Path = require('path')
const {
  NodeJsInputFileSystem,
  CachedInputFileSystem,
  ResolverFactory 
} = require('enhanced-resolve');

const localResolve = require('resolve')

const {existsSync, isDirectory} = require('../common/utils')
const debug = require('../common/debug')
const extensions = ['.js', '.json']
const basedir = Path.resolve('.')

function getResolver(options = {}) {
  return ResolverFactory.createResolver(Object.assign({
    // Typical usage will consume the `NodeJsInputFileSystem` + `CachedInputFileSystem`, which wraps the Node.js `fs` wrapper to add resilience + caching.
    fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000),
    extensions: ['.js', '.json'],
    mainFields: ['browser', 'module', 'main'],
    resolveToContext: true,
    symlinks: false
  }, options));
}


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
  let entry = doResolve(filename, {paths})
  let pkg = findPackage(entry)
  if (pkg == null) throw `Invalid project: ${entry}`
  let {root, pkg: {name}} = pkg

  return {name, root}
}

function pathFilter(pkg, path, relativePath){
  if (!pkg.main && !pkg.browser) {
    return pkg.module
  }
  return relativePath
}

function doResolve(filename, {paths}){
  try {
    return localResolve.sync(filename, {
      basedir,
      paths,
      extensions,
      pathFilter,
      preserveSymlinks: false
    })
  } catch(e) {
    debug(e.message, filename, paths)
    throw e
  }
}

function getPackageName(filename) {
  let pkg = findPackage(filename)
  return pkg && pkg.pkg.name
}

module.exports = {
  resolve: doResolve,
  findPackage,
  parseProjectInfo,
  getPackageName
}
