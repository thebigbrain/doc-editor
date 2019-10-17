import * as React from 'react'
import { json } from 'overmind'
import { ThemeProvider } from 'styled-components'
import { Prompt } from 'react-router-dom'
import { TextOperation } from 'ot'
import getTemplateDefinition from '@csb/common/lib/templates'
import SplitPane from 'react-split-pane'

import { CodeEditor } from '~/components/CodeEditor'
// import { DevTools } from '~/components/Preview/DevTools'

import { Preview } from './Preview'
import preventGestureScroll, { removeListener } from './prevent-gesture-scroll'
// import Tabs from './Tabs'
import { withOvermind } from '~/overmind'

const settings = store => ({
  fontFamily: store.preferences.settings.fontFamily,
  fontSize: store.preferences.settings.fontSize,
  lineHeight: store.preferences.settings.lineHeight,
  autoCompleteEnabled: store.preferences.settings.autoCompleteEnabled,
  autoDownloadTypes: store.preferences.settings.autoDownloadTypes,
  vimMode: store.preferences.settings.vimMode,
  lintEnabled: store.preferences.settings.lintEnabled,
  codeMirror: store.preferences.settings.codeMirror,
  tabWidth: store.preferences.settings.prettierConfig
    ? store.preferences.settings.prettierConfig.tabWidth || 2
    : 2,
  enableLigatures: store.preferences.settings.enableLigatures,
  experimentVSCode: store.preferences.settings.experimentVSCode,
  prettierConfig: store.preferences.settings.prettierConfig,
  forceRefresh: store.preferences.settings.forceRefresh,
})

class EditorPreview extends React.Component {
  state = { width: null, height: null }
  interval
  disposeEditorChange
  el
  devtools
  contentNode
  getBounds = el => {
    if (el) {
      this.el = this.el || el
    }
    if (this.el) {
      const { width, height } = this.el.getBoundingClientRect()
      if (width !== this.state.width || height !== this.state.height) {
        this.setState({ width, height })
      }
    }
  }
  handleToggleDevtools = showDevtools => {
    if (this.devtools) {
      if (showDevtools) {
        this.devtools.openDevTools()
      } else {
        this.devtools.hideDevTools()
      }
    }
  }
  onInitialized = editor => {
    const { store } = this.props
    let isChangingSandbox = false

    const disposeSandboxChangeHandler = this.props.reaction(
      ({ editor: { currentSandbox } }) => currentSandbox,
      newSandbox => {
        isChangingSandbox = !!editor.changeSandbox

        // Put in a timeout so we allow the actions after the fork to execute first as well.
        setTimeout(() => {
          if (editor.changeSandbox) {
            const { parsed } = store.editor.parsedConfigurations.package
            editor
              .changeSandbox(
                newSandbox,
                store.editor.currentModule,
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
    const disposeErrorsHandler = this.props.reaction(
      ({ editor: { errors } }) => errors.map(error => error),
      errors => {
        if (editor.setErrors) {
          editor.setErrors(errors)
        }
      },
    )
    const disposeCorrectionsHandler = this.props.reaction(
      ({ editor: { corrections } }) =>
        corrections.map(correction => correction),
      corrections => {
        if (editor.setCorrections) {
          editor.setCorrections(corrections)
        }
      },
    )
    const disposeModulesHandler = this.props.reaction(
      this.detectStructureChange,
      () => {
        if (isChangingSandbox) {
          return
        }
        if (editor.updateModules) {
          editor.updateModules()
        }
      },
    )
    const disposePreferencesHandler = this.props.reaction(
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
    const disposeResizeHandler = this.props.reaction(
      state => [
        state.preferences.settings.zenMode,
        state.workspace.workspaceHidden,
        state.editor.previewWindowOrientation,
      ],
      () => {
        setTimeout(() => {
          this.getBounds()
        })
      },
    )
    const disposePackageHandler = this.props.reaction(
      state => state.editor.parsedConfigurations.package,
      () => {
        const { parsed } = store.editor.parsedConfigurations.package
        if (parsed) {
          const { dependencies = {} } = parsed

          if (editor.changeDependencies) {
            editor.changeDependencies(dependencies)
          }
        }
      },
    )
    const disposeTSConfigHandler = this.props.reaction(
      state => state.editor.parsedConfigurations.typescript,
      () => {
        if (store.editor.parsedConfigurations.typescript) {
          const { parsed } = store.editor.parsedConfigurations.typescript
          if (parsed) {
            if (editor.setTSConfig) {
              editor.setTSConfig(parsed)
            }
          }
        }
      },
    )
    const disposeLiveHandler = this.props.reaction(
      state => state.live.receivingCode,
      () => {
        if (editor.setReceivingCode) {
          editor.setReceivingCode(store.live.receivingCode)
        }
      },
    )

    const disposeModuleSyncedHandler = this.props.reaction(
      state => state.editor.changedModuleShortids.map(shortid => shortid),
      () => {
        if (editor.moduleSyncedChanged) {
          editor.moduleSyncedChanged()
        }
      },
    )

    const disposePendingOperationHandler = this.props.reaction(
      state => clone(state.editor.pendingOperations),
      () => {
        if (store.live.isLive) {
          if (store.editor.pendingOperations) {
            if (editor.setReceivingCode) {
              editor.setReceivingCode(true)
            }
            if (editor.applyOperations) {
              editor.applyOperations(store.editor.pendingOperations)
            } else {
              try {
                store.editor.pendingOperations.forEach(
                  (operationJSON, moduleShortid) => {
                    const operation = TextOperation.fromJSON(operationJSON)

                    const module = store.currentSandbox.modules.find(
                      m => m.shortid === moduleShortid,
                    )

                    if (!module) {
                      throw new Error(
                        'Cannot find module with shortid: ' + moduleShortid,
                      )
                    }

                    this.props.signals.editor.codeChanged({
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
            this.props.signals.live.onOperationApplied()
          }
        }
      },
    )

    const updateUserSelections = () => {
      if (store.editor.pendingUserSelections) {
        if (editor.updateUserSelections) {
          if (store.live.isLive) {
            requestAnimationFrame(() => {
              editor.updateUserSelections(store.editor.pendingUserSelections)
              this.props.signals.live.onSelectionDecorationsApplied()
            })
          } else {
            this.props.signals.live.onSelectionDecorationsApplied()
          }
        }
      }
    }
    const disposeLiveSelectionHandler = this.props.reaction(
      state => state.editor.pendingUserSelections.map(x => x),
      updateUserSelections,
    )
    updateUserSelections()

    const disposeModuleHandler = this.props.reaction(
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
          const errors = store.editor.errors.map(e => e)
          const corrections = store.editor.corrections.map(e => e)

          if (
            currentSandbox.id !== store.editor.currentSandbox.id &&
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
    const disposeToggleDevtools = this.props.reaction(
      state => state.preferences.showDevtools,
      showDevtools => {
        this.handleToggleDevtools(showDevtools)
      },
    )
    const disposeTogglePreview = this.props.reaction(
      state => state.editor.previewWindowVisible,
      () => {
        requestAnimationFrame(() => {
          this.getBounds()
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
  detectStructureChange = ({ editor }) => {
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
  sendTransforms = operation => {
    const { currentModuleShortid } = this.props.overmind.state.editor

    this.props.signals.live.onTransformMade({
      moduleShortid: currentModuleShortid,
      operation: operation.toJSON(),
    })
  }
  moveDevToolsTab = (prevPos, nextPos) => {
    const { signals } = this.props

    signals.editor.onDevToolsTabMoved({ prevPos, nextPos })
  }
  closeDevToolsTab = pos => {
    const { signals } = this.props

    signals.editor.onDevToolsTabClosed({ pos })
  }

  componentDidMount() {
    this.props.signals.editor.contentMounted()
    this.disposeEditorChange = this.props.reaction(
      ({ preferences }) => preferences.settings.codeMirror,
      () => this.forceUpdate(),
    )

    window.addEventListener('resize', this.getBounds)

    this.interval = setInterval(() => {
      this.getBounds()
    }, 1000)

    if (this.contentNode) {
      preventGestureScroll(this.contentNode)
    }
  }

  componentWillUnmount() {
    this.disposeEditorChange()
    window.removeEventListener('resize', this.getBounds)
    clearInterval(this.interval)

    if (this.contentNode) {
      removeListener(this.contentNode)
    }
  }

  render() {
    const { actions: signals, state: store } = this.props.overmind
    const { currentModule } = store.editor
    const notSynced = !store.editor.isAllModulesSynced
    const sandbox = store.editor.currentSandbox
    const { preferences } = store
    const { currentTab } = store.editor

    const windowVisible = store.editor.previewWindowVisible

    const { width: editorWidth, height: editorHeight } = this.state

    const template = getTemplateDefinition(sandbox.template)

    const isReadOnly = () => {
      if (store.live.isLive) {
        if (
          !store.live.isCurrentEditor ||
          (store.live.roomInfo && store.live.roomInfo.ownerIds.length === 0)
        ) {
          return true
        }
      }

      if (template.isServer) {
        if (!store.isLoggedIn || store.server.status !== 'connected') {
          return true
        }
      }

      return false
    }

    const views = store.editor.devToolTabs
    const currentPosition = this.props.overmind.state.editor.currentDevToolsPosition

    const browserConfig = {
      id: 'codesandbox.browser',
      title: options =>
        options.port || options.title
          ? `Browser (${options.title || `:${options.port}`})`
          : `Browser`,
      Content: ({ hidden, options }) => (
        <Preview options={options} hidden={hidden} width="100%" height="100%"/>
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
              this.contentNode = node
            }
          }}
        >
          <Prompt
            when={notSynced && !store.editor.isForkingSandbox}
            message={() =>
              'You have not saved this sandbox, are you sure you want to navigate away?'
            }
          />
          <SplitPane
            maxSize={-100}
            onDragFinished={() => {
              this.props.signals.editor.resizingStopped()
            }}
            onDragStarted={() => {
              this.props.signals.editor.resizingStarted()
            }}
            onChange={() => {
              requestAnimationFrame(() => {
                this.getBounds()
              })
            }}
            style={{
              overflow: 'visible', // For VSCode Context Menu
            }}
            split={this.props.overmind.state.editor.previewWindowOrientation}
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
              ref={this.getBounds}
              style={{
                position: 'relative',
                display: 'flex',
                flex: 1,
                height: '100%',
                width: '100%',
                marginTop: 0,
              }}
            >
              {/*{!store.preferences.settings.experimentVSCode && <Tabs/>}*/}
              <CodeEditor
                style={{
                  top: store.preferences.settings.experimentVSCode ? 0 : 35,
                }}
                onInitialized={this.onInitialized}
                sandbox={sandbox}
                currentTab={currentTab}
                currentModule={currentModule}
                isModuleSynced={shortId =>
                  !store.editor.changedModuleShortids.includes(shortId)
                }
                width={editorWidth}
                height={editorHeight}
                settings={settings(store)}
                sendTransforms={this.sendTransforms}
                readOnly={isReadOnly()}
                isLive={store.live.isLive}
                onCodeReceived={signals.live.onCodeReceived}
                onSelectionChanged={signals.live.onSelectionChanged}
                onNpmDependencyAdded={name => {
                  if (sandbox.owned) {
                    signals.editor.addNpmDependency({ name, isDev: true })
                  }
                }}
                onChange={(code, moduleShortid) =>
                  signals.editor.codeChanged({
                    code,
                    moduleShortid: moduleShortid || currentModule.shortid,
                    noLive: true,
                  })
                }
                onModuleChange={moduleId =>
                  signals.editor.moduleSelected({ id: moduleId })
                }
                onModuleStateMismatch={signals.live.onModuleStateMismatch}
                onSave={code =>
                  signals.editor.codeSaved({
                    code,
                    moduleShortid: currentModule.shortid,
                  })
                }
                tsconfig={
                  store.editor.parsedConfigurations.typescript &&
                  store.editor.parsedConfigurations.typescript.parsed
                }
              />
            </div>

            {/*<div*/}
              {/*style={{*/}
                {/*display: 'flex',*/}
                {/*flexDirection: 'column',*/}
                {/*height: '100%',*/}
              {/*}}*/}
              {/*id="csb-devtools" // used for tabs for highlighting*/}
            {/*>*/}
              {/*{views.map((v, i) => (*/}
                {/*<DevTools*/}
                  {/*key={i} // eslint-disable-line react/no-array-index-key*/}
                  {/*devToolIndex={i}*/}
                  {/*addedViews={{*/}
                    {/*'codesandbox.browser': browserConfig,*/}
                  {/*}}*/}
                  {/*setDragging={dragging => {*/}
                    {/*if (dragging) {*/}
                      {/*this.props.signals.editor.resizingStarted()*/}
                    {/*} else {*/}
                      {/*this.props.signals.editor.resizingStopped()*/}
                    {/*}*/}
                  {/*}}*/}
                  {/*sandboxId={sandbox.id}*/}
                  {/*template={sandbox.template}*/}
                  {/*shouldExpandDevTools={store.preferences.showDevtools}*/}
                  {/*zenMode={preferences.settings.zenMode}*/}
                  {/*setDevToolsOpen={open =>*/}
                    {/*this.props.signals.preferences.setDevtoolsOpen({ open })*/}
                  {/*}*/}
                  {/*owned={sandbox.owned}*/}
                  {/*primary={i === 0}*/}
                  {/*viewConfig={v}*/}
                  {/*moveTab={this.moveDevToolsTab}*/}
                  {/*closeTab={this.closeDevToolsTab}*/}
                  {/*currentDevToolIndex={currentPosition.devToolIndex}*/}
                  {/*currentTabPosition={currentPosition.tabPosition}*/}
                  {/*setPane={position =>*/}
                    {/*this.props.signals.editor.onDevToolsPositionChanged({*/}
                      {/*position,*/}
                    {/*})*/}
                  {/*}*/}
                {/*/>*/}
              {/*))}*/}
            {/*</div>*/}
          </SplitPane>
        </div>
      </ThemeProvider>
    )
  }
}

export default withOvermind(EditorPreview)
