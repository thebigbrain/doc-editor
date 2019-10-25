async function pipe(queries = [], fetch) {
  for (let query of queries) {
    let r = await fetch(query)
    if (r != null) return r
  }

  return null
}


exports.beforeFind = function (option) {
  return async (context) => {
    const {service, params} = context

    try {
      let id = params.query.id
      if (id.endsWith('.js')) return

      let r = await pipe(
        [{id}, {id: `${id}.js`}, {id: `${id}/index`}, {id: `${id}/index.js`}],
        async (query) => await service.Model.findOne(query)
      )

      if (r != null) {
        context.dispatch = {total: 1, data: [r], skip: 0}
      } else {
        // console.warn(`Not Found`, id)
      }
    } catch (e) {
      console.error(e)
    }

    return context
  }
}
