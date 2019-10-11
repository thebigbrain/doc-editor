import React from 'react'
import {ProgressButton, ForkIcon} from './elements'
import {useOvermind} from '@lz/hooks'

export const ForkButton = () => {
  const {
    state: {
      editor: {
        isForkingSandbox,
        currentSandbox: {owned},
      },
    },
    actions: {
      editor: {forkSandboxClicked},
    }
  } = useOvermind()

  return (
    <ProgressButton
      onClick={forkSandboxClicked}
      secondary={owned}
      loading={isForkingSandbox}
      small
    >
      <ForkIcon/>
      {isForkingSandbox ? 'Forking...' : 'Fork'}
    </ProgressButton>
  )
}
