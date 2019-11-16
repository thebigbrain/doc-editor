import styled, { css } from 'styled-components';
import delayEffect from '@csb/common/lib/utils/animation/delay-effect';

export const Title = styled.h1`
  ${({ delay = 0 }) => css`
    margin-top: 0;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    outline: none;
    ${delayEffect(delay)};
  `}
`;
