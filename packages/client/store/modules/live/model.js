import { types } from 'mobx-state-tree'

const Selection = types.model({
  selection: types.array(types.number),
  cursorPosition: types.number,
})

export const UserSelection = types.model({
  primary: Selection,
  secondary: types.array(Selection),
})

const User = types.model({
  id: types.string,
  username: types.string,
  avatarUrl: types.string,
  selection: types.maybeNull(UserSelection),
  currentModuleShortid: types.maybeNull(types.string),
  color: types.array(types.number),
})

export default {
  isLive: types.boolean,
  isTeam: types.boolean,
  isLoading: types.boolean,
  receivingCode: types.boolean,
  error: types.maybeNull(types.string),
  reconnecting: types.boolean,
  notificationsHidden: types.boolean,
  followingUserId: types.maybeNull(types.string),
  liveUserId: types.maybeNull(types.string),

  roomInfo: types.maybeNull(
    types.model({
      startTime: types.maybeNull(types.number),
      ownerIds: types.array(types.string),
      roomId: types.string,
      mode: types.string,
      chatEnabled: types.boolean,
      sandboxId: types.string,
      editorIds: types.array(types.string),
      // version: types.string,
      users: types.array(User),
      chat: types.model({
        messages: types.array(
          types.model({
            userId: types.string,
            date: types.number,
            message: types.string,
          }),
        ),
        // We keep a separate map of user_id -> username for the case when
        // a user disconnects. We still need to keep track of the name.
        users: types.map(types.string),
      }),
    }),
  ),
}
