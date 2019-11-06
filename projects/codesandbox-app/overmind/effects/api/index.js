// import {client} from '~/graphql/client'
// import {LIST_TEMPLATES} from '~/pages/Dashboard/queries'
// import apiFactory from './apiFactory'
import * as api from './feathers';

// let api;

const SANDBOX_OP = {
  REMOVE: 'remove',
  UPDATE: 'update',
  UNLIKE: 'unlike',
  LIKE: 'like',
  DEL_ENV: 'del.env',
  DEL_DIRECTORY: 'del.directory',
};

export default {
  initialize({ onError }) {
    // api = apiFactory(config);
    api.initialize({ url: 'http://localhost:3030' });
  },
  async getAuthToken() {
    return await api.getAccessToken();
  },
  createPatronSubscription(token, amount, coupon) {
    return api.post('/users/current_user/subscription', {
      subscription: {
        amount,
        coupon,
        token,
      },
    });
  },
  updatePatronSubscription(amount, coupon) {
    return api.patch('/users/current_user/subscription', {
      subscription: {
        amount,
        coupon,
      },
    });
  },
  cancelPatronSubscription() {
    return api.delete('/users/current_user/subscription');
  },
  async getCurrentUser() {
    return await api.getCurrentUser();
  },
  async getDependency(name) {
    const s = api.getService('dependencies');
    return await s.get(name, { version: 'latest' });
  },
  async getSandbox(id) {
    const s = api.getService('sandboxes');
    let r = await s.find({ query: { id } });
    let sandbox = r.data[0];

    return {
      ...sandbox,
      modules: sandbox.modules.map(module => ({
        ...module,
        savedCode: null,
        isNotSynced: false,
      })),
    };
  },
  async forkSandbox(id, body) {
    const s = api.getService('sandboxes');
    console.log(id, body);
    return await s.create(body, { id, op: 'fork' });

  },
  async createModule(sandboxId, module) {
    const s = api.getService('modules');
    return await s.create({
      title: module.title,
      directoryShortid: module.directoryShortid,
      code: module.code,
      isBinary: module.isBinary === undefined ? false : module.isBinary,
    });
  },
  async deleteModuleFromSandbox(sandboxId, moduleShortid) {
    const s = api.getService('sandboxes');
    return await s.patch(sandboxId, { modules: [{ id: moduleShortid }] }, { op: SANDBOX_OP.REMOVE });
  },
  async saveModuleCode(sandboxId, module) {
    const s = api.getService('sandboxes');
    return await s.patch(sandboxId, { modules: [{ code: module.code }] }, { op: SANDBOX_OP.UPDATE });

  },
  async saveModules(sandboxId, modules) {
    const s = api.getService('sandboxes');
    return await s.update(sandboxId, { modules });
  },
  async getGitChanges(sandboxId) {
    const s = api.getService('sandboxes');
    const sandbox = await s.get(sandboxId);
    return sandbox && sandbox.git && sandbox.git.diff;
  },
  saveTemplate(sandboxId, template) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { sandbox: { template } });
  },
  unlikeSandbox(sandboxId) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, null, { op: SANDBOX_OP.UNLIKE });
  },
  likeSandbox(sandboxId) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, null, { op: SANDBOX_OP.LIKE });
  },
  savePrivacy(sandboxId, privacy) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { privacy });
  },
  saveFrozen(sandboxId, isFrozen) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { is_frozen: isFrozen });
  },
  async getEnvironmentVariables(sandboxId) {
    const s = api.getService('sandboxes');
    const sandbox = await s.get(sandboxId);
    return sandbox.env;
  },
  saveEnvironmentVariable(
    sandboxId,
    environmentVariable,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { env: environmentVariable });
  },
  deleteEnvironmentVariable(
    sandboxId,
    name,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { name }, { op: SANDBOX_OP.DEL_ENV });
  },
  saveModuleTitle(sandboxId, moduleShortid, title) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      module: { title },
    });
  },
  getPopularSandboxes(date) {
    const s = api.getService('sandboxes');
    return s.find({
      query: {
        start_date: date,
        $sort: { popular: -1 },
      },
    });
  },
  saveSandboxPick(
    sandboxId,
    title,
    description,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { pick: { title, description } });
  },
  async getPickedSandboxes() {
    const s = api.getService('sandboxes');
    return s.find({
      query: {
        pick: { $ne: null },
      },
    });
  },
  createDirectory(
    sandboxId,
    directoryShortid,
    title,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      directory: {
        title,
        directoryShortid,
      },
    });
  },
  saveModuleDirectory(
    sandboxId,
    moduleShortid,
    directoryShortid,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      module: { directoryShortid },
    });
  },
  saveDirectoryDirectory(
    sandboxId,
    sourceDirectoryShortid,
    targetDirectoryShortId,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      directory: { directoryShortid: targetDirectoryShortId },
    });
  },
  deleteDirectory(sandboxId, directoryShortid) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { directory: directoryShortid }, {
      op: SANDBOX_OP.DEL_DIRECTORY,
    });
  },
  saveDirectoryTitle(
    sandboxId,
    directoryShortid,
    title,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      directory: { title },
    });
  },
  getUploads() {
    const s = api.getService('uploads');
    return s.find();
  },
  deleteUploadedFile(uploadId) {
    const s = api.getService('uploads');
    return s.delete(uploadId);
  },
  createUpload(name, content) {
    const s = api.getService('uploads');
    return s.create({
      content,
      name,
    });
  },
  massCreateModules(
    sandboxId,
    directoryShortid,
    modules,
    directories,
  ) {
    const s = api.getService('modules');
    return s.create({
      sandboxId,
      directoryShortid,
      modules,
      directories,
    });
  },
  createGit(
    sandboxId,
    repoTitle,
    data,
  ) {
    const s = api.getService('git.repos');
    return s.create({ sandboxId, repoTitle, data });
  },
  createGitCommit(sandboxId, message) {
    const s = api.getService('git.commits');
    return s.create({
      id: sandboxId,
      message,
    });
  },
  createGitPr(sandboxId, message) {
    const s = api.getService('git.prs');
    return s.create({
      id: sandboxId,
      message,
    });
  },
  async createLiveRoom(sandboxId) {
    const s = api.getService('lives');
    const r = await s.create({
      id: sandboxId,
    });

    return r.data.id;
  },
  updateBadge(badgeId, visible) {
    const s = api.getService('badges');
    return s.create({
      id: badgeId,
      visible,
    });
  },
  getPaymentDetails() {
    const s = api.getService('payment.details');
    return s.find();
  },
  updatePaymentDetails(token) {
    const s = api.getService('payment.details');
    return s.patch({
      paymentDetails: {
        token,
      },
    });
  },
  getProfile(username) {
    const s = api.getService('profiles');
    return s.find({ query: { username } });
  },
  getUserSandboxes(
    username,
    page,
  ) {
    const s = api.getService('sandboxes');
    return s.find({ query: { username, page: page } });
  },
  getUserLikedSandboxes(
    username,
    page,
  ) {
    const s = api.getService('sandboxes');
    return s.find({ query: { username, page: page, liked: true } });
  },
  async getSandboxes() {
    const s = api.getService('sandboxes');
    return s.find();
  },
  updateShowcasedSandbox(username, sandboxId) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      user: username,
    });
  },
  async deleteSandbox(sandboxId) {
    const s = api.getService('sandboxes');
    return await s.remove(sandboxId);
  },
  createTag(sandboxId, tagName) {
    const tags = api.getService('tags');
    return s.create({
      sandboxId,
      tag: tagName,
    });
  },
  deleteTag(sandboxId, tagName) {
    const tags = api.getService('tags');
    return s.remove(null, { query: { sandboxId, tag: tagName } });
  },
  updateSandbox(sandboxId, data) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      sandbox: data,
    });
  },
  createResource(sandboxId, resource) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, {
      externalResource: resource,
    });
  },
  deleteResource(sandboxId, resource) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { resource });
  },
  updatePrivacy(sandboxId, privacy) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { privacy });
  },
  createZeitIntegration(code) {
    const s = api.getService('zeits');
    return s.create({ code });
  },
  signout() {
    return api.logout();
  },
  signoutGithubIntegration() {
    const s = api.getService('integrations.github');
    return s.remove();
  },
  preloadTemplates() {
    client.query({ query: LIST_TEMPLATES, variables: { showAll: true } });
  },
  deleteTemplate(
    sandboxId,
    templateId,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { templateId });
  },
  updateTemplate(
    sandboxId,
    template,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { template }).then(r => r.data.template);
  },
  createTemplate(
    sandboxId,
    template,
  ) {
    const s = api.getService('sandboxes');
    return s.patch(sandboxId, { template }).then(r => r.data.template);
  },
};
