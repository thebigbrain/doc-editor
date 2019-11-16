import {LiveUser} from '@csb/common/lib/types'


export const state = {
  isLive: false,
  isTeam: false,
  isLoading: false,
  receivingCode: false,
  reconnecting: false,
  notificationsHidden: false,
  followingUserId: null,
  error: null,
  liveUserId: null,
  roomInfo: null,
  liveUser: currentState =>
    currentState.roomInfo &&
    currentState.roomInfo.users.find(u => u.id === currentState.liveUserId),
  isEditor: currentState => liveUserId =>
    currentState.isLive &&
    (currentState.roomInfo.mode === 'open' ||
      currentState.roomInfo.ownerIds.includes(liveUserId) ||
      currentState.roomInfo.editorIds.includes(liveUserId)),
  isCurrentEditor: currentState =>
    currentState.isEditor(currentState.liveUserId),

  isOwner: currentState =>
    currentState.isLive &&
    currentState.roomInfo.ownerIds.includes(currentState.liveUserId),
  liveUsersByModule: currentState => {
    const usersByModule = {};

    if (!currentState.isLive || !currentState.roomInfo) {
      return {};
    }

    const { liveUserId } = currentState;

    currentState.roomInfo.users.forEach(user => {
      const userId = user.id;
      if (userId !== liveUserId) {
        usersByModule[user.currentModuleShortid] =
          usersByModule[user.currentModuleShortid] || [];
        usersByModule[user.currentModuleShortid].push(user.color);
      }
    });

    return usersByModule;
  },
};
