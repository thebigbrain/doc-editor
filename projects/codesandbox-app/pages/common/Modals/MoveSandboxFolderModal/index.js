import React from 'react'
import { basename } from 'path'
import track from '@csb/common/lib/utils/analytics'
import { Button } from '@csb/common/lib/components/Button'
import {ChevronRight} from '@muggle/icons'

import DirectoryPicker from './DirectoryPicker'
import { Container } from '../elements'

import { Block, CancelButton } from './elements'
import { addSandboxesToFolder } from '../../../Dashboard/queries'
import { withOvermind } from '@muggle/hooks'

class MoveSandboxFolderModal extends React.Component {
  state = {
    loading: false,
    error: undefined,
  }
  onSelect = ({ teamId, path }) => {
    this.setState({ teamId, path })
  }
  handleMove = () => {
    this.setState({ loading: true, error: undefined }, () => {
      addSandboxesToFolder(
        [this.props.overmind.state.editor.currentSandbox.id],
        this.state.path,
        this.state.teamId,
      )
        .then(() => {
          this.props.overmind.actions.refetchSandboxInfo()

          this.setState({ loading: false })
          this.props.overmind.actions.modalClosed()

          track('Move Sandbox From Editor')
        })
        .catch(e => {
          this.setState({ error: e.message, loading: false })
        })
    })
  }

  constructor(props) {
    super(props)

    const sandbox = props.overmind.state.editor.currentSandbox
    const { collection } = sandbox

    this.state = {
      teamId: sandbox.team ? sandbox.team.id || undefined : undefined,
      path: collection ? collection.path : '/',
    }
  }

  render() {
    const { path, teamId } = this.state
    const { signals } = this.props

    return (
      <div>
        <Block>Move to Folder</Block>
        <Container css={{ maxHeight: 400, overflow: 'auto' }}>
          <DirectoryPicker
            onSelect={this.onSelect}
            currentTeamId={teamId}
            currentPath={path}
          />
        </Container>

        {this.state.error}

        <Block right>
          <CancelButton
            onClick={() => {
              signals.modalClosed()
            }}
          >
            Cancel
          </CancelButton>

          <Button
            onClick={this.handleMove}
            css={{ display: 'inline-flex', alignItems: 'center' }}
            small
            disabled={this.state.loading}
          >
            {this.state.loading ? (
              'Moving Sandbox...'
            ) : (
              <>
                Move to{' '}
                       {path !== '/'
                         ? basename(path)
                         : `${teamId ? 'Our' : 'My'} Sandboxes`}
                <ChevronRight
                  css={{ marginRight: '-.25rem', marginLeft: '.25rem' }}
                />
              </>
            )}
          </Button>
        </Block>
      </div>
    )
  }
}

export default withOvermind(MoveSandboxFolderModal)
