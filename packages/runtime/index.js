import Isolate from "./src/isolate";

async function doFetch(params, cls) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const r = await window.fetch(
    `http://localhost:3030/${cls}${utils.urlSearchStringify(params)}`,
    {
      headers
    }
  );
  return await r.json();
}

async function fetchProject(name) {
  let res = await doFetch({ name }, "projects");
  return res.data[0];
}

class Fetcher {
  constructor(project) {
    this.project = project;
  }

  async fetch(id, project = null) {
    let query = { id };
    if (project != null) query.project = project;
    let r = await doFetch(query, "modules");
    return r.data[0];
  }
}

function onMiss(id) {
  console.log(id)
}

(async function main() {
  const name = "@csb/app";
  let iso = new Isolate(new Fetcher(name), { onMiss });
  let p = await fetchProject(name);
  iso.loadModules(...p.graph);
})();
