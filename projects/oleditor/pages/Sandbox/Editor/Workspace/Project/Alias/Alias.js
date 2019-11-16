import React, { useState } from 'react'
import { WorkspaceInputContainer } from '../../elements'
import { EditPen } from '../elements'
import { SandboxAlias } from './elements'
import { useOvermind } from '@muggle/hooks'

export const Alias = ({ editable}) => {
  const {
    actions: { workspace: { sandboxInfoUpdated, valueChanged } },
    state: { isPatron, editor: { currentSandbox }, workspace: { project } }
  } = useOvermind()

  const [editing, setEditing] = useState(false)
  const alias = project.alias || currentSandbox.alias
  return isPatron ? (<>
    {editing ? (<WorkspaceInputContainer>
      <input value={alias} onChange={event => {
        valueChanged({
          field: 'alias',
          value: event.target.value,
        })
      }} type="text" onBlur={() => {
        sandboxInfoUpdated()
        setEditing(false)
      }} onKeyUp={event => {
        if (event.keyCode === 13) {
          sandboxInfoUpdated()
          setEditing(false)
        }
      }} ref={el => {
        if (el) {
          el.focus()
        }
      }} placeholder="Alias"/>
    </WorkspaceInputContainer>) : (<SandboxAlias>
      {alias}
      {editable && <EditPen onClick={() => setEditing(true)}/>}
    </SandboxAlias>)}
  </>) : null
}
