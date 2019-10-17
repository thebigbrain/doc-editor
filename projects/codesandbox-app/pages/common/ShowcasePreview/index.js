import React from 'react'

import Preview from '@csb/common/lib/components/Preview'
import { parseSandboxConfigurations } from '@csb/common/lib/templates/configuration/parse-sandbox-configurations'
import { mainModule } from '~/store/utils/main-module'

import { Container } from './elements'

const ShowcasePreview = ({ settings, sandbox }) => {
  const parsedConfigs = parseSandboxConfigurations(sandbox)
  const module = mainModule(sandbox, parsedConfigs)

  return (
    <Container>
      <Preview
        sandbox={sandbox}
        currentModule={module}
        settings={settings}
        template={sandbox.template}
        isInProjectView
        noDelay
      />
    </Container>
  )
}

export default ShowcasePreview
