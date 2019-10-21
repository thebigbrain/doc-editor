const fs = require('fs')
const path = require('path')
const {transform} = require('./transformer')
const debug = require('../common/debug')

const paths = [
  path.resolve('.')
]

function handleDeps(graph) {
  Array.from(graph.values()).forEach(v => {
    const deps = v.deps || []
    deps.forEach(async d => {
      if(!/^~\//.test(d) && !/\.css/.test(d)) {
        let result = transform(require.resolve(d, {paths}), true)
        debug(d, result.deps)
      } else {
        debug(`not processed: ${d}`)
      }
    })
  })
}

module.exports = {
  handle: handleDeps
}