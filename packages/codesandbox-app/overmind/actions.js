import { convertTypeToStatus, NotificationType } from '@codesandbox/common/lib/utils/notifications';

import { withLoadApp } from './factories';
import * as internalActions from './internalActions';
import { Action, AsyncAction } from '.';

export const internal = internalActions;

export const appUnmounted = async ({ effects, actions }) => {
  effects.connection.removeListener(actions.connectionChanged);
};

export const sandboxPageMounted = withLoadApp();

export const searchMounted = withLoadApp();

export const cliMounted = withLoadApp(
  async ({ state, actions }) => {
    if (state.user) {
      await actions.internal.authorize();
    }
  },
);

export const notificationAdded = ({ effects }, { title, notificationType, timeAlive }) => {
  effects.notificationToast.add({
    message: title,
    status: convertTypeToStatus(notificationType),
    timeAlive: timeAlive * 1000,
  });
};

export const notificationRemoved = ({ state }, { id }) => {
  const { notifications } = state;
  const notificationToRemoveIndex = notifications.findIndex(
    notification => notification.id === id,
  );

  state.notifications.splice(notificationToRemoveIndex, 1);
};

export const forceRender = ({ state }) => {
  state.editor.forceRender++;
};

export const cliInstructionsMounted = withLoadApp();

export const githubPageMounted = withLoadApp();

export const connectionChanged = ({ state }, connected) => {
  state.connected = connected;
};

export const modalOpened = (
  { state, effects },
  { modal, message },
) => {
  effects.analytics.track('Open Modal', { modal });
  state.currentModalMessage = message;
  state.currentModal = modal;
};

export const modalClosed = ({ state, effects }) => {
  // We just start it whenever it closes, if already started nothing happens
  if (state.currentModal === 'preferences') {
    effects.keybindingManager.start();
  }

  state.currentModal = null;
};

export const signInClicked = (
  { actions },
  options,
) => actions.internal.signIn(options);

export const signInCliClicked = async ({ state, actions }) => {
  await actions.internal.signIn({
    useExtraScopes: false,
  });

  if (state.user) {
    await actions.internal.authorize();
  }
};

export const userMenuOpened = ({ state }) => {
  state.userMenuOpen = true;
};

export const userMenuClosed = ({ state }) => {
  state.userMenuOpen = false;
};

export const addNotification = ({ effects }, { message, type, timeAlive }) => {
  effects.notificationToast.add({
    message,
    status: effects.notificationToast.convertTypeToStatus(type),
    timeAlive: timeAlive * 1000,
  });
};

export const removeNotification = ({ state }, id) => {
  const notificationToRemoveIndex = state.notifications.findIndex(
    notification => notification.id === id,
  );

  state.notifications.splice(notificationToRemoveIndex, 1);
};

export const signInZeitClicked = async ({
                                                       state,
                                                       effects: { browser, api, notificationToast },
                                                       actions,
                                                     }) => {
  state.isLoadingZeit = true;

  const popup = browser.openPopup('/auth/zeit', 'sign in');
  const data = await browser.waitForMessage('signin');

  popup.close();

  if (data && data.code) {
    try {
      state.user = await api.createZeitIntegration(data.code);
      await actions.deployment.internal.getZeitUserDetails();
    } catch (error) {
      notificationToast.error('Could not authorize with ZEIT');
    }
  } else {
    notificationToast.error('Could not authorize with ZEIT');
  }

  state.isLoadingZeit = false;
};

export const signOutZeitClicked = async ({ state, effects }) => {
  await effects.http.delete(`/users/current_user/integrations/zeit`);
  state.user.integrations.zeit = null;
};

export const authTokenRequested = async ({ actions }) => {
  await actions.internal.authorize();
};

export const requestAuthorisation = async ({ actions }) => {
  await actions.internal.authorize();
};

export const signInGithubClicked = async ({ state, actions }) => {
  state.isLoadingGithub = true;
  await actions.internal.signIn({ useExtraScopes: true });
  state.isLoadingGithub = false;
};

export const signOutClicked = async ({
                                                    state,
                                                    effects,
                                                    actions,
                                                  }) => {
  effects.analytics.track('Sign Out', {});
  state.workspace.openedWorkspaceItem = 'files';
  if (state.live.isLive) {
    actions.live.internal.disconnect();
  }
  await effects.api.signout();
  effects.jwt.reset();
  state.user = null;
  effects.browser.reload();
};

export const signOutGithubIntegration = async ({
                                                              state,
                                                              effects,
                                                            }) => {
  await effects.api.signoutGithubIntegration();
  state.user.integrations.github = null;
};

export const setUpdateStatus = (
  { state },
  { status },
) => {
  state.updateStatus = status;
};

export const track = (
  { effects },
  { name, data },
) => {
  effects.analytics.track(name, data);
};

export const refetchSandboxInfo = async ({
                                                        state,
                                                        effects,
                                                        actions,
                                                      }) => {
  if (state.editor.currentId) {
    const id = state.editor.currentId;
    const sandbox = state.editor.currentSandbox;
    const updatedSandbox = await effects.api.getSandbox(id);

    sandbox.collection = updatedSandbox.collection;
    sandbox.owned = updatedSandbox.owned;
    sandbox.userLiked = updatedSandbox.userLiked;
    sandbox.title = updatedSandbox.title;
    sandbox.team = updatedSandbox.team;
    sandbox.roomId = updatedSandbox.roomId;

    await actions.editor.internal.initializeLiveSandbox(sandbox);
  }
};
