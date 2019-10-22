const Transformer = require('./transformer')

class Parser {
  constructor(project) {
    this.transformer = new Transformer(project)
    this.cache = new Map()
  }

  parse(id) {
    if (this.cache.has(id) || !isJsFile(id)) return
    
    let result = this.transformer.transform(id)
    let data = {id, deps: result.deps, code: result.code}
  
    this.cache.set(id, data)
  
    result.deps.forEach(d => {
      if (isProjectJs(d)) {
        this.parse(d)
      }
    })
  
    return this.cache
  }
}

function isProjectJs(file) {
  return /^~\//.test(file)
}

function isJsFile(file) {
  return !/\.css$/.test(file)
}

module.exports = Parser
