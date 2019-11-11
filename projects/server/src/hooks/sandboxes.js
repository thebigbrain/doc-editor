const httpGet = require('../utils/http-get');

async function fetchSandboxFromCsb(id) {
  let url = `https://codesandbox.io/api/v1/sandboxes/${id}`;
  return await httpGet(url);
}

exports.createIfNotFound = function(options) {
  return async (context) => {
    const {result, service, params} = context;
    if (result.total === 0) {
      let r = await fetchSandboxFromCsb(params.query.id);
      result.data = [await service.create(r.data)];
      result.total = 1;
    }

    return context;
  };
};
