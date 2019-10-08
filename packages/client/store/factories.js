import { parallel, sequence } from 'cerebral'
import { set, when } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import trackAnalytics from '@codesandbox/common/lib/utils/analytics'
import { convertTypeToStatus, notificationState } from '@codesandbox/common/lib/utils/notifications'
import * as actions from './actions'
import { initializeNotifications } from './modules/user-notifications/sequences'
import { setupCodeSandboxAPIListener } from './modules/server/actions'

export function addTabById(id) {
  // eslint-disable-next-line
  return function addTabById({ state, resolve }) {
    const modules = state.get('editor.currentSandbox.modules')
    const m = modules.find(module => module.id === resolve.value(id))

    if (m) {
      const { shortid } = m

      const newTab = {
        type: 'MODULE',
        moduleShortid: shortid,
        dirty: true,
      }
      const tabs = state.get('editor.tabs')

      if (tabs.length === 0) {
        state.push('editor.tabs', newTab)
      } else if (!tabs.some(tab => tab.moduleShortid === shortid)) {
        const dirtyTabIndex = tabs.findIndex(tab => tab.dirty)

        if (dirtyTabIndex >= 0) {
          state.splice('editor.tabs', dirtyTabIndex, 1, newTab)
        } else {
          state.splice('editor.tabs', 0, 0, newTab)
        }
      }
    }
  }
}

const trackedEvents = {}

export function track(e, args, { trackOnce } = { trackOnce: false }) {
  return () => {
    if (!trackOnce || !trackedEvents[e]) {
      trackAnalytics(e, args)

      if (trackOnce) {
        trackedEvents[e] = true
      }
    }

    return {}
  }
}

export function setCurrentModuleById(id) {
  // eslint-disable-next-line
  return function setCurrentModuleById({ state, resolve }) {
    const sandbox = state.get('editor.currentSandbox')
    const module = sandbox.modules.find(
      moduleEntry => moduleEntry.id === resolve.value(id),
    )

    if (module && state.get('editor.currentModuleShortid') !== module.shortid) {
      state.set('editor.currentModuleShortid', module.shortid)
    }
  }
}

export function setCurrentModule(id) {
  return sequence('setCurrentModule', [
    set(state`editor.currentTabId`, null),
    addTabById(id),
    setCurrentModuleById(id),
  ])
}

export function addNotification(title, notificationType, timeAlive) {
  return function addNotif({ resolve }) {
    notificationState.addNotification({
      message: resolve.value(title),
      status: convertTypeToStatus(resolve.value(notificationType)),
      timeAlive: resolve.value(timeAlive) * 1000,
    })
  }
}

export function updateSandboxUrl(sandbox) {
  // eslint-disable-next-line
  return function updateSandboxUrl({ router, resolve }) {
    router.updateSandboxUrl(resolve.value(sandbox))
  }
}

export function withLoadApp(continueSequence) {
  return sequence('loadApp', [
    when(state`hasLoadedApp`),
    {
      true: continueSequence,
      false: [
        set(state`isAuthenticating`, true),
        actions.setJwtFromStorage,
        actions.listenToConnectionChange,
        actions.setStoredSettings,
        actions.setKeybindings,
        actions.startKeybindings,
        setupCodeSandboxAPIListener,

        when(state`jwt`),
        {
          true: [
            parallel([
              sequence('loadUser', [
                actions.getUser,
                {
                  success: [
                    set(state`user`, props`user`),
                    actions.setPatronPrice,
                    actions.setSignedInCookie,
                    actions.connectWebsocket,
                    actions.showUserSurveyIfNeeded,
                    initializeNotifications,
                    actions.loadTemplatesForStartModal,
                  ],
                  error: [
                    addNotification(
                      'We weren\'t able to sign you in, this could be due to a flaky connection or something on our server. Please try again in a minute.',
                      'error',
                    ),
                  ],
                  unauthorized: [
                    addNotification(
                      'Your session seems to be expired, please try to log in again...',
                      'error',
                    ),
                    actions.removeJwtFromStorage,
                  ],
                },
              ]),
              continueSequence,
            ]),
          ],
          false: [
            actions.removeJwtFromStorage, // To delete the signedIn cookie as well, to be sure
            continueSequence,
          ],
        },
        set(state`hasLoadedApp`, true),
        set(state`isAuthenticating`, false),
        actions.getContributors,
      ],
    },
  ])
}
