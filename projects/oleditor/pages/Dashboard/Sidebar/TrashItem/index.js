import React from 'react'
import { DropTarget } from 'react-dnd'
import {
  MdDelete as TrashIcon
} from 'react-icons/md'

import { withRouter } from 'react-router-dom'

import { Item } from '../Item/index'
import { DELETE_SANDBOX_DROP_KEY } from '../../Content/SandboxCard/index'

const TrashItemComponent = ({
                              currentPath,
                              isOver,
                              canDrop,
                              connectDropTarget,
                            }) => {
  return connectDropTarget(
    <div>
      <Item
        active={currentPath === '/dashboard/trash'}
        path="/dashboard/trash"
        Icon={TrashIcon}
        name="Trash"
        style={
          isOver && canDrop ? { backgroundColor: 'rgba(0, 0, 0, 0.3)' } : {}
        }
      />
    </div>,
  )
}

export const entryTarget = {
  drop: (_, monitor) => {
    if (monitor == null) return {}

    // Check if only child is selected:
    if (!monitor.isOver({ shallow: true })) return {}

    // Used in SandboxCard
    return { [DELETE_SANDBOX_DROP_KEY]: true }
  },

  canDrop: (props, monitor) => {
    if (monitor == null) return false
    const source = monitor.getItem()
    if (source == null) return false

    return !props.removedAt
  },
}

export function collectTarget(connectMonitor, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connectMonitor.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}

export const TrashItem = DropTarget(['SANDBOX'], entryTarget, collectTarget)(
    withRouter(TrashItemComponent)
)
