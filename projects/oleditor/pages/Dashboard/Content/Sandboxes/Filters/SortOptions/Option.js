import React from 'react'
import {Check} from '@muggle/icons'
import { IconContainer, OptionContainer } from './elements'

export default ({ name, field, currentField, setField }) => {
  const selected = field === currentField
  return (
    <OptionContainer onClick={() => setField(field)} selected={selected}>
      <IconContainer>{selected && <Check/>}</IconContainer> {name}
    </OptionContainer>
  )
};
