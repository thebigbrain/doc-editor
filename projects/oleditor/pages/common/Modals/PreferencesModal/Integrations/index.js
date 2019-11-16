import React from 'react'

import { ZeitIntegration } from '~/pages/common/ZeitIntegration'
import { GithubIntegration } from '~/pages/common/GithubIntegration'

import { Container } from './elements'
import { Title } from '../elements'

export function Integrations() {
  return (
    <div>
      <Title>Integrations</Title>

      <Container>
        <ZeitIntegration/>
        <GithubIntegration/>
      </Container>
    </div>
  )
}
