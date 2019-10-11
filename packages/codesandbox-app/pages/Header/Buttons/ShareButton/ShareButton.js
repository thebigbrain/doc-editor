import React from 'react'
import {Button, ShareIcon} from './elements'
import {useOvermind} from '@lz/hooks'

export const ShareButton = () => {
  const {
    state: {
      editor: {
        currentSandbox: {owned},
      },
    },
    actions: {modalOpened}
  } = useOvermind()

  return (
    <Button
      onClick={() => {
        modalOpened({modal: 'share'})
      }}
      secondary={!owned}
      small
    >
      <ShareIcon/>
      Share
    </Button>
  )
}
