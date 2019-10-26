const { spawn } = require('child_process');
const mongo = require('../common/mongo')
const Parser = require('./parser')
const debug = require('../common/debug')

function getModuleName(filename) {
  if (filename.startsWith('core-js')) return 'core-js'
  if (filename.startsWith('@babel/runtime')) return '@babel/runtime'

  return filename
}

function install(filename) {
  return new Promise((resolve) => {
    const npmInstall = spawn('npm', ['install', filename])

    npmInstall.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(code)
    })
  })
}

async function installMisses() {
  let graph = new Map()
  let client = await mongo()
  const db = client.db('doc-editor')
  const c = db.collection('misses')
  let deps = await c.find({}).toArray()
  client.close()

  for (let d of deps) {
    await install(d.id)
    if (code) continue
    const parser = new Parser(getModuleName(d.id), graph)
    parser.parse(d.id)
  }

  return null
}

module.exports = {
  installMisses
}