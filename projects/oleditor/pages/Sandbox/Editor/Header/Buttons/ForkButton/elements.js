import styled from 'styled-components';
import { default as BaseProgressButton } from '@csb/common/lib/components/ProgressButton';
import {GoRepoForked as BaseForkIcon} from 'react-icons/go';

export const ProgressButton = styled(BaseProgressButton)`
  font-size: 0.75rem;
`;

export const ForkIcon = styled(BaseForkIcon)`
  margin-right: 0.5rem;
`;
