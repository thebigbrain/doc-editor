import React from 'react'
import track from '@codesandbox/common/lib/utils/analytics'
import { DeploymentIntegration } from '~/components/DeploymentIntegration'
import { NetlifyLogo } from '~/components/NetlifyLogo'
import { DeployButtonContainer } from '../../elements'
import {useOvermind} from '~/overmind'

export const DeployButton = ({ isOpen, toggle}) => {
  const {
    state: { deployment: { building, deploying } },
    actions: { deployment: { deployWithNetlify } }
  } = useOvermind()

  return (
    <DeployButtonContainer>
      <DeploymentIntegration beta bgColor="#FFFFFF" onDeploy={() => {
        track('Deploy Clicked', { provider: 'netlify' })
        deployWithNetlify({})
      }} Icon={NetlifyLogo} light loading={deploying || building} name="netlify" open={isOpen} onToggle={toggle}>
        Deploy your sandbox site on{' '}
        <a href="https://netlify.com" rel="noreferrer noopener" target="_blank">
          <span>Netlify</span>
        </a>
      </DeploymentIntegration>
    </DeployButtonContainer>)
}
