const httpGet = require('../utils/http-get')

async function fetchSandboxFromCsb(id) {
  let url = `https://codesandbox.io/api/v1/sandboxes/${id}`
  return await httpGet(url)
}

exports.createIfNotFound = function (options) {
  return async (context) => {
    console.log(context.error.code)
    if (context.error && context.error.code == 404) {
      let r = await fetchSandboxFromCsb(context.id)
      context.result = await context.service.create(r.data)
    }
    
    return context
  }
}