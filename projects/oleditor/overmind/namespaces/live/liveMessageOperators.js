import {json, mutate} from 'overmind'
import {camelizeKeys} from 'humps'
import {NotificationStatus} from '@codesandbox/notifications/lib/state'

export const onJoin = mutate(
  ({ effects, state }) => {
    effects.notificationToast.success(
      state.live.isTeam ? 'Connected to Live Team!' : 'Connected to Live!',
    );

    if (state.live.reconnecting) {
      effects.live.getAllClients().forEach(client => {
        client.serverReconnect();
      });
    }

    state.live.reconnecting = false;
  },
);

export const onModuleState = mutate(({state, actions}, {data}) => {
  // We get this when we notice that there is an out of sync
  // Really no reason to set this state as everything runs sync
  state.live.receivingCode = true;
  actions.live.internal.initializeModuleState(data.module_state);
  state.live.receivingCode = false;
});

export const onUserEntered = mutate(({state, effects}, {data}) => {
  if (state.live.isLoading) {
    return;
  }

  const users = camelizeKeys(data.users);

  // TODO: What happening here? Is it not an array of users?
  // Check the running code and fix the type
  state.live.roomInfo.users = users
  state.live.roomInfo.editorIds = data.editor_ids;
  state.live.roomInfo.ownerIds = data.owner_ids;

  if (data.joined_user_id === state.live.liveUserId) {
    return;
  }

  const user = data.users.find(u => u.id === data.joined_user_id);

  effects.notificationToast.add({
    message: `${user.username} joined the live session.`,
    status: NotificationStatus.NOTICE,
  });
});

export const onUserLeft = mutate(({state, actions, effects}, {data}) => {
  if (!state.live.notificationsHidden) {
    const { users } = state.live.roomInfo;
    const user = users ? users.find(u => u.id === data.left_user_id) : null;

    effects.notificationToast.add({
      message: user
        ? `${user.username} left the live session.`
        : 'Someone left the live session',
      status: NotificationStatus.NOTICE,
    });
  }

  actions.live.internal.clearUserSelections(data.left_user_id);

  const users = camelizeKeys(data.users);

  // TODO: Same here, not an array?
  // Check running code
  state.live.roomInfo.users = users
  state.live.roomInfo.ownerIds = data.owner_ids;
  state.live.roomInfo.editorIds = data.editor_ids;
});

export const onModuleSaved = mutate(({state, actions}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  const module = state.editor.currentSandbox.modules.find(
    moduleItem => moduleItem.shortid === data.moduleShortid,
  );
  module.isNotSynced = false;

  state.editor.changedModuleShortids.splice(
    state.editor.changedModuleShortids.indexOf(module.shortid),
    1,
  );

  actions.editor.internal.setModuleSavedCode({
    moduleShortid: data.moduleShortid,
    savedCode: data.savedCode,
  });
});

export const onModuleCreated = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  state.editor.currentSandbox.modules.push(data.module);
});

export const onModuleMassCreated = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  state.editor.currentSandbox.modules = state.editor.currentSandbox.modules.concat(
    data.modules,
  );
  state.editor.currentSandbox.directories = state.editor.currentSandbox.directories.concat(
    data.directories,
  );
});

export const onModuleUpdated = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  const sandbox = state.editor.currentSandbox;
  const moduleIndex = sandbox.modules.findIndex(
    moduleEntry => moduleEntry.shortid === data.moduleShortid,
  );

  Object.assign(
    state.editor.sandboxes[sandbox.id].modules[moduleIndex],
    data.module,
  );
});

export const onModuleDeleted = mutate(({actions}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  // Do not think this really works? Cause this would fork the sandbox
  actions.files.removeModule({
    moduleShortid: data.moduleShortid,
  });
});

export const onDirectoryCreated = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  // Should this not be a directory?
  state.editor.currentSandbox.directories.push(data.module);
});

export const onDirectoryUpdated = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  const sandbox = state.editor.currentSandbox;
  const directoryIndex = sandbox.directories.findIndex(
    directoryEntry => directoryEntry.shortid === data.directoryShortid,
  );

  state.editor.sandboxes[sandbox.id].directories[directoryIndex] = data.module;
});

export const onDirectoryDeleted = mutate(({state, actions}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  state.editor.currentModuleShortid = state.editor.mainModule.shortid;
  // Again, this does not work very well?
  actions.files.removeDirectory({
    directoryShortid: data.directoryShortid,
  });
});

export const onUserSelection = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }

  const userSelectionLiveUserId = data.liveUserId;
  const { moduleShortid } = data;
  const { selection } = data;
  const userIndex = state.live.roomInfo.users.findIndex(
    u => u.id === userSelectionLiveUserId,
  );

  if (userIndex > -1) {
    state.live.roomInfo.users[userIndex].currentModuleShortid = moduleShortid;
    state.live.roomInfo.users[userIndex].selection = selection;
  }

  if (
    moduleShortid === state.editor.currentModuleShortid &&
    state.live.isEditor(userSelectionLiveUserId)
  ) {
    const user = state.live.roomInfo.users.find(
      u => u.id === userSelectionLiveUserId,
    );

    state.editor.pendingUserSelections.push({
      userId: userSelectionLiveUserId,
      name: user.username,
      selection,
      color: json(user.color),
    });
  }
});

export const onUserCurrentModule = mutate(({state, actions}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  const userIndex = state.live.roomInfo.users.findIndex(
    u => u.id === data.live_user_id,
  );

  if (userIndex > -1) {
    state.live.roomInfo.users[userIndex].currentModuleShortid =
      data.moduleShortid;
  }

  actions.live.internal.clearUserSelections(null);

  if (
    state.live.followingUserId === data.live_user_id &&
    data.moduleShortid !== state.editor.currentModuleShortid
  ) {
    const { moduleShortid } = data;
    const { modules } = state.editor.currentSandbox;
    const module = modules.find(m => m.shortid === moduleShortid);

    if (!module) {
      return;
    }

    actions.editor.moduleSelected({
      id: module.id,
    });
  }
});

export const onLiveMode = mutate(({state, actions}, {_isOwnMessage, data}) => {
  if (!_isOwnMessage) {
    state.live.roomInfo.mode = data.mode;
  }
  actions.live.internal.clearUserSelections(null);
  state.editor.pendingUserSelections = state.editor.pendingUserSelections.concat(
    actions.live.internal.getSelectionsForModule(state.editor.currentModule),
  );
});

export const onLiveChatEnabled = mutate(({state}, {_isOwnMessage, data}) => {
  if (_isOwnMessage) {
    return;
  }
  state.live.roomInfo.chatEnabled = data.enabled;
});

export const onLiveAddEditor = mutate(({state}, {_isOwnMessage, data}) => {
  if (!_isOwnMessage) {
    state.live.roomInfo.editorIds.push(data.editor_user_id);
  }
});

export const onLiveRemoveEditor = mutate(({state}, {_isOwnMessage, data}) => {
  if (!_isOwnMessage) {
    const userId = data.editor_user_id;

    const editors = state.live.roomInfo.editorIds;
    const newEditors = editors.filter(id => id !== userId);

    state.live.roomInfo.editorIds = newEditors;
  }
});

export const onOperation = mutate(({state, effects}, {_isOwnMessage, data}) => {
  if (state.live.isLoading) {
    return;
  }
  if (_isOwnMessage) {
    effects.live.serverAck(data.module_shortid);
  } else {
    try {
      effects.live.applyServer(data.module_shortid, data.operation);
    } catch (e) {
      // Something went wrong, probably a sync mismatch. Request new version
      console.error('Something went wrong with applying OT operation');
      effects.live.sendModuleUpdateRequest();
    }
  }
});

export const onConnectionLoss = mutate(
  ({ state, effects }) => {
    if (!state.live.reconnecting) {
      effects.notificationToast.add({
        message: 'We lost connection with the live server, reconnecting...',
        status: NotificationStatus.ERROR,
      });
      state.live.reconnecting = true;
    }
  },
);

export const onDisconnect = mutate(({state, actions}, {data}) => {
  actions.live.internal.disconnect();

  state.editor.currentSandbox.owned = state.live.isOwner;

  actions.modalOpened({
    modal: 'liveSessionEnded',
    message:
      data.reason === 'close'
        ? 'The owner ended the session'
        : 'The session has ended due to inactivity',
  });

  actions.live.internal.reset();
});

export const onOwnerLeft = mutate(({actions}) => {
  actions.modalOpened({
    modal: 'liveSessionEnded',
    message: 'The owner left the session',
  });
});

export const onChat = mutate(({state}, {data}) => {
  let name = state.live.roomInfo.chat.users[data.live_user_id];

  if (!name) {
    const user = state.live.roomInfo.users.find(
      u => u.id === data.live_user_id,
    );

    if (user) {
      state.live.roomInfo.chat.users[data.live_user_id] = user.username;
      name = user.username;
    } else {
      name = 'Unknown User';
    }
  }

  state.live.roomInfo.chat.messages.push({
    userId: data.live_user_id,
    message: data.message,
    date: data.date,
  });
});

export const onNotification = mutate(({effects}, {data}) => {
  effects.notificationToast.add({
    message: data.message,
    status: data.type,
  });
});
