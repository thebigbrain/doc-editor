import React from 'react'
import {Integration} from '~/components/Integration'
import {ZeitLogo} from '~/components/ZeitLogo'
import {useOvermind} from "@muggle/hooks"


export const ZeitIntegration = ({small}) => {
  const {
    actions: {signInZeitClicked, signOutZeitClicked},
    state: {user, isLoadingZeit}
  } = useOvermind()
  return (
    <Integration
      name="ZEIT"
      small={small}
      bgColor="black"
      description="Deployments"
      Icon={ZeitLogo}
      userInfo={user.integrations.zeit}
      onSignIn={signInZeitClicked}
      onSignOut={signOutZeitClicked}
      loading={isLoadingZeit}
    />
  )
}
