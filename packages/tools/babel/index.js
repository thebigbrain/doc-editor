const commander = require('commander')
const path = require('path')

const {Parser} = require('./parser')
const debug = require('../common/debug')
const mongoHandle = require('./mongo-handler')
const {parseFiles} = require('./publish')
const {installMisses} = require('./misses')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-d, --directory <directory>', 'process all files in directory recursively')
  .option('-m, --misses')
  .parse(process.argv)

const filename = program.entry
const directory = program.directory
const misses = program.misses

async function start() {
  const graph = new Map()
  const parser = new Parser(graph)

  debug('parsing ...')

  if (filename) {
    parser.parse(filename)
  } else if (directory) {
    await parseFiles(parser, directory, graph)
  } else if (misses) {
    // graph = await installMisses()
  }

  debug('parsed')

  // console.log(Array.from(graph.values()).map(v => v.id))

  // graph.clear()
  const moduleName = parser.moduleName
  console.log(graph.size)
  if (graph.size > 0) mongoHandle(moduleName, graph)
}

(async () => await start())()
