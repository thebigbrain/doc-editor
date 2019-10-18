const commander = require('commander')
const {parse} = require('./parser')
const mongo = require('../common/mongo')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .parse(process.argv)

const filename = program.entry
const moduleName = program.name

const graph = parse(filename)

mongo().then(async client => {
  const db = client.db('jModule')

  // await insertModules(db, graph)
  // await queryModules(db, graph)

  client.close()
})

async function insertModules(db, graph) {
  const c = db.collection('modules')
  try {
    const r = await c.insertMany(Array.from(graph.values()))
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
