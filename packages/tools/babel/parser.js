const path = require('path')
const Transformer = require('./transformer')

class Parser {
  constructor(project) {
    this.prefix = `${project}/`
    this.transformer = new Transformer(this.prefix)
    this.cache = new Map()
  }

  parse(id) {
    if (this.cache.has(id) || !isJsFile(id)) return
    
    let result = this.transformer.transform(id)
    let data = {id, deps: result.deps, code: result.code}
  
    this.cache.set(id, data)
  
    result.deps.forEach(d => {
      if (this.isProjectJs(d)) {
        this.parse(d)
      }
    })
  
    return this.cache
  }

  isProjectJs(file) {
    return /^~\//.test(file) || file.startsWith(this.prefix)
  }
}

function isJsFile(file) {
  let {ext} = path.parse(file)
  return !ext || ext === '.js'
}

module.exports = Parser
