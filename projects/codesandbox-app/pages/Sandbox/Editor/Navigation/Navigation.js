import React from 'react'
import {GoPlus as PlusIcon} from 'react-icons/go'
import Tooltip from '@csb/common/lib/components/Tooltip'
import InfoIcon from '@csb/common/lib/icons/sandbox.svg'
import GitHubIcon from '@csb/common/lib/icons/github.svg'
import LiveIcon from '@csb/common/lib/icons/live.svg'
import FilesIcon from '@csb/common/lib/icons/file.svg'
import RocketIcon from '@csb/common/lib/icons/rocket.svg'
import ConfigurationIcon from '@csb/common/lib/icons/cog.svg'
import {Container, IconContainer, Separator} from './elements'
import ServerIcon from './ServerIcon'
import {useOvermind} from "@muggle/hooks"

const IDS_TO_ICONS = {
  project: InfoIcon,
  'project-summary': InfoIcon,
  files: FilesIcon,
  github: GitHubIcon,
  deploy: RocketIcon,
  config: ConfigurationIcon,
  live: LiveIcon,
  more: PlusIcon,
  server: ServerIcon,
}

const IconComponent =
  ({
     item,
     isDisabled,
   }) => {
    const {
      state: store,
      actions: {
        workspace: {setWorkspaceHidden, setWorkspaceItem},
      }
    } = useOvermind()
    const {id, name} = item

    const Icon = IDS_TO_ICONS[id]
    const selected =
      !store.workspace.workspaceHidden &&
      id === store.workspace.openedWorkspaceItem
    return (
      <Tooltip key={id} placement="right" content={name}>
        <IconContainer
          isDisabled={isDisabled}
          selected={selected}
          onClick={() => {
            if (selected) {
              setWorkspaceHidden({hidden: true})
            } else {
              setWorkspaceHidden({hidden: false})
              setWorkspaceItem({item: id})
            }
          }}
        >
          <Icon/>
        </IconContainer>
      </Tooltip>
    )
  }

export const Navigation =
  ({
     topOffset,
     bottomOffset,
   }) => {
    const {actions} = useOvermind()

    const shownItems = actions.editor.getWorkspaceItems()
    const disabledItems = actions.editor.getDisabledItems()

    return (
      <Container topOffset={topOffset} bottomOffset={bottomOffset}>
        {shownItems.map(item => (
          <IconComponent key={item.id} item={item}/>
        ))}

        {disabledItems.length > 0 && <Separator/>}

        {disabledItems.map(item => (
          <IconComponent key={item.id} item={item} isDisabled/>
        ))}
      </Container>
    )
  }
