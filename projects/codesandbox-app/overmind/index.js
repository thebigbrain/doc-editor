import {merge, namespaced} from 'overmind/config'
import * as effects from './effects'
import {state} from './state'
import {onInitialize} from './onInitialize'
import * as actions from './actions'
import * as preferences from './namespaces/preferences'
import * as userNotifications from './namespaces/userNotifications'
import * as patron from './namespaces/patron'
import * as editor from './namespaces/editor'
import * as live from './namespaces/live'
import * as workspace from './namespaces/workspace'
// import * as dashboard from './namespaces/dashboard'
// import * as deployment from './namespaces/deployment'
// import * as files from './namespaces/files'
// import * as git from './namespaces/git'
// import * as explore from './namespaces/explore'
// import * as profile from './namespaces/profile'
import * as server from './namespaces/server'
import { createModals } from './factories'
import * as modals from './modals'

export const config = merge(
  {
    onInitialize,
    effects,
    state,
    actions,
  },
  namespaced({
    preferences,
    userNotifications,
    patron,
    editor,
    live,
    workspace,
    // dashboard,
    // deployment,
    // files,
    // git,
    // explore,
    // profile,
    server,
    modals: createModals(modals),
  }),
);
