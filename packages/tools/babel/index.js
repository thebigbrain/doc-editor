const commander = require('commander')
const {parse} = require('./parser')
const mongo = require('../common/mongo')

const debug = require('../common/debug')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .parse(process.argv)

const filename = program.entry
const moduleName = program.name

debug('parsing ...')
const graph = parse(filename)
debug('parsed')


async function handleAll(db) {
  // await insertModules(db, graph)
  // await queryModules(db, graph)
  await insertProject(db, graph)
}

async function insertProject(db, graph) {
  const c = db.collection('projects')
  try {
    let deps = new Set()
    for (let v of graph.values()) {
      v.deps.forEach(d => {
        deps.add(d)
      })
    }

    const r = await c.insertOne({
      name: moduleName,
      entry: filename,
      deps: Array.from(deps)
    })
    console.log(`project inserted`)
  } catch (e) {
    console.error(e)
  }
}

function fix(v, name = '') {
  let id = v.id
  if (name && (/^~\//.test(id) || id === filename)) v.project =  name
  delete v.out
  return v
}

async function insertModules(db, graph) {
  const c = db.collection('modules')
  try {
    const r = await c.insertMany(Array.from(graph.values()).map(v => fix(v, moduleName)))
    console.log(`Number of documents inserted: ${r.insertedCount}, total ${graph.size}`)
  } catch (e) {
    console.error(e)
  }
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