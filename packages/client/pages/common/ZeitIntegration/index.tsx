import React from 'react';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Integration } from 'app/components/Integration';
import { ZeitLogo } from 'app/components/ZeitLogo';

interface Props {
  small: boolean;
  store: any;
  signals: any;
}

export const ZeitIntegration = inject('store', 'signals')(
  hooksObserver(
    ({
       small,
       signals: { signInZeitClicked, signOutZeitClicked },
       store: { user, isLoadingZeit },
     }: Props) => (
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
    ),
  ),
);
