const commander = require('commander')
const Parser = require('./parser')
const mongo = require('../common/mongo')

const debug = require('../common/debug')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .option('-d, --directory <directory>', 'process all files in directory recursively')
  .parse(process.argv)

const filename = program.entry
const directory = program.directory
const moduleName = program.name
const parser = new Parser(moduleName)

debug('parsing ...')
const graph = parser.parse(filename)
debug('parsed')

async function handleAll(db) {
  await insertModules(db, graph)
  await queryModules(db, graph)
  await insertProject(db, graph)
}

async function insertProject(db, graph) {
  const c = db.collection('projects')
  try {
    const query = {name: moduleName}
    const newValues = {$set: {
      name: moduleName,
      entry: filename,
      graph: Array.from(graph.values()).map(v => ({id: v.id, deps: v.deps})),
    }}
    const r = await c.updateOne(query, newValues, {upsert: true})
    console.log(`project inserted`)
  } catch (e) {
    console.error(e)
  }
}

function insertModules(db, graph) {
  const c = db.collection('modules')

    let promises = Array.from(graph.values()).map(async v => {
      if (!v.id.startsWith(moduleName) && v.id !== '.') v.id = '.'
      v.project = moduleName
      const query = {id: v.id, project: v.project}
      const newValues = {$set: v}
      await c.updateOne(query, newValues, {upsert: true})
    })

    return Promise.all(promises).catch(console.error)
}

async function queryModules(db, graph) {
  const c = db.collection('modules')
  const result = await c.find().toArray()
  console.log(result.length, graph.size)
}

mongo().then(async client => {
  const db = client.db('doc-editor')
  try {
    await handleAll(db)
  } catch(e) {
    console.error(e)
  }
  client.close()
})
