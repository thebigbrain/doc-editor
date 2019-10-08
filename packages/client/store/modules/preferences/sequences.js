import { equals, set, toggle, when } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import { getZeitUserDetails } from 'app/store/sequences'
import track from '@codesandbox/common/lib/utils/analytics'
import { setVimExtensionEnabled } from 'app/vscode/initializers'
import * as actions from './actions'
import { setKeybindings, startKeybindings } from '../../actions'

export const changeKeybinding = [
  actions.changeKeybinding,
  actions.storeKeybindings,
  setKeybindings,
]

export const toggleZenMode = toggle(state`preferences.settings.zenMode`)

export const forceCodeMirror = set(
  state`preferences.settings.codeMirror`,
  true,
)

export const setDevtoolsOpen = set(
  state`preferences.showDevtools`,
  props`open`,
)
export const toggleDevtools = toggle(state`preferences.showDevtools`)

export const changeItemId = [
  set(state`preferences.itemId`, props`itemId`),
  equals(props`itemId`),
  {
    integrations: getZeitUserDetails,
    otherwise: [],
  },
  equals(props`itemId`),
  {
    keybindings: actions.pauseKeybindings,
    otherwise: startKeybindings,
  },
]

export const setSetting = [
  set(state`preferences.settings.${props`name`}`, props`value`),
  equals(props`name`),
  {
    vimMode: [
      ({ props: usedProps }) => {
        setVimExtensionEnabled(usedProps.value)
        return {}
      },
    ],
    otherwise: [],
  },
  actions.storeSetting,
  ({ props: p }) => {
    track('Change Settings', { name: p.name, value: p.value })
  },
]

export const setBadgeVisibility = [
  actions.setBadgeVisibility,
  actions.updateBadgeInfo,
]

export const getPaymentDetails = [
  actions.getPaymentDetails,
  when(props`data`),
  {
    true: [set(state`preferences.paymentDetails`, props`data`)],
    false: [set(state`preferences.paymentDetailError`, props`error.message`)],
  },
  set(state`preferences.paymentDetails`, props`data`),
  set(state`preferences.isLoadingPaymentDetails`, false),
]

export const updatePaymentDetails = [
  set(state`preferences.isLoadingPaymentDetails`, true),
  actions.updatePaymentDetails,
  set(state`preferences.paymentDetails`, props`data`),
  set(state`preferences.isLoadingPaymentDetails`, false),
]
