import { equals, increment, set, toggle, when } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import * as actions from './actions'
import { callVSCodeCallback, callVSCodeCallbackError, closeTabByIndex } from '../../actions'
import { createModulesByPath, renameModule } from '../files/sequences'
import {
  getCodeOperation,
  getSelectionsForCurrentModule,
  sendChangeCurrentModule,
  sendModuleSaved,
  sendTransform,
  setReceivingStatus,
  unSetReceivingStatus,
} from '../live/actions'
import { closeModal, ensureOwnedEditable, fetchGitChanges, forkSandbox } from '../../sequences'

import { addNotification, setCurrentModule, track } from '../../factories'

export const openQuickActions = set(state`editor.quickActionsOpen`, true)

export const closeQuickActions = set(state`editor.quickActionsOpen`, false)

export const toggleStatusBar = toggle(state`editor.statusBar`)

export const toggleProjectView = toggle(state`editor.isInProjectView`)

const hasEnoughTabs = when(state`editor.tabs`, tabs => tabs.length > 1)

export const closeTab = [
  hasEnoughTabs,
  {
    false: [],
    true: [closeTabByIndex, actions.setCurrentModuleByTab],
  },
]

export const clearErrors = [set(state`editor.errors`, [])]

export const { moveTab } = actions

export const onUnload = actions.warnUnloadingContent

export const startResizing = set(state`editor.isResizing`, true)

export const stopResizing = set(state`editor.isResizing`, false)

export const { createZip } = actions

export const fetchEnvironmentVariables = [
  actions.fetchEnvironmentVariables,
  {
    success: [],
  },
]
export const updateEnvironmentVariables = [
  actions.updateEnvironmentVariables,
  {
    success: [actions.restartSandbox],
  },
]
export const deleteEnvironmentVariable = [
  actions.deleteEnvironmentVariable,
  {
    success: [actions.restartSandbox],
  },
]

export const clearCurrentModule = [
  set(state`editor.currentModuleShortid`, null),
]

export const changeCurrentModule = [
  track('Open File', {}),
  setReceivingStatus,
  actions.getIdFromModulePath,
  when(props`id`),
  {
    true: [
      setCurrentModule(props`id`),
      equals(state`live.isLive`),
      {
        true: [
          equals(state`live.isCurrentEditor`),
          {
            true: [
              getSelectionsForCurrentModule,
              set(state`editor.pendingUserSelections`, props`selections`),
              sendChangeCurrentModule,
            ],
            false: [],
          },
        ],
        false: [],
      },
    ],
    false: [clearCurrentModule],
  },
]

export const changeCurrentTab = [set(state`editor.currentTabId`, props`tabId`)]

export const { unsetDirtyTab } = actions

export const updatePrivacy = [
  actions.ensureValidPrivacy,
  {
    valid: [
      set(state`editor.isUpdatingPrivacy`, true),
      actions.updatePrivacy,
      set(state`editor.isUpdatingPrivacy`, false),
    ],
    invalid: [],
  },
]

export const { updateFrozen } = actions

export const sessionFreezeOverride = set(
  state`editor.sessionFrozen`,
  props`frozen`,
)

export const toggleLikeSandbox = [
  when(state`editor.sandboxes.${props`id`}.userLiked`),
  {
    true: [
      actions.unlikeSandbox,
      increment(state`editor.sandboxes.${props`id`}.likeCount`, -1),
    ],
    false: [
      actions.likeSandbox,
      increment(state`editor.sandboxes.${props`id`}.likeCount`, 1),
    ],
  },
  toggle(state`editor.sandboxes.${props`id`}.userLiked`),
]

export const forkSandboxOnDemand = [forkSandbox]

export const forceForkSandbox = [
  when(
    state`editor.currentSandbox.owned`,
    state`editor.currentSandbox.customTemplate`,
    // Only show modal if you own the sandbox and it isn't a custom template
    (owned, customTemplate) => owned && !customTemplate,
  ),
  {
    true: [
      actions.confirmForkingOwnSandbox,
      {
        confirmed: forkSandbox,
        cancelled: [],
      },
    ],
    false: forkSandbox,
  },
]

export const changeCode = [
  track('Change Code', {}, { trackOnce: true }),

  when(
    state`live.isLive`,
    props`noLive`,
    (isLive, noLive) => isLive && !noLive,
  ),
  {
    true: [
      setReceivingStatus,
      getCodeOperation,
      sendTransform,
      actions.setCode,
      unSetReceivingStatus,
    ],
    false: actions.setCode,
  },

  actions.addChangedModule,
  actions.unsetDirtyTab,

  actions.sendChangesToExecutor,
]

export const saveChangedModules = [
  ensureOwnedEditable,
  actions.outputChangedModules,
  actions.saveChangedModules,
  actions.removeChangedModules,
  when(state`editor.currentSandbox.originalGit`),
  {
    true: [
      when(state`workspace.openedWorkspaceItem`, item => item === 'github'),
      {
        true: fetchGitChanges,
        false: [],
      },
    ],
    false: [],
  },
]

export const prettifyCode = [
  track('Prettify Code', {}),
  actions.prettifyCode,
  {
    success: [changeCode],
    invalidPrettierSandboxConfig: addNotification(
      'Invalid JSON in sandbox .prettierrc file',
      'error',
    ),
    error: [],
  },
]

export const saveCode = [
  track('Save Code', {}),
  ensureOwnedEditable,
  when(state`preferences.settings.experimentVSCode`),
  {
    true: [
      changeCode, // Call this to send the live changes before saving
    ],
    false: [
      when(state`preferences.settings.prettifyOnSaveEnabled`),
      {
        true: [prettifyCode],
        false: [],
      },
    ],
  },

  actions.saveModuleCode,
  {
    success: [
      actions.setModuleSaved,
      callVSCodeCallback,
      when(state`editor.currentSandbox.originalGit`),
      {
        true: [
          when(state`workspace.openedWorkspaceItem`, item => item === 'github'),
          {
            true: fetchGitChanges,
            false: [],
          },
        ],
        false: [],
      },
      sendModuleSaved,

      actions.updateTemplateIfSSE,
      actions.sendChangesToExecutor,
    ],

    error: [callVSCodeCallbackError],
    codeOutdated: [callVSCodeCallback],
  },
]

export const discardModuleChanges = [
  track('Code Discarded', {}),
  actions.getSavedCode,
  when(props`code`),
  {
    true: [changeCode, actions.touchFile],
    false: [],
  },
]

export const addNpmDependency = [
  track('Add NPM Dependency', {}),
  closeModal,
  ensureOwnedEditable,
  when(props`version`),
  {
    true: [],
    false: [actions.getLatestVersion],
  },
  actions.addNpmDependencyToPackage,
  saveCode,
]

export const removeNpmDependency = [
  track('Remove NPM Dependency', {}),
  ensureOwnedEditable,
  actions.removeNpmDependencyFromPackage,
  saveCode,
]

export const updateSandboxPackage = [actions.updateSandboxPackage, saveCode]

export const handlePreviewAction = [
  equals(props`action.action`),
  {
    notification: addNotification(
      props`action.title`,
      props`action.notificationType`,
      props`action.timeAlive`,
    ),
    'show-error': actions.addErrorFromPreview,
    'show-correction': actions.addCorrectionFromPreview,
    'clear-errors': actions.clearErrors,
    'clear-corrections': actions.clearCorrections,
    'source.module.rename': [
      actions.consumeRenameModuleFromPreview,
      renameModule,
    ],
    'source.dependencies.add': [
      set(props`name`, props`action.dependency`),
      addNpmDependency,
      actions.forceRender,
    ],
    otherwise: [],
  },
]

export const togglePreview = [toggle(state`editor.previewWindowVisible`)]

export const setPreviewContent = [
  // empty
]

export const toggleEditorPreviewLayout = [
  equals(state`editor.previewWindowOrientation`),
  {
    horizontal: [set(state`editor.previewWindowOrientation`, 'vertical')],
    vertical: [set(state`editor.previewWindowOrientation`, 'horizontal')],
  },
]

export const onNavigateAway = []

export const updateDevTools = [
  when(state`editor.currentSandbox.owned`),
  {
    true: [
      actions.getDevToolsTabs,
      when(props`devToolsModule`, x => !!x),
      {
        true: [
          set(props`moduleShortid`, props`devToolsModule.shortid`),
          saveCode,
        ],
        false: [
          ({ props: actionProps }) => ({
            files: {
              '/.codesandbox/workspace.json': {
                content: actionProps.code,
                isBinary: false,
              },
            },
          }),

          createModulesByPath,
        ],
      },
    ],
    false: [set(state`editor.workspaceConfigCode`, props`code`)],
  },
]

export const setDevToolPosition = [
  set(state`editor.currentDevToolsPosition`, props`position`),
]

export const addDevToolsTab = [
  actions.addDevToolsTab,
  updateDevTools,
  actions.setCurrentTabToChangedTab,
]
export const moveDevToolsTab = [
  actions.moveDevToolsTab,
  updateDevTools,
  actions.setCurrentTabToChangedTab,
]
export const closeDevToolsTab = [actions.closeDevToolsTab, updateDevTools]

/**
 * Open existing tab if exists, otherwise create new tab
 */
export const openDevToolsTab = [
  actions.getDevToolsTab,
  when(props`nextPos`, n => !!n),
  {
    true: [actions.setCurrentTabToChangedTab],
    false: [addDevToolsTab],
  },
]
