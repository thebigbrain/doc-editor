import React, { useState } from 'react'
import { WorkspaceInputContainer } from '../../elements'
import { EditPen } from '../elements'
import { SandboxDescription } from './elements'
import { useOvermind } from '~/overmind'

export const Description = ({ editable }) => {
  const {
    actions: { workspace: { sandboxInfoUpdated, valueChanged } },
    state: { workspace: { project: { description } } },
  } = useOvermind()

  const [editing, setEditing] = useState(false)
  const onKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      sandboxInfoUpdated()
      setEditing(false)
    }
  }

  return editing ? (
    <WorkspaceInputContainer style={{ margin: '0 -0.25rem' }}>
      <textarea rows={2} placeholder="Description" value={description} ref={el => {
        if (el) {
          el.focus()
        }
      }} onKeyDown={onKeyDown} onChange={event => {
        valueChanged({
          field: 'description',
          value: event.target.value,
        })
      }} onBlur={() => {
        sandboxInfoUpdated()
        setEditing(false)
      }}/>
    </WorkspaceInputContainer>) : (<SandboxDescription empty={description}>
      {description || (editable ? 'No description, create one!' : '')}
      {editable && <EditPen onClick={() => setEditing(true)}/>}
    </SandboxDescription>
  )
}
