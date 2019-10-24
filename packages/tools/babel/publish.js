const recursive = require("recursive-readdir");

const debug = require('../common/debug')


function parseFiles(parser, directory) {
  return new Promise((resolve, reject) => {
    recursive(directory, ['*.stories.js', '__index.js', '**/__tests__/**'], (err, files) => {
      if (err) return reject(err)

      let graph = new Map()

      files.forEach(file => {
        parser.parse(file, graph)
      })

      resolve(graph)
    })
  })
}

module.exports = {
  parseFiles
}
