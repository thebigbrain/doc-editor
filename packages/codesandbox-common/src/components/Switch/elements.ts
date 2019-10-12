import styled from 'styled-components';
import theme from '../../theme';

export type ColorProps = {
  small?: boolean;
  right?: boolean;
  offMode?: boolean;
  secondary?: boolean;
  theme: (typeof theme) & { templateColor: string };
};

const getColor = ({
  right,
  offMode,
  secondary,
  theme: givenTheme,
}: ColorProps) => {
  if (right) {
    return secondary
      ? givenTheme.templateColor || givenTheme.secondary
      : givenTheme.primary;
  }
  if (offMode) return `rgba(0, 0, 0, 0.3)`;
  return secondary
    ? givenTheme.primary
    : givenTheme.templateColor || givenTheme.secondary;
};

export const Container = styled.div<ColorProps>`
  transition: 0.3s ease all;
  position: relative;
  background-color: ${getColor};
  width: ${({ small }) => (small ? 3 : 3.5)}rem;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  height: ${props => (props.small ? 20 : 26)}px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    margin-top: -0.5em;
    line-height: 1;
  }
`;

const getSize = ({ small }) =>
  small ? 'calc(1.5rem + 2px)' : 'calc(2rem + 2px)';

export const Dot = styled.div<{ small: boolean; right: boolean }>`
  transition: inherit;
  position: absolute;
  height: ${props => (props.small ? 14 : 20)}px;
  width: 1rem;
  left: 0.1rem;
  border-radius: 4px;
  transform: translateX(${props => (props.right ? getSize(props) : '0')});
  top: 0.1rem;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;
