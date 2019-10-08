import React from 'react'
import { inject, observer } from 'app/componentConnectors'
import { basename } from 'path'
import track from '@codesandbox/common/lib/utils/analytics'
import { Button } from '@codesandbox/common/lib/components/Button'
import ChevronRight from 'react-icons/lib/md/chevron-right'

import DirectoryPicker from './DirectoryPicker'
import { Container } from '../elements'

import { Block, CancelButton } from './elements'
import { addSandboxesToFolder } from '../../../Dashboard/queries'

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
        [this.props.store.editor.currentSandbox.id],
        this.state.path,
        this.state.teamId,
      )
        .then(() => {
          this.props.signals.refetchSandboxInfo()

          this.setState({ loading: false })
          this.props.signals.modalClosed()

          track('Move Sandbox From Editor')
        })
        .catch(e => {
          this.setState({ error: e.message, loading: false })
        })
    })
  }

  constructor(props) {
    super(props)

    const sandbox = props.store.editor.currentSandbox
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

export default inject('store', 'signals')(observer(MoveSandboxFolderModal))
