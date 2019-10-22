import Isolate from './isolate';

class Fetcher {
  constructor(project) {
    this.project = project;
  }

  async fetch(m) {
    let r = await doFetch({ project: this.project, id: m.id }, "modules");
    return r.data[0];
  }
}

(async function main() {
  let iso = new Isolate(new Fetcher('@csb/app'));

  const modules = window.__COMPONENTS_REPO_COMPONENTS_DEPENDENCY_GRAPH || [];

  await iso.loadModules(modules);
})();
