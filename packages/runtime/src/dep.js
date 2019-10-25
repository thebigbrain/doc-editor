import EventEmitter from "./event-emitter";
import JModule from "./jmodule";

const emitter = new EventEmitter();

const ModuleStatus = {
  LOADED: "module.loaded",
  INITIALIZED: "module.initialized"
};

const FetchError = {
  NOT_FOUND: "not found",
  SKIP: "skip",
  NET_ERROR: "network error",
  OK: "ok"
};

class DependencyNode {
  constructor(id, deps = []) {
    this.id = id;
    this.deps = deps;
    this.status = ModuleStatus.LOADED;
    this.parents = new Set();
  }

  hasInitialized() {
    return this.status === ModuleStatus.INITIALIZED;
  }

  hasDeps() {
    return this.deps && this.deps.length > 0;
  }
}

export class DependencyCache {
  __require = moduleId => {
    let module = this.get(moduleId);
    // console.log(module, moduleId);
    return module.exports;
  };

  handleDepInitialized = id => {
    let dep = this.depGraph.get(id);
    if (dep == null) throw new Error(`Invalid dep: ${dep.id}`);

    dep.parents.forEach(p => {
      this.tryInstantiate(p);
    });
  };

  constructor(fetcher, options = {}) {
    this.fetcher = fetcher;
    this.options = options;
    this.cache = new Map();
    this.depGraph = new Map();
    this.misses = new Set();
  }

  init(modules = []) {
    emitter.addListener(ModuleStatus.INITIALIZED, this.handleDepInitialized);

    modules.forEach(async mod => {
      await this.hotModuleReload(mod);
    });
  }

  tryInstantiate(mod) {
    if (!mod.deps || !mod.deps.length) {
      this.instantiateModule(mod);
      return;
    }

    let uninitialized = mod.deps.length;
    mod.deps.forEach(dep => {
      if (dep.status === ModuleStatus.INITIALIZED) uninitialized--;
    });

    if (!uninitialized) {
      this.instantiateModule(mod);
    }
  }

  instantiateModule(mod) {
    if (!mod.type || mod.type === "js") {
      let m = new JModule({ ...mod, require: this.__require });
      m.instantiate();
      emitter.emit(ModuleStatus.INITIALIZED, mod.id);
    } else {
      console.info("Not Supported:", mod.id);
      return;
    }
  }

  async fetch(id) {
    if (this.__fetchings == null) this.__fetchings = new Set();
    if (this.__fetchings.has(id)) return { err: FetchError.SKIP };
    this.__fetchings.add(id);
    let r = null;
    let err = FetchError.OK;
    try {
      r = await this.fetcher.fetch(id);
      if (r == null) err = FetchError.NOT_FOUND;
    } catch (e) {
      console.error(e);
      err = FetchError.NET_ERROR;
    }
    this.__fetchings.delete(id);
    return { err, data: r };
  }

  hasLoaded(mod) {
    return this.cache.has(mod.id) || this.misses.has(mod.id);
  }

  async tryFindModule(id) {
    let r = await this.fetch(id);
    if (r.err === FetchError.OK) return r.data;

    if (r.err === FetchError.NOT_FOUND) {
      this.misses.add(id);
      if (this.options.onMiss) this.options.onMiss(id);
    }
    return null;
  }

  addDepgraphAndInstantiateModule(mod) {
    if (this.depGraph.has(mod.id)) {
      throw new Error(`Parellel Loaded Module: ${mod.id}`);
    }

    let dep = new DependencyNode(mod.id, mod.deps);
    this.depGraph.set(dep.id, dep);
    if (!dep.hasDeps()) {
      this.instantiateModule(mod);
      return true;
    }
    return dep.hasInitialized();
  }

  async hotModuleReload(mod) {
    if (this.hasLoaded(mod)) return;

    mod = await this.tryFindModule(mod.id);
    if (mod == null) return;

    if (this.hasLoaded(mod)) return;
    this.cache.set(mod.id, mod);

    if (this.addDepgraphAndInstantiateModule(mod)) return;

    let uninitialized = mod.deps.length;
    mod.deps.forEach(async id => {
      if (!this.hasLoaded(id)) {
        await this.hotModuleReload({ id });
      } else {
        let dep = this.depGraph.get(id);
        if (dep.status === ModuleStatus.INITIALIZED) {
          uninitialized--;
        } else {
          dep.parents.add(mod);
        }
      }
    });

    if (!uninitialized) {
      this.instantiateModule(mod);
    }
  }
}
