import JModule from "./jmodule";
import { DependencyCache } from "./dep";

const PlaceHolder = null;

class Isolate {
  depCache = new DependencyCache();

  misses = new Set();

  __require = moduleId => {
    let module = this.depCache.get(moduleId);
    // console.log(module, moduleId);
    return module.exports;
  };

  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  async loadModules(modules = []) {
    this.depCache.init(modules);

    modules.forEach(async m => {
      await this.fetchModule(m);
    });
  }

  getModule(moduleId) {
    if (this.depCache.has(moduleId)) {
      return this.depCache.get(moduleId);
    }

    return PlaceHolder;
  }

  async fetchModule(m) {
    let data = await this.fetcher.fetch(m);
    if (data == null) {
      this.misses.add(m);
      return;
    }
    let mod = new JModule({ ...m, code: data.code, require: this.__require });
    this.depCache.set(mod.id, mod);
    return mod;
  }
}

export default Isolate;
