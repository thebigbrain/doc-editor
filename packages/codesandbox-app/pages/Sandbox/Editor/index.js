import * as React from 'react'
import SplitPane from 'react-split-pane'
import styled, {ThemeProvider} from 'styled-components'
import {templateColor} from '~/utils/template-color'
import Fullscreen from '@codesandbox/common/lib/components/flex/Fullscreen'
import getTemplateDefinition from '@codesandbox/common/lib/templates'
import codesandbox from '@codesandbox/common/lib/themes/codesandbox.json'

// import ForkFrozenSandboxModal from './ForkFrozenSandboxModal'
import {Container} from './elements'
import {Workspace} from './Workspace/index'
// import Content from './Content'
import {Header} from './Header'
import {Navigation} from './Navigation'
import getVSCodeTheme from './utils/get-vscode-theme'
import {useOvermind} from '~/overmind'

const STATUS_BAR_SIZE = 22

const StatusBar = styled.div`
  a {
    color: inherit;
  }
`

function ContentSplit(props) {
  const {state, actions} = useOvermind()
  const customVSCodeTheme = state.preferences.settings.customVSCodeTheme
  const [theme, setTheme] = React.useState({
    colors: {},
    vscodeTheme: codesandbox,
  })

  React.useEffect(() => {
    let aborted = false
    getVSCodeTheme('', customVSCodeTheme)
      .then(() => {
        if (aborted) return null
        setTheme(theme)
      })
      .catch(console.error)

    return () => {
      aborted = true
    }
  }, [customVSCodeTheme])

  const {match} = props
  const sandbox = state.editor.currentSandbox

  const vscode = state.preferences.settings.experimentVSCode

  const hideNavigation =
    state.preferences.settings.zenMode && state.workspace.workspaceHidden

  const {statusBar} = state.editor

  const templateDef = sandbox && getTemplateDefinition(sandbox.template)

  const topOffset = state.preferences.settings.zenMode ? 0 : 3 * 16
  const bottomOffset = vscode ? STATUS_BAR_SIZE : 0

  return (
    <ThemeProvider
      theme={{
        templateColor: templateColor(sandbox, templateDef),
        templateBackgroundColor: templateDef && templateDef.backgroundColor,
        ...theme,
      }}
    >
      <Container
        style={{lineHeight: 'initial'}}
        className="monaco-workbench"
      >
        <Header zenMode={state.preferences.settings.zenMode}/>

        <Fullscreen style={{width: 'initial'}}>
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
              onDragStarted={() => actions.editor.resizingStarted()}
              onDragFinished={() => actions.editor.resizingStopped()}
              onChange={size => {
                if (size > 0 && state.workspace.workspaceHidden) {
                  actions.workspace.setWorkspaceHidden({hidden: false})
                } else if (size === 0 && !state.workspace.workspaceHidden) {
                  actions.workspace.setWorkspaceHidden({hidden: true})
                }
              }}
              pane1Style={{
                visibility: state.workspace.workspaceHidden
                  ? 'hidden'
                  : 'visible',
                maxWidth: state.workspace.workspaceHidden ? 0 : 'inherit',
              }}
              pane2Style={{
                height: '100%',
              }}
              style={{
                overflow: 'visible', // For VSCode Context Menu
              }}
            >
              {state.workspace.workspaceHidden ? <div/> : <Workspace/>}
              {/*<Content match={match}/>*/}
              <div>content here...</div>
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
        {/*<ForkFrozenSandboxModal/>*/}
      </Container>
    </ThemeProvider>
  )

}

export default ContentSplit
