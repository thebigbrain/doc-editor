import * as React from 'react'
import SplitPane from 'react-split-pane'
import { inject, observer } from 'app/componentConnectors'
import styled, { ThemeProvider } from 'styled-components'
import { templateColor } from 'app/utils/template-color'
import Fullscreen from '@codesandbox/common/lib/components/flex/Fullscreen'
import getTemplateDefinition from '@codesandbox/common/lib/templates'
import codesandbox from '@codesandbox/common/lib/themes/codesandbox.json'

import ForkFrozenSandboxModal from './ForkFrozenSandboxModal'
import { Container } from './elements'
import { Workspace } from './Workspace'
import Content from './Content'
import { Header } from './Header'
import { Navigation } from './Navigation'
import getVSCodeTheme from './utils/get-vscode-theme'

const STATUS_BAR_SIZE = 22

const StatusBar = styled.div`
  a {
    color: inherit;
  }
`

class ContentSplit extends React.Component {
  state = {
    theme: {
      colors: {},
      vscodeTheme: codesandbox,
    },
    customVSCodeTheme: this.props.store.preferences.settings.customVSCodeTheme,
  }
  loadTheme = async () => {
    const { customVSCodeTheme } = this.props.store.preferences.settings

    try {
      const theme = await getVSCodeTheme('', customVSCodeTheme)
      this.setState({ theme, customVSCodeTheme })
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    this.loadTheme()
  }

  componentDidUpdate() {
    if (
      this.props.store.preferences.settings.customVSCodeTheme !==
      this.state.customVSCodeTheme
    ) {
      this.loadTheme()
    }
  }

  render() {
    const { signals, store, match } = this.props
    const sandbox = store.editor.currentSandbox

    // Force MobX to update this component by observing the following value
    this.props.store.preferences.settings.customVSCodeTheme // eslint-disable-line

    const vscode = this.props.store.preferences.settings.experimentVSCode

    const hideNavigation =
      store.preferences.settings.zenMode && store.workspace.workspaceHidden

    const { statusBar } = store.editor

    const templateDef = sandbox && getTemplateDefinition(sandbox.template)

    const topOffset = store.preferences.settings.zenMode ? 0 : 3 * 16
    const bottomOffset = vscode ? STATUS_BAR_SIZE : 0

    return (
      <ThemeProvider
        theme={{
          templateColor: templateColor(sandbox, templateDef),
          templateBackgroundColor: templateDef && templateDef.backgroundColor,
          ...this.state.theme,
        }}
      >
        <Container
          style={{ lineHeight: 'initial' }}
          className="monaco-workbench"
        >
          <Header zenMode={store.preferences.settings.zenMode}/>

          <Fullscreen style={{ width: 'initial' }}>
            {!hideNavigation && (
              <Navigation topOffset={topOffset} bottomOffset={bottomOffset}/>
            )}

            <div
              style={{
                position: 'fixed',
                left: hideNavigation ? 0 : 'calc(3.5rem + 1px)',
                top: topOffset,
                right: 0,
                bottom: bottomOffset,
                height: statusBar ? 'auto' : 'calc(100% - 3.5rem)',
              }}
            >
              <SplitPane
                split="vertical"
                defaultSize={17 * 16}
                minSize={0}
                onDragStarted={() => signals.editor.resizingStarted()}
                onDragFinished={() => signals.editor.resizingStopped()}
                onChange={size => {
                  if (size > 0 && store.workspace.workspaceHidden) {
                    signals.workspace.setWorkspaceHidden({ hidden: false })
                  } else if (size === 0 && !store.workspace.workspaceHidden) {
                    signals.workspace.setWorkspaceHidden({ hidden: true })
                  }
                }}
                pane1Style={{
                  visibility: store.workspace.workspaceHidden
                    ? 'hidden'
                    : 'visible',
                  maxWidth: store.workspace.workspaceHidden ? 0 : 'inherit',
                }}
                pane2Style={{
                  height: '100%',
                }}
                style={{
                  overflow: 'visible', // For VSCode Context Menu
                }}
              >
                {store.workspace.workspaceHidden ? <div/> : <Workspace/>}
                <Content match={match}/>
              </SplitPane>

              {vscode && (
                <StatusBar
                  style={{
                    position: 'fixed',
                    display: statusBar ? 'block' : 'none',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: STATUS_BAR_SIZE,
                  }}
                  className="monaco-workbench mac nopanel"
                >
                  <div
                    className="part statusbar"
                    id="workbench.parts.statusbar"
                  />
                </StatusBar>
              )}
            </div>
          </Fullscreen>
          <ForkFrozenSandboxModal/>
        </Container>
      </ThemeProvider>
    )
  }
}

export default inject('signals', 'store')(observer(ContentSplit))
