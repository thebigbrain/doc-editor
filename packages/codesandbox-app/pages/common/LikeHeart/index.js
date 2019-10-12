import Tooltip from '@codesandbox/common/lib/components/Tooltip'
import noop from 'lodash/noop'
import React from 'react'
// @ts-ignore
import HeartIcon from '@codesandbox/common/lib/icons/heart-open.svg' // eslint-disable-line import/no-webpack-loader-syntax
// @ts-ignore
import FullHeartIcon from '@codesandbox/common/lib/icons/heart.svg' // eslint-disable-line import/no-webpack-loader-syntax
import {Container} from './elements'
import {useOvermind} from '~/overmind'

const MaybeTooltip = ({loggedIn, disableTooltip, title, children}) =>
  loggedIn && !disableTooltip ? (
    <Tooltip content={title} style={{display: 'flex'}}>
      {children}
    </Tooltip>
  ) : (
    children
  )

export const LikeHeart =
  ({
     sandbox,
     className,
     colorless,
     text,
     style,
     disableTooltip,
     highlightHover,
   }) => {
    const {state: {isLoggedIn}, actions: {editor}} = useOvermind()

    return (
      <Container
        style={style}
        hasText={text !== undefined}
        loggedIn={isLoggedIn}
        liked={sandbox.userLiked}
        className={className}
        highlightHover={highlightHover}
        onClick={
          isLoggedIn
            ? () => editor.likeSandboxToggled({id: sandbox.id})
            : noop
        }
      >
        <MaybeTooltip
          loggedIn={isLoggedIn}
          disableTooltip={disableTooltip}
          title={sandbox.userLiked ? 'Undo like' : 'Like'}
        >
          {sandbox.userLiked ? (
            <FullHeartIcon style={colorless ? null : {color: '#E01F4E'}}/>
          ) : (
            <HeartIcon/>
          )}

          {text && <span>{text}</span>}
        </MaybeTooltip>
      </Container>
    )
  }
