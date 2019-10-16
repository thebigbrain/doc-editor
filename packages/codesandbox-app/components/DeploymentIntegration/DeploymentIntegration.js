import React from 'react'
import { DetailInfo } from './DetailInfo/index'
import { Container, Down, IntegrationBlock, Name, Notice, Up } from './elements'

export const DeploymentIntegration =
  ({ light, loading = false, bgColor, Icon, name, beta = false, open = true, onToggle, onDeploy, children }) => (
    <Container>
      <IntegrationBlock bgColor={bgColor} onClick={onToggle}>
        <div>
          <Icon/>

          <Name light={light}>{name}</Name>

          {beta && <Notice>Beta</Notice>}
        </div>

        {open ? <Up light={light}/> : <Down light={light}/>}
      </IntegrationBlock>

      {open ? (<DetailInfo bgColor={bgColor} onDeploy={onDeploy} light={light} loading={loading}>
        {children}
      </DetailInfo>) : null}
    </Container>
  )
