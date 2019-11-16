import styled from 'styled-components';
import {MdShare as BaseShareIcon} from 'react-icons/md';
import { Button as BaseButton } from '@csb/common/lib/components/Button';

export const Button = styled(BaseButton)`
  font-size: 0.75rem;
  margin: 0 1rem;
`;

export const ShareIcon = styled(BaseShareIcon)`
  margin-right: 0.5rem;
`;
