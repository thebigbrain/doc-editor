import React from 'react'
import { withRouter } from 'react-router-dom'
import { DropTarget } from 'react-dnd'
import { AddFolderIcon } from '@muggle/icons'
// import { Query } from 'react-apollo'
import { DelayedAnimation } from '~/components/DelayedAnimation'
import InfoIcon from '@csb/common/lib/icons/sandbox.svg'
import { useOvermind } from '@muggle/hooks'

import { Item } from '../Item/index'
import { Container } from './elements'
import { DropFolderEntry } from './FolderEntry/index'
import { CreateFolderEntry } from './FolderEntry/CreateFolderEntry'

import { collectTarget, entryTarget } from './folder-drop-target'

import getChildCollections from '../../utils/get-child-collections'

// import { PATHED_SANDBOXES_FOLDER_QUERY } from '../../queries'

function SandboxesItemComponent(props) {
  const { state } = useOvermind()
  const [creatingDirectory, setCreatingDirectory] = React.useState(false)

  const handleSelect = () => {
    props.onSelect({
      path: '/',
      teamId: props.teamId,
    })
  }

  const {
    isOver,
    canDrop,
    teamId,
    teamName,
    connectDropTarget,
    openByDefault,
    onSelect,
    currentPath,
    currentTeamId,
    selectedSandboxes,
  } = props

  const basePath = teamId
    ? `/dashboard/teams/${teamId}/sandboxes`
    : '/dashboard/sandboxes'

  const { children, folders, foldersByPath } = state.user && state.user.collections
    ? getChildCollections(state.user.collections)
    : {}

  return connectDropTarget(
    <div>
      <Item
        as={onSelect ? 'div' : undefined}
        onClick={onSelect ? handleSelect : undefined}
        active={currentPath === '/' && currentTeamId === teamId}
        openByDefault={openByDefault}
        path={basePath}
        Icon={InfoIcon}
        name={teamId ? `${teamName || 'Team'} Sandboxes` : 'My Sandboxes'}
        style={
          isOver && canDrop ? { backgroundColor: 'rgba(0, 0, 0, 0.3)' } : {}
        }
        contextItems={[
          {
            title: 'Create Folder',
            icon: AddFolderIcon,
            action: () => {
              setCreatingDirectory(true)
              return true
            },
          },
        ]}
      >
        {
          !(state.user && state.user.collections)
            ? (
              <DelayedAnimation
                style={{
                  margin: '1rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
                delay={0.6}
              >
                Loading...
              </DelayedAnimation>
            )
            : (
              <Container>
                {Array.from(children)
                  .sort()
                  .map(name => {
                    const path = '/' + name
                    const url = basePath + '/' + encodeURIComponent(name)
                    return (
                      <DropFolderEntry
                        key={path}
                        selectedSandboxes={selectedSandboxes}
                        basePath={basePath}
                        teamId={teamId}
                        path={path}
                        url={url}
                        folders={folders}
                        foldersByPath={foldersByPath}
                        name={name}
                        open={
                          currentPath.indexOf(path) === 0 &&
                          currentTeamId === teamId
                        }
                        onSelect={onSelect}
                        currentPath={currentPath}
                        currentTeamId={currentTeamId}
                      />
                    )
                  })}
                {(creatingDirectory || children.size === 0) && (
                  <CreateFolderEntry
                    teamId={teamId}
                    noFocus={!creatingDirectory}
                    basePath=""
                    close={() => {
                      setCreatingDirectory(false)
                    }}
                  />
                )}
              </Container>
            )
        }
      </Item>
    </div>,
  )
}

export const SandboxesItem = DropTarget(
  ['SANDBOX', 'FOLDER'],
  entryTarget,
  collectTarget,
)(withRouter(SandboxesItemComponent))
