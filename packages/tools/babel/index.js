const commander = require('commander')
const {parse} = require('./parser')

const program = new commander.Command()
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]')
  .option('-e, --entry <entry>', 'entry file')
  .option('-n, --name <name>', 'module name')
  .parse(process.argv)

const filename = program.entry
const moduleName = program.name

parse(filename)
