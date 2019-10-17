import React from 'react'
import {Button} from './elements'
import {useOvermind} from '@muggle/hooks'

export const PickButton = () => {
  const {
    state: {
      editor: {
        currentSandbox: {id, title, description, owned},
      },
    },
    actions: {
      explore: {pickSandboxModal},
    }
  } = useOvermind()
  const details = {
    id,
    title,
    description,
  }

  return (
    <Button
      onClick={() => {
        pickSandboxModal({details})
      }}
      secondary={owned}
      small
    >
      Pick
    </Button>
  )
}


