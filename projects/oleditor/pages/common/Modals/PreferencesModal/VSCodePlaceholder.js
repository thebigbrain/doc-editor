import React from 'react'
import { Route } from 'react-router-dom'

// import { vscode } from '~/vscode'
import { Button } from '@csb/common/lib/components/Button'
import { editorUrl } from '@csb/common/lib/utils/url-generator'
import {useOvermind} from '@muggle/hooks'

const VSCodePlaceholder = ({ children, hideTitle }) => {
  const {state, actions} = useOvermind()
  if (state.preferences.settings.experimentVSCode) {
    const openCommand = () => {
      // vscode.runCommand('workbench.action.openSettings2').then(() => {
      //   actions.modalClosed()
      // })
    }

    return hideTitle ? null : (
      <div
        style={{
          fontSize: '.875rem',
          fontStyle: 'italic',
          color: 'rgba(255, 255, 255, 0.5)',
          lineHeight: 1.4,
          fontWeight: 500,
          marginBottom: '1.5rem',
        }}
      >
        Some options are disabled because they are handled by VSCode. You can
        open the settings of VSCode by pressing {'\''}
        CTRL/CMD + ,{'\''}.
        <Route path={editorUrl()}>
          {res =>
            res.match && (
              <div style={{ marginTop: '1rem' }}>
                <Button small onClick={openCommand}>
                  Open VSCode Settings
                </Button>
              </div>
            )
          }
        </Route>
      </div>
    )
  }

  return children
}

export default VSCodePlaceholder
