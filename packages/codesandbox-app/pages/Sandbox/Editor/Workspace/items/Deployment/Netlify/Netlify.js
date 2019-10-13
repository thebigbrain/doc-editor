import getTemplate from '@codesandbox/common/lib/templates'
import React, {useEffect, useState} from 'react'

import {Wrapper} from '../elements'

import {DeployButton} from './DeployButton/index'
import {SiteInfo} from './SiteInfo/index'
import {useOvermind} from "~/overmind"

export const Netlify = () => {
  const {
    actions: {
      deployment: { getNetlifyDeploys },
    },
    state: {
      deployment: { deploying, netlifySite },
      editor: { currentSandbox },
    },
  } = useOvermind()
      const [isVisible, setVisible] = useState(false);

      useEffect(() => {
        getNetlifyDeploys();
      }, [getNetlifyDeploys]);

      const template = getTemplate(currentSandbox.template);

      return (
        template.netlify !== false && (
          <Wrapper loading={deploying}>
            <DeployButton
              isOpen={isVisible}
              toggle={() => setVisible(show => !show)}
            />

            {netlifySite && isVisible ? <SiteInfo/> : null}
          </Wrapper>
        )
      );
    }
