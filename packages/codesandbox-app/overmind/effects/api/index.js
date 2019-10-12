import {
  CurrentUser,
  CustomTemplate,
  Dependency,
  Directory,
  EnvironmentVariable,
  GitChanges,
  GitCommit,
  GitInfo,
  GitPr,
  Module,
  PaymentDetails,
  PickedSandboxes,
  PopularSandboxes,
  Profile,
  Sandbox,
  SandboxPick,
  UploadedFilesInfo,
  UserSandbox,
} from '@codesandbox/common/lib/types';
import { TemplateType } from '@codesandbox/common/lib/templates';
import { client } from '~/graphql/client';
import { LIST_TEMPLATES } from '~/pages/Dashboard/queries';
import apiFactory from './apiFactory';

let api;

export default {
  initialize(config) {
    api = apiFactory(config);
  },
  async getAuthToken() {
    const response = await api.get<{ token }>('/auth/auth-token');

    return response.token;
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
  getCurrentUser() {
    return api.get('/users/current');
  },
  getDependency(name) {
    return api.get(`/dependencies/${name}@latest`);
  },
  async getSandbox(id) {
    const sandbox = await api.get<Sandbox>(`/sandboxes/${id}`);

    // We need to add client side properties for tracking
    return {
      ...sandbox,
      modules: sandbox.modules.map(module => ({
        ...module,
        savedCode: null,
        isNotSynced: false,
      })),
    };
  },
  forkSandbox(id, body) {
    const url = id.includes('/')
      ? `/sandboxes/fork/${id}`
      : `/sandboxes/${id}/fork`;

    return api.post(url, body || {});
  },
  createModule(sandboxId, module) {
    return api.post(`/sandboxes/${sandboxId}/modules`, {
      module: {
        title: module.title,
        directoryShortid: module.directoryShortid,
        code: module.code,
        isBinary: module.isBinary === undefined ? false : module.isBinary,
      },
    });
  },
  deleteModule(sandboxId, moduleShortid) {
    return api.delete(`/sandboxes/${sandboxId}/modules/${moduleShortid}`);
  },
  saveModuleCode(sandboxId, module) {
    return api.put(`/sandboxes/${sandboxId}/modules/${module.shortid}`, {
      module: { code: module.code },
    });
  },
  saveModules(sandboxId, modules) {
    return api.put(`/sandboxes/${sandboxId}/modules/mupdate`, {
      modules,
    });
  },
  getGitChanges(sandboxId) {
    return api.get(`/sandboxes/${sandboxId}/git/diff`);
  },
  saveTemplate(sandboxId, template) {
    return api.put(`/sandboxes/${sandboxId}/`, {
      sandbox: { template },
    });
  },
  unlikeSandbox(sandboxId) {
    return api.request({
      method: 'DELETE',
      url: `/sandboxes/${sandboxId}/likes`,
      data: {
        id: sandboxId,
      },
    });
  },
  likeSandbox(sandboxId) {
    return api.post(`/sandboxes/${sandboxId}/likes`, {
      id: sandboxId,
    });
  },
  savePrivacy(sandboxId, privacy) {
    return api.patch(`/sandboxes/${sandboxId}/privacy`, {
      sandbox: {
        privacy,
      },
    });
  },
  saveFrozen(sandboxId, isFrozen) {
    return api.put(`/sandboxes/${sandboxId}`, {
      sandbox: {
        is_frozen: isFrozen,
      },
    });
  },
  getEnvironmentVariables(sandboxId) {
    return api.get(
      `/sandboxes/${sandboxId}/env`,
      {},
      { shouldCamelize: false },
    );
  },
  saveEnvironmentVariable(
    sandboxId,
    environmentVariable,
  ) {
    return api.post(
      `/sandboxes/${sandboxId}/env`,
      {
        environment_variable: environmentVariable,
      },
      {
        shouldCamelize: false,
      },
    );
  },
  deleteEnvironmentVariable(
    sandboxId,
    name,
  ) {
    return api.delete(
      `/sandboxes/${sandboxId}/env/${name}`,
      {},
      { shouldCamelize: false },
    );
  },
  saveModuleTitle(sandboxId, moduleShortid, title) {
    return api.put(`/sandboxes/${sandboxId}/modules/${moduleShortid}`, {
      module: { title },
    });
  },
  getPopularSandboxes(date) {
    return api.get(`/sandboxes/popular?start_date=${date}`);
  },
  saveSandboxPick(
    sandboxId,
    title,
    description,
  ) {
    return api.post(`/sandboxes/${sandboxId}/pick`, {
      title,
      description,
    });
  },
  getPickedSandboxes() {
    return api.get(`/sandboxes/picked`);
  },
  createDirectory(
    sandboxId,
    directoryShortid,
    title,
  ) {
    return api.post(`/sandboxes/${sandboxId}/directories`, {
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
    return api.put(`/sandboxes/${sandboxId}/modules/${moduleShortid}`, {
      module: { directoryShortid },
    });
  },
  saveDirectoryDirectory(
    sandboxId,
    sourceDirectoryShortid,
    targetDirectoryShortId,
  ) {
    return api.put(
      `/sandboxes/${sandboxId}/directories/${sourceDirectoryShortid}`,
      {
        directory: { directoryShortid: targetDirectoryShortId },
      },
    );
  },
  deleteDirectory(sandboxId, directoryShortid) {
    return api.delete(
      `/sandboxes/${sandboxId}/directories/${directoryShortid}`,
    );
  },
  saveDirectoryTitle(
    sandboxId,
    directoryShortid,
    title,
  ) {
    return api.put(`/sandboxes/${sandboxId}/directories/${directoryShortid}`, {
      directory: { title },
    });
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
  getSandboxes() {
    return api.get('/sandboxes');
  },
  updateShowcasedSandbox(username, sandboxId) {
    return api.patch(`/users/${username}`, {
      user: {
        showcasedSandboxShortid: sandboxId,
      },
    });
  },
  deleteSandbox(sandboxId) {
    return api.request({
      method: 'DELETE',
      url: `/sandboxes/${sandboxId}`,
      data: {
        id: sandboxId,
      },
    });
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
    return api.delete(`/users/signout`);
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
      .post<{ template: CustomTemplate }>(`/sandboxes/${sandboxId}/templates`, {
        template,
      })
      .then(data => data.template);
  },
};
