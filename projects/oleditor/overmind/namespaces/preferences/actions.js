// import { setVimExtensionEnabled } from '~/vscode/initializers';
import { json } from 'overmind';

export const viewModeChanged = ({ state }, { showEditor, showPreview }) => {
  state.preferences.showEditor = showEditor;
  state.preferences.showPreview = showPreview;
};

export const devtoolsToggled = ({ state }) => {
  state.preferences.showDevtools = !state.preferences.showDevtools;
};

export const setDevtoolsOpen = ({ state }, isOpen) => {
  state.preferences.showDevtools = isOpen;
};

export const itemIdChanged = async ({ state, actions, effects }, { itemId }) => {
  state.preferences.itemId = itemId;

  if (itemId === 'keybindings') {
    effects.keybindingManager.pause();
  } else {
    effects.keybindingManager.start();
  }

  if (itemId === 'integrations') {
    await actions.deployment.internal.getZeitUserDetails();
  }
};

export const settingChanged = ({ state, effects }, { name, value }) => {
  const path = name.split('.');
  const firstKey = path[0];
  const lastKey = path.pop();
  const settingsTarget = path.reduce(
    (aggr, pathKey) => aggr[pathKey],
    state.preferences.settings,
  );
  settingsTarget[lastKey] = value;

  if (name === 'vimMode') {
    // setVimExtensionEnabled(value);
  }

  effects.settingsStore.set(firstKey, state.preferences.settings[firstKey]);

  effects.analytics.track('Change Settings', {
    name,
    value,
  });
};

export const setBadgeVisibility = async ({ state, effects }, { id, visible }) => {
  const { badges } = state.user;

  badges.forEach((badge, index) => {
    if (badge.id === id) {
      state.user.badges[index].visible = visible;
    }
  });

  await effects.api.updateBadge(id, visible);
};

export const paymentDetailsRequested = async ({
                                                             state,
                                                             effects,
                                                           }) => {
  state.preferences.isLoadingPaymentDetails = true;
  try {
    state.preferences.paymentDetails = await effects.api.getPaymentDetails();
  } catch (error) {
    state.preferences.paymentDetailError = error.message;
  }
  state.preferences.isLoadingPaymentDetails = false;
};

export const paymentDetailsUpdated = async (
  { state, effects },
  { token },
) => {
  state.preferences.isLoadingPaymentDetails = true;
  state.preferences.paymentDetails = await effects.api.updatePaymentDetails(
    token,
  );
  state.preferences.isLoadingPaymentDetails = false;
};

export const keybindingChanged = ({ state, effects }, { name, value }) => {
  const { keybindings } = state.preferences.settings;
  const currentIndex = keybindings.findIndex(binding => binding.key === name);
  const newBinding = {
    key: name,
    bindings: JSON.parse(JSON.stringify(value)),
  };

  if (currentIndex === -1) {
    state.preferences.settings.keybindings.push(newBinding);
  } else {
    state.preferences.settings.keybindings.splice(currentIndex, 1, newBinding);
  }

  const keybindingsValue = keybindings.reduce(
    (currentValue, binding) => ({
      ...currentValue,
      [binding.key]: binding.bindings,
    }),
    {},
  );

  effects.settingsStore.set('keybindings', keybindingsValue);

  effects.keybindingManager.set(json(state.preferences.settings.keybindings));
};

export const zenModeToggled = ({ state }) => {
  state.preferences.settings.zenMode = !state.preferences.settings.zenMode;
};

export const codeMirrorForced = ({ state }) => {
  state.preferences.settings.codeMirror = true;
};
