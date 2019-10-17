import React from 'react'
import * as Icons from '@codesandbox/template-icons'
import color from 'color'
import getIcon from '../../templates/icons'
import {ENTER} from '../../utils/keycodes'
import {Button, IconContainer, Title} from './elements'
import {getSandboxName} from '../../utils/get-sandbox-name'

export const UserTemplate = ({template, selectTemplate, small,}) => {
  const Icon = template.iconUrl && Icons[template.iconUrl]
    ? Icons[template.iconUrl]
    : getIcon(template.sandbox.source.template)
  const select = () => selectTemplate({
    ...template,
    shortid: template.sandbox.alias || template.sandbox.id,
  })
  return (<Button onClick={select} color={color(template.color)} custom onKeyDown={e => {
    if (e.keyCode === ENTER) {
      select()
    }
  }} tabIndex={0}>
    <IconContainer>
      <Icon width={small ? 24 : 32} height={small ? 24 : 32}/>
    </IconContainer>
    <Title>{getSandboxName(template.sandbox)}</Title>
  </Button>)
}
