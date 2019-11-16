import React, { useState } from 'react'
import { usePopoverState } from 'reakit/Popover'
import * as templates from '@csb/common/lib/templates'
import * as Icons from '@codesandbox/template-icons/dist-web/index'
import getIcon from '@csb/common/lib/templates/icons'
import { Item, PropertyName } from '../../elements'
import { Arrow, Button, IconButton, IconWrapper, List, Value } from './elements'
import { useOvermind } from '@muggle/hooks'

export const Icon = () => {
  const {
    actions: { workspace: { editTemplate } },
    state: { editor: { currentSandbox: { template, customTemplate } } },
  } = useOvermind()

  const popover = usePopoverState()
  const [selectedIcon, setSelectedIcon] = useState(customTemplate.iconUrl)
  const DefaultIcon = getIcon(template)
  const defaultColor = (customTemplate && customTemplate.color) ||
    templates.default(template).color()
  const setIcon = (key) => {
    setSelectedIcon(key)
    popover.hide()
    editTemplate({
      template: {
        ...customTemplate,
        iconUrl: key,
      },
    })
  }
  const TemplateIcon = Icons[selectedIcon]
  return (
    <Item>
      <PropertyName>Icon </PropertyName>
      <Value>
        <Button {...popover} color={defaultColor}>
          {selectedIcon && TemplateIcon ? (<TemplateIcon width={24}/>) : (<DefaultIcon width={24}/>)}
        </Button>
        <IconWrapper hideOnEsc hideOnClickOutside {...popover} aria-label="Choose an Icon">
          <Arrow {...popover}/>
          <List>
            {Object.keys(Icons).map((i) => {
              const TemplateIconMap = Icons[i]
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                <li role="button" tabIndex={0} onClick={() => setIcon(i)}>
                  <IconButton>
                    <TemplateIconMap width={24}/>
                  </IconButton>
                </li>)
            })}
          </List>
        </IconWrapper>
      </Value>
    </Item>
  )
}
