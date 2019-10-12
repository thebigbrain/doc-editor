import React from 'react'
import { Button } from '@codesandbox/common/lib/components/Button'
import Centered from '@codesandbox/common/lib/components/flex/Centered'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import { ZeitIntegration } from '~/pages/common/ZeitIntegration'
import { IntegrationModal } from '~/components/IntegrationModal'
import track from '@codesandbox/common/lib/utils/analytics'
import {
  ButtonContainer,
  DeployAnimationContainer,
  DeployedLink,
  DeploymentManagementNotice,
  DeployText,
  StyledCube,
  StyledLogo,
  StyledNowLogo,
} from './elements'
import {useOvermind} from '~/overmind'

export default function DeploymentModal() {
  const {state, actions} = useOvermind()
  const { user } = state

  const zeitSignedIn = user.integrations.zeit

  return (
    <IntegrationModal
      name="ZEIT"
      Integration={ZeitIntegration}
      title="Deployment"
      subtitle={
        <div>
          {' '}
          Deploy a production version of your sandbox using{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://zeit.co/now"
          >
            ZEIT Now
          </a>
        </div>
      }
      signedIn={zeitSignedIn}
    >
      <Centered horizontal>
        {state.deployment.deploying && (
          <Margin top={1}>
            <DeployText>Deploying sandbox...</DeployText>
            <DeployAnimationContainer deploying={state.deployment.deploying}>
              <StyledLogo width={70} height={70}/>
              {[0, 1, 2, 3].map(i => (
                <StyledCube key={i} i={i} size={20}/>
              ))}
              <StyledNowLogo backgroundColor="#24282A"/>
            </DeployAnimationContainer>
          </Margin>
        )}

        {state.deployment.url ? (
          <Margin top={1} bottom={2}>
            <Centered horizontal>
              <DeployText>Deployed!</DeployText>

              <DeployedLink
                href={state.deployment.url}
                rel="nofollow noreferrer"
                target="_blank"
              >
                {state.deployment.url}
              </DeployedLink>

              <DeploymentManagementNotice>
                You can manage your deployments{' '}
                <a
                  href="https://zeit.co/dashboard"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  here
                </a>
                .
              </DeploymentManagementNotice>
            </Centered>
          </Margin>
        ) : (
          <ButtonContainer deploying={state.deployment.deploying}>
            <Button
              onClick={() => {
                track('Deploy Clicked', { provider: 'zeit' })
                actions.deployment.deployClicked()
              }}
              disabled={!zeitSignedIn || state.deployment.deploying}
            >
              Deploy Now
            </Button>
          </ButtonContainer>
        )}
      </Centered>
    </IntegrationModal>
  )
}
