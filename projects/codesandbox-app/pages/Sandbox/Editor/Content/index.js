import * as React from 'react'
import { json } from 'overmind'
import { ThemeProvider } from 'styled-components'
import { Prompt } from 'react-router-dom'
import { TextOperation } from 'ot'
import getTemplateDefinition from '@csb/common/lib/templates'
import SplitPane from 'react-split-pane'

import { CodeEditor } from '~/components/CodeEditor'
import { DevTools } from '~/components/Preview/DevTools'

import { Preview } from './Preview'
import preventGestureScroll, { removeListener } from './prevent-gesture-scroll'
import Tabs from './Tabs'
import { useOvermind } from '@muggle/hooks'

const settings = state => ({
  fontFamily: state.preferences.settings.fontFamily,
  fontSize: state.preferences.settings.fontSize,
  lineHeight: state.preferences.settings.lineHeight,
  autoCompleteEnabled: state.preferences.settings.autoCompleteEnabled,
  autoDownloadTypes: state.preferences.settings.autoDownloadTypes,
  vimMode: state.preferences.settings.vimMode,
  lintEnabled: state.preferences.settings.lintEnabled,
  codeMirror: state.preferences.settings.codeMirror,
  tabWidth: state.preferences.settings.prettierConfig
    ? state.preferences.settings.prettierConfig.tabWidth || 2
    : 2,
  enableLigatures: state.preferences.settings.enableLigatures,
  experimentVSCode: state.preferences.settings.experimentVSCode,
  prettierConfig: state.preferences.settings.prettierConfig,
  forceRefresh: state.preferences.settings.forceRefresh,
})

export default function EditorPreview(props) {
  const { state, actions } = useOvermind();
  const [bounds, setBounds] = React.useState({ width: null, height: null });
  let interval;
  let devtools;
  let contentNode;

  const getBounds = el => {
    if (el) {
      const { width, height } = el.getBoundingClientRect()
      if (width !== bounds.width || height !== bounds.height) {
        setBounds({ width, height })
      }
    }
  };

  const handleToggleDevtools = showDevtools => {
    if (devtools) {
      if (showDevtools) {
        devtools.openDevTools()
      } else {
        devtools.hideDevTools()
      }
    }
  }

  const onInitialized = editor => {
    let isChangingSandbox = false

    const disposeSandboxChangeHandler = props.reaction(
      ({ editor: { currentSandbox } }) => currentSandbox,
      newSandbox => {
        isChangingSandbox = !!editor.changeSandbox

        // Put in a timeout so we allow the actions after the fork to execute first as well.
        setTimeout(() => {
          if (editor.changeSandbox) {
            const { parsed } = state.editor.parsedConfigurations.package
            editor
              .changeSandbox(
                newSandbox,
                state.editor.currentModule,
                // eslint-disable-next-line
                parsed
                  ? parsed.dependencies
                  : newSandbox.npmDependencies.toJS
                    ? newSandbox.npmDependencies.toJS()
                    : json(newSandbox.npmDependencies),
              )
              .then(() => {
                isChangingSandbox = false
              })
          }
        })
      },
    )
    const disposeErrorsHandler = props.reaction(
      ({ editor: { errors } }) => errors.map(error => error),
      errors => {
        if (editor.setErrors) {
          editor.setErrors(errors)
        }
      },
    )
    const disposeCorrectionsHandler = props.reaction(
      ({ editor: { corrections } }) =>
        corrections.map(correction => correction),
      corrections => {
        if (editor.setCorrections) {
          editor.setCorrections(corrections)
        }
      },
    )
    const disposeModulesHandler = props.reaction(
      detectStructureChange,
      () => {
        if (isChangingSandbox) {
          return
        }
        if (editor.updateModules) {
          editor.updateModules()
        }
      },
    )
    const disposePreferencesHandler = props.reaction(
      state => settings(state),
      newSettings => {
        if (editor.changeSettings) {
          editor.changeSettings(newSettings)
        }
      },
      {
        compareStructural: true,
      },
    )
    const disposeResizeHandler = props.reaction(
      state => [
        state.preferences.settings.zenMode,
        state.workspace.workspaceHidden,
        state.editor.previewWindowOrientation,
      ],
      () => {
        setTimeout(() => {
          getBounds()
        })
      },
    )
    const disposePackageHandler = props.reaction(
      state => state.editor.parsedConfigurations.package,
      () => {
        const { parsed } = state.editor.parsedConfigurations.package
        if (parsed) {
          const { dependencies = {} } = parsed

          if (editor.changeDependencies) {
            editor.changeDependencies(dependencies)
          }
        }
      },
    )
    const disposeTSConfigHandler = props.reaction(
      state => state.editor.parsedConfigurations.typescript,
      () => {
        if (state.editor.parsedConfigurations.typescript) {
          const { parsed } = state.editor.parsedConfigurations.typescript
          if (parsed) {
            if (editor.setTSConfig) {
              editor.setTSConfig(parsed)
            }
          }
        }
      },
    )
    const disposeLiveHandler = props.reaction(
      state => state.live.receivingCode,
      () => {
        if (editor.setReceivingCode) {
          editor.setReceivingCode(state.live.receivingCode)
        }
      },
    )

    const disposeModuleSyncedHandler = props.reaction(
      state => state.editor.changedModuleShortids.map(shortid => shortid),
      () => {
        if (editor.moduleSyncedChanged) {
          editor.moduleSyncedChanged()
        }
      },
    )

    const disposePendingOperationHandler = props.reaction(
      state => clone(state.editor.pendingOperations),
      () => {
        if (state.live.isLive) {
          if (state.editor.pendingOperations) {
            if (editor.setReceivingCode) {
              editor.setReceivingCode(true)
            }
            if (editor.applyOperations) {
              editor.applyOperations(state.editor.pendingOperations)
            } else {
              try {
                state.editor.pendingOperations.forEach(
                  (operationJSON, moduleShortid) => {
                    const operation = TextOperation.fromJSON(operationJSON)

                    const module = state.currentSandbox.modules.find(
                      m => m.shortid === moduleShortid,
                    )

                    if (!module) {
                      throw new Error(
                        'Cannot find module with shortid: ' + moduleShortid,
                      )
                    }

                    actions.editor.codeChanged({
                      code: operation.apply(module.code || ''),
                      moduleShortid: module.shortid,
                    })
                  },
                )
              } catch (e) {
                console.error(e)
              }
            }
            if (editor.setReceivingCode) {
              editor.setReceivingCode(false)
            }
            actions.live.onOperationApplied()
          }
        }
      },
    )

    const updateUserSelections = () => {
      if (state.editor.pendingUserSelections) {
        if (editor.updateUserSelections) {
          if (state.live.isLive) {
            requestAnimationFrame(() => {
              editor.updateUserSelections(state.editor.pendingUserSelections)
              actions.live.onSelectionDecorationsApplied()
            })
          } else {
            actions.live.onSelectionDecorationsApplied()
          }
        }
      }
    }
    const disposeLiveSelectionHandler = props.reaction(
      state => state.editor.pendingUserSelections.map(x => x),
      updateUserSelections,
    )
    updateUserSelections()

    const disposeModuleHandler = props.reaction(
      state => [state.editor.currentModule, state.editor.currentModule.code],
      ([newModule]) => {
        if (isChangingSandbox) {
          return
        }

        const editorModule = editor.currentModule
        const currentSandbox = editor.sandbox
        const { changeModule } = editor
        if (
          (!editorModule || newModule.id !== editorModule.id) &&
          changeModule
        ) {
          const errors = state.editor.errors.map(e => e)
          const corrections = state.editor.corrections.map(e => e)

          if (
            currentSandbox.id !== state.editor.currentSandbox.id &&
            editor.changeSandbox
          ) {
            // This means that the sandbox will be updated soon in the editor itself, which will
            // cause the module to change anyway. We don't want to continue here because the new sandbox
            // has not yet been initialized in the editor, but it's trying already to update the module.
            return
          }

          changeModule(newModule, errors, corrections)
        } else if (editor.changeCode) {
          // Only code changed from outside the editor
          editor.changeCode(newModule.code || '', newModule.id)
        }
      },
    )
    const disposeToggleDevtools = props.reaction(
      state => state.preferences.showDevtools,
      showDevtools => {
        handleToggleDevtools(showDevtools)
      },
    )
    const disposeTogglePreview = props.reaction(
      state => state.editor.previewWindowVisible,
      () => {
        requestAnimationFrame(() => {
          getBounds()
        })
      },
    )

    return () => {
      disposeErrorsHandler()
      disposeCorrectionsHandler()
      disposeModulesHandler()
      disposePreferencesHandler()
      disposePackageHandler()
      disposeTSConfigHandler()
      disposeSandboxChangeHandler()
      disposeModuleHandler()
      disposeToggleDevtools()
      disposeResizeHandler()
      disposeLiveHandler()
      disposePendingOperationHandler()
      disposeLiveSelectionHandler()
      disposeTogglePreview()
      disposeModuleSyncedHandler()
    }
  }

  const detectStructureChange = ({ editor }) => {
    const sandbox = editor.currentSandbox

    return String(
      sandbox.modules
        .map(module => module.id + module.directoryShortid + module.title)
        .concat(
          sandbox.directories.map(
            directory => directory.directoryShortid + directory.title,
          ),
        ),
    )
  }

  const sendTransforms = operation => {
    const { currentModuleShortid } = props.overmind.state.editor

    actions.live.onTransformMade({
      moduleShortid: currentModuleShortid,
      operation: operation.toJSON(),
    })
  }

  const moveDevToolsTab = (prevPos, nextPos) => {
    actions.editor.onDevToolsTabMoved({ prevPos, nextPos })
  }

  const closeDevToolsTab = pos => {
    actions.editor.onDevToolsTabClosed({ pos })
  }

  React.useEffect(() => {
    actions.editor.contentMounted()

    // let disposeEditorChange = props.reaction(
    //   ({ preferences }) => preferences.settings.codeMirror,
    //   () => forceUpdate(),
    // )

    window.addEventListener('resize', getBounds)

    interval = setInterval(() => {
      getBounds()
    }, 1000)

    if (contentNode) {
      preventGestureScroll(contentNode)
    }

    return () => {
      // disposeEditorChange()
      window.removeEventListener('resize', getBounds)
      clearInterval(interval)

      if (contentNode) {
        removeListener(contentNode)
      }
    }
  });

  const { currentModule } = state.editor
  const notSynced = !state.editor.isAllModulesSynced
  const sandbox = state.editor.currentSandbox
  const { preferences } = state
  const { currentTab } = state.editor

  const windowVisible = state.editor.previewWindowVisible

  const { width: editorWidth, height: editorHeight } = bounds

  const template = getTemplateDefinition(sandbox.template)

  const isReadOnly = () => {
    if (state.live.isLive) {
      if (
        !state.live.isCurrentEditor ||
        (state.live.roomInfo && state.live.roomInfo.ownerIds.length === 0)
      ) {
        return true
      }
    }

    if (template.isServer) {
      if (!state.isLoggedIn || state.server.status !== 'connected') {
        return true
      }
    }

    return false
  }

  const views = state.editor.devToolTabs
  const currentPosition = props.overmind.state.editor.currentDevToolsPosition

  const browserConfig = {
    id: 'codesandbox.browser',
    title: options =>
      options.port || options.title
        ? `Browser (${options.title || `:${options.port}`})`
        : `Browser`,
    Content: ({ hidden, options }) => (
      <Preview options={options} hidden={hidden} width="100%" height="100%" />
    ),
    actions: [],
  }

  return (
    <ThemeProvider
      theme={{
        templateColor: template.color,
        templateBackgroundColor: template.backgroundColor,
      }}
    >
      <div
        id="workbench.main.container"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'visible', // For VSCode Context Menu
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={node => {
          if (node) {
            contentNode = node
          }
        }}
      >
        <Prompt
          when={notSynced && !state.editor.isForkingSandbox}
          message={() =>
            'You have not saved this sandbox, are you sure you want to navigate away?'
          }
        />
        <SplitPane
          maxSize={-100}
          onDragFinished={() => {
            actions.editor.resizingStopped()
          }}
          onDragStarted={() => {
            actions.editor.resizingStarted()
          }}
          onChange={() => {
            requestAnimationFrame(() => {
              getBounds()
            })
          }}
          style={{
            overflow: 'visible', // For VSCode Context Menu
          }}
          split={props.overmind.state.editor.previewWindowOrientation}
          defaultSize="50%"
          pane1Style={
            windowVisible
              ? {
                minWidth: 100,
              }
              : {
                width: '100%',
                minWidth: '100%',
                height: '100%',
                minHeight: '100%',
              }
          }
          pane2Style={{
            visibility: windowVisible ? 'visible' : 'hidden',
            maxWidth: windowVisible ? 'inherit' : 0,
            width: windowVisible ? 'inherit' : 0,
            zIndex: 0, // For VSCode hovers, beware this is also dynamically changed in PreviewTabs
          }}
        >
          <div
            ref={getBounds}
            style={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '100%',
              width: '100%',
              marginTop: 0,
            }}
          >
            {!state.preferences.settings.experimentVSCode && <Tabs/>}
            <CodeEditor
              style={{
                top: state.preferences.settings.experimentVSCode ? 0 : 35,
              }}
              onInitialized={onInitialized}
              sandbox={sandbox}
              currentTab={currentTab}
              currentModule={currentModule}
              isModuleSynced={shortId =>
                !state.editor.changedModuleShortids.includes(shortId)
              }
              width={editorWidth}
              height={editorHeight}
              settings={settings(state)}
              sendTransforms={sendTransforms}
              readOnly={isReadOnly()}
              isLive={state.live.isLive}
              onCodeReceived={actions.live.onCodeReceived}
              onSelectionChanged={actions.live.onSelectionChanged}
              onNpmDependencyAdded={name => {
                if (sandbox.owned) {
                  actions.editor.addNpmDependency({ name, isDev: true })
                }
              }}
              onChange={(code, moduleShortid) =>
                actions.editor.codeChanged({
                  code,
                  moduleShortid: moduleShortid || currentModule.shortid,
                  noLive: true,
                })
              }
              onModuleChange={moduleId =>
                actions.editor.moduleSelected({ id: moduleId })
              }
              onModuleStateMismatch={actions.live.onModuleStateMismatch}
              onSave={code =>
                actions.editor.codeSaved({
                  code,
                  moduleShortid: currentModule.shortid,
                })
              }
              tsconfig={
                state.editor.parsedConfigurations.typescript &&
                state.editor.parsedConfigurations.typescript.parsed
              }
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            id="csb-devtools" // used for tabs for highlighting
          >
            {views.map((v, i) => (
              <DevTools
                key={i} // eslint-disable-line react/no-array-index-key
                devToolIndex={i}
                addedViews={{
                  'codesandbox.browser': browserConfig,
                }}
                setDragging={dragging => {
                  if (dragging) {
                    actions.editor.resizingStarted()
                  } else {
                    actions.editor.resizingStopped()
                  }
                }}
                sandboxId={sandbox.id}
                template={sandbox.template}
                shouldExpandDevTools={state.preferences.showDevtools}
                zenMode={preferences.settings.zenMode}
                setDevToolsOpen={open =>
                  actions.preferences.setDevtoolsOpen({ open })
                }
                owned={sandbox.owned}
                primary={i === 0}
                viewConfig={v}
                moveTab={moveDevToolsTab}
                closeTab={closeDevToolsTab}
                currentDevToolIndex={currentPosition.devToolIndex}
                currentTabPosition={currentPosition.tabPosition}
                setPane={position =>
                  actions.editor.onDevToolsPositionChanged({
                    position,
                  })
                }
              />
            ))}
          </div>
        </SplitPane>
      </div>
    </ThemeProvider>
  )
}
