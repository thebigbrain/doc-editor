import React from 'react'
import { DropTarget } from 'react-dnd'

import { collectTarget, entryTarget } from '../../../../Sidebar/SandboxesItem/folder-drop-target'
import { NavigationLink } from './elements'

const Link = ({
                teamId,
                name,
                path,
                isOver,
                splittedPath,
                i,
                connectDropTarget,
              }) =>
  connectDropTarget(
    <div>
      <NavigationLink
        to={
          teamId
            ? `/dashboard/teams/${teamId}/sandboxes${path}`
            : `/dashboard/sandboxes${path}`
        }
        last={i === splittedPath.length - 1 ? 'true' : undefined}
        first={i === 0 ? 'true' : undefined}
        style={isOver ? { color: 'white' } : {}}
        path={path}
        teamId={teamId}
      >
        {name}
      </NavigationLink>
    </div>,
  )

export default DropTarget('SANDBOX', entryTarget, collectTarget)(Link)

