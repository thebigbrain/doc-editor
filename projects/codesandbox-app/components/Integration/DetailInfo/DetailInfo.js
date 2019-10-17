import React from 'react'
import {
  MdClear as CrossIcon
} from 'react-icons/md'
import Margin from '@csb/common/lib/components/spacing/Margin'
import Tooltip from '@csb/common/lib/components/Tooltip'
import {Button} from '@csb/common/lib/components/Button'
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
