import React from 'react';
import Logo from '@csb/common/lib/components/Logo';
import { FullscreenCentered, LogoContainer } from './elements';

export const Loading = () => (
  <FullscreenCentered>
    <LogoContainer>
      <Logo width={200} height={200}/>
    </LogoContainer>
  </FullscreenCentered>
);
