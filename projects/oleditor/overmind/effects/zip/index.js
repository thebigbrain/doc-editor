export default {
  create(sandbox) {
    return import(/* webpackChunkName: 'create-zip' */ './create-zip').then(
      module =>
        module
          .getZip(sandbox, sandbox.modules, sandbox.directories)
          .then(result => ({ file: result.file })),
    );
  },
  download(sandbox) {
    return import(/* webpackChunkName: 'create-zip' */ './create-zip').then(
      module =>
        module
          .default(sandbox, sandbox.modules, sandbox.directories)
          .then(file => ({ file })),
    );
  },
};
