export default {
    export(sandbox) {
        return import(
        /* webpackChunkName: 'export-to-github' */ './export-to-github').then(exportToGithub => exportToGithub.default(sandbox));
    },
};
