import React, { useState } from 'react'

import Files from '../../Files/index'
import Dependencies from '../../Dependencies/index'
import { WorkspaceItem } from '../../WorkspaceItem/index'
import { ItemTitle } from '../../elements'

export default () => {
  const [editActions, setEditActions] = useState(null)

  return (
    <div>
      <ItemTitle>
        <span style={{ display: 'inline-block', width: '100%' }}>Explorer</span>{' '}
        {editActions}
      </ItemTitle>
      <Files setEditActions={setEditActions}/>
      <WorkspaceItem defaultOpen title="Dependencies">
        <Dependencies/>
      </WorkspaceItem>
    </div>
  )
};
