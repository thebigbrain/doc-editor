const Path = require('path');

const Transformer = require('./transformer');
const debug = require('../common/debug');
const { parseProjectInfo, getPackageName } = require('./resolver');
const { isRuntimeDeps } = require('../common/utils');

const resolvedPaths = Path.resolve('.');

class Parser {
  constructor(cache, modulePaths = [resolvedPaths]) {
    this.paths = modulePaths;
    this.cache = cache;
    this.skipped = new Set();

    this.pendingNodeModules = new Set();
  }

  get moduleName() {
    return this.transformer.prefix;
  }

  preParse(filename) {
    const { name, root } = parseProjectInfo(filename, this.paths);
    this.transformer = new Transformer(name, root, this.paths);
    if (!filename || filename.startsWith('.')) {
      return Path.join(name, filename).replace(/\\/g, '/');
    } else {
      return filename;
    }
  }

  parse(filename) {
    filename = this.preParse(filename);
    this.doParse(filename);
    this.parseNodeModules();
  }

  doParse(filename) {
    if (this.cache.has(filename)) return null;

    let result = this.transformer.transform(filename);
    this.cache.set(filename, result);
    // debug(result.deps)
    if (result.deps && result.deps.length > 0) this.parseDeps(result);
  }

  parseDeps(result) {
    result.deps.forEach(d => {
      if (this.cache.has(d)) return;

      try {
        if (this.transformer.isInProject(d)) {
          this.parseProjectDeps(d);
        } else {
          if (isRuntimeDeps(d)) {
            if (!this.skipped.has(d)) {
              this.skipped.add(d);
            }
            return;
          }

          if (!this.pendingNodeModules.has(d)) {
            this.pendingNodeModules.add(d);
          }
        }
      } catch (e) {
        debug(result.id, '  ', d, '\t', e.message);
      }
    });
  }

  parseProjectDeps(filename) {
    this.doParse(filename);
  }

  parseNodeModules() {
    let modules = Array.from(this.pendingNodeModules);
    this.pendingNodeModules.clear();

    modules.forEach(v => {
      let modulePaths = [].concat(this.paths);
      let parser = new Parser(this.cache, modulePaths);
      const { name, root } = parseProjectInfo(v, modulePaths);
      if (!modulePaths.includes(root)) modulePaths.push(root, Path.join(root, 'node_modules'));
      debug(v);
      parser.transformer = new Transformer(name, root, modulePaths);
      parser.doParse(v);
      parser.parseNodeModules();
    });
  }
}


module.exports = {
  Parser,
};
