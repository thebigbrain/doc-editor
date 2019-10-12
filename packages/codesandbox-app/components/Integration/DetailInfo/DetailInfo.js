import React from 'react'
import {
  MdClear as CrossIcon
} from 'react-icons/md'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import Tooltip from '@codesandbox/common/lib/components/Tooltip'
import {Button} from '@codesandbox/common/lib/components/Button'
import {Action, Details, Heading, Info} from './elements'


export const DetailInfo =
  ({
     heading,
     info,
     onSignOut,
     onSignIn,
   }) => (
    <Details>
      <Margin right={2}>
        <Heading>{heading}</Heading>
        <Info>{info}</Info>
      </Margin>

      {onSignOut ? (
        <Tooltip content="Sign out">
          <Action onClick={onSignOut} red>
            <CrossIcon/>
          </Action>
        </Tooltip>
      ) : (
        <Button small onClick={onSignIn}>
          Sign in
        </Button>
      )}
    </Details>
  )
