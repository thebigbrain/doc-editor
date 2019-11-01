const mongo = require('../../common/mongo');

module.exports = function(moduleName, graph = null) {
  async function handleAll(db, graph) {
    await updateModule(db, graph);
    await queryModules(db, graph);
    await updateProject(db, graph);
  }

  async function updateProject(db, graph, filename = null) {
    const c = db.collection('projects');
    try {
      const query = { name: moduleName };
      const newValues = {
        $set: {
          name: moduleName,
          entry: filename || moduleName,
          graph: Array.from(graph.values()).map(v => ({ id: v.id, deps: v.deps })),
        },
      };
      const r = await c.updateOne(query, newValues, { upsert: true });
      console.log(`project updated`);
    } catch (e) {
      console.error(e);
    }
  }

  function updateModule(db, graph) {
    const c = db.collection('modules');

    let promises = Array.from(graph.values()).map(async v => {
      const query = { id: v.id, project: v.project };
      const newValues = { $set: v };
      await c.updateOne(query, newValues, { upsert: true });
    });

    return Promise.all(promises).catch(console.error);
  }

  async function queryModules(db, graph) {
    const c = db.collection('modules');
    const result = await c.find().toArray();
    console.log(result.length, graph.size);
  }

  mongo().then(async client => {
    const db = client.db('doc-editor');
    try {
      if (graph != null) await handleAll(db, graph);
    } catch (e) {
      console.error(e);
    }
    client.close();
  });
};

