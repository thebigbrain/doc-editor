import React, {useEffect} from 'react'
import ProgressButton from '@codesandbox/common/lib/components/ProgressButton'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import track from '@codesandbox/common/lib/utils/analytics'

import {SignInButton} from '~/pages/common/SignInButton'

import {Description} from '../../elements'
import {useOvermind} from "~/overmind"

export const More = ({id, message}) => {
  const {
    state: {
      isLoggedIn,
      editor: {isForkingSandbox},
    },
    actions: {
      editor: {forkSandboxClicked},
    }
  } = useOvermind()

  useEffect(() => {
    track('Workspace - More Opened', {id})
  }, [id])

  return (
    <div>
      <Description>{message}</Description>

      <Margin margin={1}>
        {!isLoggedIn ? (
          <SignInButton block/>
        ) : (
          <ProgressButton
            block
            loading={isForkingSandbox}
            onClick={() => forkSandboxClicked()}
            small
          >
            {isForkingSandbox ? 'Forking Sandbox...' : 'Fork Sandbox'}
          </ProgressButton>
        )}
      </Margin>
    </div>
  )
}
