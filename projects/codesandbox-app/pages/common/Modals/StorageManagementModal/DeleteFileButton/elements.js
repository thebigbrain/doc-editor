import React from 'react'
import styled from 'styled-components'
import { DeleteIcon } from '@muggle/icons'
import Tooltip from '@csb/common/lib/components/Tooltip'

export const DeleteFileButton = styled(props => (
  <Tooltip content="Delete File">
    <button type="button" {...props}>
      <DeleteIcon/>
    </button>
  </Tooltip>
))`
  font-size: 1.2em;
  background-color: inherit;
  border: none;
  padding: 5px 6px 9px 6px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
`
