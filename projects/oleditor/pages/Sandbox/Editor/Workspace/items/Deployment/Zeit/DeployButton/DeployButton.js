import { hooksObserver, inject } from 'app/componentConnectors';
import React from 'react';
import { DeploymentIntegration } from 'app/components/DeploymentIntegration';
import { NowLogo } from '~/components/NowLogo';
import { DeployButtonContainer } from '../../elements';
export const DeployButton = inject('store', 'signals')(hooksObserver(({ isOpen, toggle, signals: { deployment: { deploySandboxClicked }, }, }) => (<DeployButtonContainer>
        <DeploymentIntegration bgColor="#000000" onDeploy={deploySandboxClicked} Icon={NowLogo} name="Now" open={isOpen} onToggle={toggle}>
          Deploy your sandbox on{' '}
          <a href="https://zeit.co/now" rel="noreferrer noopener" target="_blank">
            <span>ZEIT Now</span>
          </a>
        </DeploymentIntegration>
      </DeployButtonContainer>)));
