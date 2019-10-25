import { DependencyCache } from "./dep";

class Isolate {
  constructor(fetcher, options) {
    this.depCache = new DependencyCache(fetcher, options);
  }

  loadModules(...modules) {
    this.depCache.init(modules);
  }
}

export default Isolate;
