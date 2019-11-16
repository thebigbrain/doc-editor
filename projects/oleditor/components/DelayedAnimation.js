import styled from 'styled-components';
import delayEffect from '@csb/common/lib/utils/animation/delay-effect';

export const DelayedAnimation = styled.div`
  ${({ delay }) => delayEffect(delay || 0)};
`;
