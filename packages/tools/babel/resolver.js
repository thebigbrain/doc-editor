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
const extensions = ['.js']
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

async function parseProjectInfo(filename, paths) {
  let entry = await doResolve(filename, {paths})
  let pkg = findPackage(entry)
  if (pkg == null) throw `Invalid project: ${entry}`
  let {root, pkg: {name}} = pkg

  if (!paths.includes(root)) paths.push(root)

  // debug(Path.normalize(entry.replace(root, name)).replace(/\\/g, '/'))
  return {name, root, entry: entry.replace(root, name).replace(/\\/g, '/')}
}

function pathFilter(pkg, path, relativePath){
  if (pkg.browser) {
    // debug(path, relativePath)
  }
  return relativePath
}

function doResolve(filename, {paths}){
  const resolveOptions = {
    basedir,
    paths,
    extensions,
    pathFilter,
  }
  return new Promise((resolve, reject) => {
    localResolve(filename, resolveOptions, (err, filepath) => {
      if (err) reject(err)
      else resolve(filepath)
    })
  })

  // let name = null
  // for (let p of paths) {
  //   name = existsSync(Path.resolve(p, 'node_modules', filename), extensions)
  //   if(name) break
  // }

  // if (name && isDirectory(name)) {
  //   let pkg = findPackage(name)
  //   if (pkg && pkg.pkg.browser) {
  //     let {name: project, browser, main, module: pkgModule} = pkg.pkg
  //     if (typeof browser === 'string') {
  //       return require.resolve(Path.resolve(name, browser))
  //     } else {
  //       let k = Object.keys(browser).filter(v => v.endsWith(main))
  //       if (k.length > 0) {
  //         return require.resolve(Path.resolve(name, browser[k[0]]))
  //       } else if(pkgModule) {
  //         // debug(name, main, k, filename)
  //       }
  //     }
  //   }
  // }

  // return require.resolve(filename, {paths})
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
