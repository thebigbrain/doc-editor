// import {client} from '~/graphql/client'
// import {LIST_TEMPLATES} from '~/pages/Dashboard/queries'
// import apiFactory from './apiFactory'
import * as api from './feathers'

// let api;

const SANDBOX_OP = {
  REMOVE: 'remove',
  UPDATE: 'update',
  UNLIKE: 'unlike',
  LIKE: 'like',
  DEL_ENV: 'del.env',
  DEL_DIRECTORY: 'del.directory'
}

export default {
  initialize({onError}) {
    // api = apiFactory(config);
    api.initialize({url: 'http://localhost:3030'})
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
    const s = api.getService('dependencies')
    return await s.get(name, {version: 'latest'})
  },
  async getSandbox(id) {
    const s = api.getService('sandboxes')
    let sandbox = await s.get(id)

    return {
      ...sandbox,
      modules: sandbox.modules.map(module => ({
        ...module,
        savedCode: null,
        isNotSynced: false,
      })),
    }
  },
  async forkSandbox(id, body) {
    const s = api.getService('sandboxes')
    console.log(id, body)
    return await s.create(body, {id, op: 'fork'})

  },
  async createModule(sandboxId, module) {
    const s = api.getService('modules')
    return await s.create({
      title: module.title,
      directoryShortid: module.directoryShortid,
      code: module.code,
      isBinary: module.isBinary === undefined ? false : module.isBinary,
    })
  },
  async deleteModuleFromSandbox(sandboxId, moduleShortid) {
    const s = api.getService('sandboxes')
    return await s.patch(sandboxId, {modules: [{id: moduleShortid}]}, {op: SANDBOX_OP.REMOVE})
  },
  async saveModuleCode(sandboxId, module) {
    const s = api.getService('sandboxes')
    return await s.patch(sandboxId, {modules: [{code: module.code}]}, { op: SANDBOX_OP.UPDATE})

  },
  async saveModules(sandboxId, modules) {
    const s = api.getService('sandboxes')
    return await s.update(sandboxId, {modules})
  },
  async getGitChanges(sandboxId) {
    const s = api.getService('sandboxes')
    const sandbox = await s.get(sandboxId)
    return sandbox && sandbox.git && sandbox.git.diff
  },
  saveTemplate(sandboxId, template) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {sandbox: { template }})
  },
  unlikeSandbox(sandboxId) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, null, {op: SANDBOX_OP.UNLIKE})
  },
  likeSandbox(sandboxId) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, null, {op: SANDBOX_OP.LIKE})
  },
  savePrivacy(sandboxId, privacy) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {privacy})
  },
  saveFrozen(sandboxId, isFrozen) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {is_frozen: isFrozen})
  },
  async getEnvironmentVariables(sandboxId) {
    const s = api.getService('sandboxes')
    const sandbox = await s.get(sandboxId)
    return sandbox.env
  },
  saveEnvironmentVariable(
    sandboxId,
    environmentVariable,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {env: environmentVariable})
  },
  deleteEnvironmentVariable(
    sandboxId,
    name,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {name}, {op: SANDBOX_OP.DEL_ENV})
  },
  saveModuleTitle(sandboxId, moduleShortid, title) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {
      module: { title },
    })
  },
  getPopularSandboxes(date) {
    const s = api.getService('sandboxes')
    return s.find({
      query: {
        start_date: date,
        $sort: { popular: -1 }
      }
    })
  },
  saveSandboxPick(
    sandboxId,
    title,
    description,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {pick: {title, description}})
  },
  async getPickedSandboxes() {
    const s = api.getService('sandboxes')
    return s.find({
      query: {
        pick: { $ne: null }
      }
    })
  },
  createDirectory(
    sandboxId,
    directoryShortid,
    title,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {
      directory: {
        title,
        directoryShortid,
      }
    })
  },
  saveModuleDirectory(
    sandboxId,
    moduleShortid,
    directoryShortid,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {
      module: { directoryShortid }
    })
  },
  saveDirectoryDirectory(
    sandboxId,
    sourceDirectoryShortid,
    targetDirectoryShortId,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {
      directory: { directoryShortid: targetDirectoryShortId },
    })
  },
  deleteDirectory(sandboxId, directoryShortid) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {directory: directoryShortid}, {
      op: SANDBOX_OP.DEL_DIRECTORY
    })
  },
  saveDirectoryTitle(
    sandboxId,
    directoryShortid,
    title,
  ) {
    const s = api.getService('sandboxes')
    return s.patch(sandboxId, {
      directory: { title },
    })
  },
  getUploads() {
    return api.get('/users/current_user/uploads');
  },
  deleteUploadedFile(uploadId) {
    return api.delete(`/users/current_user/uploads/${uploadId}`);
  },
  createUpload(name, content) {
    return api.post('/users/current_user/uploads', {
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
    return api.post(`/sandboxes/${sandboxId}/modules/mcreate`, {
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
    return api.post(`/sandboxes/${sandboxId}/git/repo/${repoTitle}`, data);
  },
  createGitCommit(sandboxId, message) {
    return api.post(`/sandboxes/${sandboxId}/git/commit`, {
      id: sandboxId,
      message,
    });
  },
  createGitPr(sandboxId, message) {
    return api.post(`/sandboxes/${sandboxId}/git/pr`, {
      id: sandboxId,
      message,
    });
  },
  async createLiveRoom(sandboxId) {
    const data = await api.post(`/sandboxes/${sandboxId}/live`, {
      id: sandboxId,
    });

    return data.id;
  },
  updateBadge(badgeId, visible) {
    return api.patch(`/users/current_user/badges/${badgeId}`, {
      badge: {
        visible,
      },
    });
  },
  getPaymentDetails() {
    return api.get(`/users/current_user/payment_details`);
  },
  updatePaymentDetails(token) {
    return api.patch('/users/current_user/payment_details', {
      paymentDetails: {
        token,
      },
    });
  },
  getProfile(username) {
    return api.get(`/users/${username}`);
  },
  getUserSandboxes(
    username,
    page,
  ) {
    return api.get(`/users/${username}/sandboxes`, {
      page: String(page),
    });
  },
  getUserLikedSandboxes(
    username,
    page,
  ) {
    return api.get(`/users/${username}/sandboxes/liked`, {
      page: String(page),
    });
  },
  async getSandboxes() {
    const s = api.getService('sandboxes')
    return s.find();
  },
  updateShowcasedSandbox(username, sandboxId) {
    return api.patch(`/users/${username}`, {
      user: {
        showcasedSandboxShortid: sandboxId,
      },
    });
  },
  async deleteSandbox(sandboxId) {
    const s = api.getService('sandboxes')
    return await s.remove(sandboxId);
  },
  createTag(sandboxId, tagName) {
    return api.post(`/sandboxes/${sandboxId}/tags`, {
      tag: tagName,
    });
  },
  deleteTag(sandboxId, tagName) {
    return api.delete(`/sandboxes/${sandboxId}/tags/${tagName}`);
  },
  updateSandbox(sandboxId, data) {
    return api.put(`/sandboxes/${sandboxId}`, {
      sandbox: data,
    });
  },
  createResource(sandboxId, resource) {
    return api.post(`/sandboxes/${sandboxId}/resources`, {
      externalResource: resource,
    });
  },
  deleteResource(sandboxId, resource) {
    return api.request({
      method: 'DELETE',
      url: `/sandboxes/${sandboxId}/resources/`,
      data: {
        id: resource,
      },
    });
  },
  updatePrivacy(sandboxId, privacy) {
    return api.patch(`/sandboxes/${sandboxId}/privacy`, {
      sandbox: {
        privacy,
      },
    });
  },
  createZeitIntegration(code) {
    return api.post(`/users/current_user/integrations/zeit`, {
      code,
    });
  },
  signout() {
    return api.logout();
  },
  signoutGithubIntegration() {
    return api.delete(`/users/current_user/integrations/github`);
  },
  preloadTemplates() {
    client.query({ query: LIST_TEMPLATES, variables: { showAll: true } });
  },
  deleteTemplate(
    sandboxId,
    templateId,
  ) {
    return api.delete(`/sandboxes/${sandboxId}/templates/${templateId}`);
  },
  updateTemplate(
    sandboxId,
    template,
  ) {
    return api
      .put(
        `/sandboxes/${sandboxId}/templates/${template.id}`,
        {
          template,
        },
      )
      .then(data => data.template);
  },
  createTemplate(
    sandboxId,
    template,
  ) {
    return api
      .post(`/sandboxes/${sandboxId}/templates`, {
        template,
      })
      .then(data => data.template);
  },
};
