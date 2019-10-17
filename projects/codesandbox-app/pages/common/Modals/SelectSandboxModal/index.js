import * as React from 'react'
import Sandbox from './Sandbox/index'

import { Padding } from './elements'
import {useOvermind} from '~/overmind'


export default function SelectSandboxModal() {
  const {state, actions} = useOvermind()

  if (state.profile.isLoadingSandboxes)
    return <Padding>Loading sandboxes...</Padding>

  const currentShowcasedSandboxId =
    state.profile.showcasedSandbox && state.profile.showcasedSandbox.id

  return (
    <div>
      {state.profile.userSandboxes
        .filter(x => x)
        .map(sandbox => (
          <Sandbox
            active={sandbox.id === currentShowcasedSandboxId}
            key={sandbox.id}
            sandbox={sandbox}
            setShowcasedSandbox={id =>
              actions.profile.newSandboxShowcaseSelected({ id })
            }
          />
        ))}
    </div>
  )
}
