import React from 'react'
import { getSandboxName } from '@csb/common/lib/utils/get-sandbox-name'
import { sandboxUrl } from '@csb/common/lib/utils/url-generator'
import Row from '@csb/common/lib/components/flex/Row'
import { Stat } from 'app/components/Stat'
import SvgButton from './play-button.svg'
import { Container, Description, Like, PlayButtonContainer, Stats, Title } from './elements'

function SandboxInfo({ sandbox }) {
  return (
    <Container>
      <Row alignItems="center">
        <Title>
          {getSandboxName(sandbox)} <Like sandbox={sandbox}/>
        </Title>
      </Row>
      <Row alignItems="flex-start">
        <div style={{ flex: 6 }}>
          <Description>{sandbox.description}</Description>
        </div>
        <Stats>
          <PlayButtonContainer to={sandboxUrl({ id: sandbox.id })}>
            <img alt="edit" src={SvgButton}/>
          </PlayButtonContainer>
          <Stat name="likes" count={sandbox.likeCount}/>
          <Stat name="views" count={sandbox.viewCount}/>
          <Stat name="forks" count={sandbox.forkCount}/>
        </Stats>
      </Row>
    </Container>
  )
}

export default SandboxInfo
