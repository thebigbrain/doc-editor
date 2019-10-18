import React from 'react'
import {FolderIcon, AddFolderIcon, RenameIcon, TrashIcon} from '@muggle/icons'
import { Mutation } from 'react-apollo'
import { DragSource, DropTarget } from 'react-dnd'
import track from '@csb/common/lib/utils/analytics'
import { client } from '~/graphql/client'
import { Animate as ReactShow } from 'react-show'
import { dirname, join } from 'path'
import theme from '@csb/common/lib/theme'
import { ContextMenu } from '~/components/ContextMenu'
import Input from '@csb/common/lib/components/Input'
import { ARROW_LEFT, ARROW_RIGHT, ESC } from '@csb/common/lib/utils/keycodes'
import { AnimatedChevron, Container, IconContainer } from './elements'
import getDirectChildren from '../../../utils/get-direct-children'
import { collectTarget, entryTarget } from '../folder-drop-target'
import { CreateFolderEntry } from './CreateFolderEntry'
import {
  DELETE_FOLDER_MUTATION,
  PATHED_SANDBOXES_CONTENT_QUERY,
  PATHED_SANDBOXES_FOLDER_QUERY,
  RENAME_FOLDER_MUTATION,
} from '../../../queries'
// eslint-disable-next-line import/no-mutable-exports
let DropFolderEntry = null

class FolderEntry extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      open: this.props.open,
      creatingDirectory: false,
      renamingDirectory: false,
    }
    this.toggleOpen = e => {
      e.preventDefault()
      e.stopPropagation()
      this.setState(state => ({ open: !state.open }))
    }
    this.handleBlur = () => {
      this.setState({ renamingDirectory: false, open: true })
    }
    this.handleSelect = () => {
      this.props.onSelect({
        teamId: this.props.teamId,
        path: this.props.path,
      })
    }
    this.handleKeyDown = e => {
      if (!this.state.renamingDirectory) {
        if (e.keyCode === ARROW_RIGHT) {
          this.setState({ open: true })
        }
        else if (e.keyCode === ARROW_LEFT) {
          this.setState({ open: false })
        }
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((this.state.open == null || this.state.open === false) &&
      nextProps.open === true) {
      this.setState({ open: true })
    }
  }

  render() {
    const { name, path, url, folders, selectedSandboxes, foldersByPath, depth, isOver, toToggle = true, allowCreate = true, canDrop, connectDropTarget, connectDragSource, isDragging, basePath, teamId, onSelect, currentPath, currentTeamId } = this.props
    const children = getDirectChildren(path, folders)
    const menuItems = [
      {
        title: 'Rename Folder',
        icon: RenameIcon,
        action: () => {
          this.setState({ renamingDirectory: true })
          return true
        },
      },
      {
        title: 'Delete Folder',
        icon: TrashIcon,
        color: theme.red.darken(0.2)(),
        action: () => {
          track('Dashboard - Folder Deleted')
          client.mutate({
            mutation: DELETE_FOLDER_MUTATION,
            variables: { path, teamId },
            refetchQueries: [
              {
                query: PATHED_SANDBOXES_CONTENT_QUERY,
                variables: { path: '/', teamId },
              },
            ],
            update: (cache, { data: { deleteCollection } }) => {
              const variables = {}
              if (teamId) {
                variables.teamId = teamId
              }
              const cacheData = cache.readQuery({
                query: PATHED_SANDBOXES_FOLDER_QUERY,
                variables,
              })
              cache.writeQuery({
                query: PATHED_SANDBOXES_FOLDER_QUERY,
                variables,
                data: {
                  ...cacheData,
                  me: {
                    // @ts-ignore
                    ...cacheData.me,
                    collections: deleteCollection,
                  },
                },
              })
            },
          })
          return true
        },
      },
    ]
    if (allowCreate) {
      menuItems.unshift({
        title: 'Create Folder',
        icon: AddFolderIcon,
        action: () => {
          this.setState({ creatingDirectory: true, open: true })
          return true
        },
      })
    }
    return connectDropTarget(connectDragSource(<div>
      <ContextMenu items={menuItems}>
        <Container as={onSelect ? 'div' : undefined} onClick={onSelect ? this.handleSelect : undefined} style={{
          color: isOver && canDrop ? theme.secondary() : undefined,
          backgroundColor: isOver && canDrop ? 'rgba(0, 0, 0, 0.3)' : undefined,
          ...(decodeURIComponent(currentPath) === path &&
          currentTeamId === teamId
            ? {
              borderColor: theme.secondary(),
              color: 'white',
            }
            : {}),
        }} exact depth={depth} to={url} onKeyDown={this.handleKeyDown} tabIndex={0}>
          <IconContainer>
            {toToggle ? (<AnimatedChevron onClick={this.toggleOpen} open={this.state.open}
                                          style={{ opacity: children.size > 0 ? 1 : 0 }}/>) : null}
            <FolderIcon/>
          </IconContainer>{' '}
          {this.state.renamingDirectory ? (<Mutation mutation={RENAME_FOLDER_MUTATION}>
            {(mutate, { loading }) => {
              let input
              const submit = e => {
                track('Dashboard - Folder Renamed')
                if (e) {
                  e.preventDefault()
                }
                mutate({
                  variables: {
                    path,
                    newPath: join(dirname(path), input.value),
                    teamId,
                    newTeamId: teamId,
                  },
                  update: (cache, { data: { renameCollection } }) => {
                    const variables = {}
                    if (teamId) {
                      variables.teamId = teamId
                    }
                    const cacheData = cache.readQuery({
                      query: PATHED_SANDBOXES_FOLDER_QUERY,
                      variables,
                    })
                    cache.writeQuery({
                      query: PATHED_SANDBOXES_FOLDER_QUERY,
                      data: {
                        ...cacheData,
                        me: {
                          ...cacheData.me,
                          collections: renameCollection,
                        },
                      },
                      variables,
                    })
                  },
                })
                this.handleBlur()
              }
              return loading ? (input.value) : (<form onSubmit={submit}>
                <Input block ref={node => {
                  if (node) {
                    input = node
                    node.focus()
                    node.select()
                  }
                }} defaultValue={name} onBlur={this.handleBlur} onKeyDown={e => {
                  if (e.keyCode === ESC) {
                    this.handleBlur()
                  }
                }}/>
              </form>)
            }}
          </Mutation>) : (name)}
        </Container>
      </ContextMenu>

      <ReactShow show={children.size > 0 && !isDragging && this.state.open && toToggle} duration={250}
                 stayMounted={false} style={{
        height: 'auto',
        overflow: 'hidden',
      }} transitionOnMount start={{
        height: 0,
      }}>
        {Array.from(children)
          .sort()
          .map((childName) => {
            const childPath = join(path, childName)
            const childUrl = join(url, encodeURIComponent(childName))
            return (
              <DropFolderEntry path={childPath} selectedSandboxes={selectedSandboxes} url={childUrl} basePath={basePath}
                               teamId={teamId} folders={folders} foldersByPath={foldersByPath} key={childName}
                               name={childName} depth={this.props.depth + 1} open={currentPath.indexOf(childPath) === 0}
                               onSelect={onSelect} currentPath={currentPath} currentTeamId={currentTeamId}/>)
          })}
      </ReactShow>
      {this.state.creatingDirectory && (<CreateFolderEntry teamId={teamId} depth={this.props.depth}
                                                           close={() => this.setState({ creatingDirectory: false })}
                                                           basePath={path}/>)}
    </div>))
  }
}

FolderEntry.defaultProps = {
  depth: 0,
}
const entrySource = {
  canDrag: () => true,
  beginDrag: props => {
    if (props.closeTree)
      props.closeTree()
    return {
      path: props.path,
      teamId: props.teamId,
    }
  },
}
const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})
DropFolderEntry = DropTarget(['SANDBOX', 'FOLDER'], entryTarget, collectTarget)(DragSource('FOLDER', entrySource, collectSource)(FolderEntry))
export { DropFolderEntry }
