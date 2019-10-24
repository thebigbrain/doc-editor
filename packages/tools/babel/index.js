const commander = require('commander')
const path = require('path')

const Parser = require('./parser')
const debug = require('../common/debug')
const mongoHandle = require('./mongo-handler')
const {parseFiles} = require('./publish')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .option('-d, --directory <directory>', 'process all files in directory recursively')
  .parse(process.argv)

const filename = program.entry
const moduleName = program.name
const directory = program.directory


async function start() {
  const parser = new Parser(moduleName)

  debug('parsing ...')
  let graph = filename && parser.parse(filename)
  if (graph == null) {
    graph = await parseFiles(parser, directory)
    // debug(Array.from(graph.keys()))
  }
  debug('parsed')

  // graph = null

  mongoHandle(moduleName, graph)
}

(async () => await start())()
