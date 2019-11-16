import React from 'react';
import { LikeHeart } from './elements';
import {useOvermind} from '@muggle/hooks'

export const LikeButton = () => {
  const {state:{ editor: { currentSandbox } }} = useOvermind()

  return (
    <LikeHeart
      colorless
      text={currentSandbox.likeCount}
      sandbox={currentSandbox}
      disableTooltip
      highlightHover
    />
  )
}

