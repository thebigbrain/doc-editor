const Transformer = require('./transformer')

class Parser {
  constructor(project) {
    this.transformer = new Transformer(project)
    this.cache = null
  }

  parse(filename, cache = null) {
    if (this.cache == null) {
      this.cache = cache instanceof Map ? cache : new Map()
    }

    if (this.cache.has(filename)) return

    let result = this.transformer.transform(filename)

    this.cache.set(filename, result)

    result.deps.forEach(d => {
      if (this.transformer.isProjectJs(d)) {
        this.parse(d)
      }
    })

    return this.cache
  }
}

module.exports = Parser
