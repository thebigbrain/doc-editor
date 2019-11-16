import React, {useState} from 'react'

import {ZeitIntegration} from '~/pages/common/ZeitIntegration'

import {Wrapper} from '../elements'

import {DeployButton} from './DeployButton/index'
import {Deploys} from './Deploys/index'
import {NoIntegrationWrapper} from './elements'
import {useOvermind} from "@muggle/hooks"

export const Zeit = () => {
  const {
    state: {
      deployment: { deploying, sandboxDeploys },
      user: { integrations },
    },
  } = useOvermind()
      const [isVisible, setVisible] = useState(false);
      return integrations.zeit ? (
        <Wrapper loading={deploying}>
          <DeployButton
            isOpen={isVisible}
            toggle={() => setVisible(show => !show)}
          />

          {sandboxDeploys.length && isVisible ? <Deploys/> : null}
        </Wrapper>
      ) : (
        <NoIntegrationWrapper>
          <ZeitIntegration small/>
        </NoIntegrationWrapper>
      );
    }
