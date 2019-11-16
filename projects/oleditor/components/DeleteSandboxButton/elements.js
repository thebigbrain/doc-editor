import React from 'react';
import styled from 'styled-components';
import DeleteIcon from 'react-icons/lib/md/delete';
import Tooltip from '@csb/common/lib/components/Tooltip';
export const DeleteSandboxButtonContainer = styled(props => (<Tooltip content="Delete Sandbox">
    <button type="button" {...props}>
      <DeleteIcon />
    </button>
  </Tooltip>)) `
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
`;
