const commander = require('commander')
const path = require('path')

const Parser = require('./parser')
const debug = require('../common/debug')
const mongoHandle = require('./mongo-handler')
const {parseFiles} = require('./publish')
const {installMisses} = require('./misses')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .option('-d, --directory <directory>', 'process all files in directory recursively')
  .option('-m, --misses')
  .parse(process.argv)

const filename = program.entry
const moduleName = program.name
const directory = program.directory
const misses = program.misses

async function start() {
  const parser = new Parser(moduleName)

  debug('parsing ...')
  let graph = null

  if (filename) {
    graph = parser.parse(filename)
  } else if (directory) {
    graph = await parseFiles(parser, directory)
  } else if (misses) {
    // graph = await installMisses()
  }

  debug('parsed')

  graph = null

  mongoHandle(moduleName, graph)
}

(async () => await start())()
