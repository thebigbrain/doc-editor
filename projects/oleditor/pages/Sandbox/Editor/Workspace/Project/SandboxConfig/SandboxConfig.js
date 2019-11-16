import React from 'react'
import { TrashIcon } from '@muggle/icons'
import * as templates from '@csb/common/lib/templates'
import { useOvermind } from '@muggle/hooks'

import { TemplateConfig } from './TemplateConfig'
import { Group } from '../elements'
import { Action, CenteredText, Container } from './elements'

export const SandboxConfig = () => {
  const {
    state: { user, editor: { currentSandbox: { template, customTemplate } }, workspace: { project: { title, description } } },
    actions: { modalOpened, workspace: { addedTemplate, deleteTemplate } },
  } = useOvermind()
  const onCreateTemplate = (e) => {
    e.preventDefault()
    if (!user) {
      modalOpened({ modal: 'signInForTemplates' })
    }
    addedTemplate({
      template: {
        color: (customTemplate && customTemplate.color) ||
          templates.default(template).color(),
        title,
        description,
      },
    })
  }
  const onDelete = (e) => {
    e.preventDefault()
    if (customTemplate) {
      deleteTemplate()
    }
    else {
      modalOpened({ modal: 'deleteSandbox' })
    }
  }
  return (<>
    {customTemplate && <TemplateConfig/>}
    <Group>
      <Container>
        {!customTemplate && (<Action onClick={onCreateTemplate}>
          <CenteredText>
            <span>Create Template</span>
          </CenteredText>
        </Action>)}
        <Action danger onClick={onDelete}>
          <CenteredText>
            <TrashIcon/>
            <span>{`Delete ${customTemplate ? `Template` : `Sandbox`}`}</span>
          </CenteredText>
        </Action>
      </Container>
    </Group>
  </>)
}
