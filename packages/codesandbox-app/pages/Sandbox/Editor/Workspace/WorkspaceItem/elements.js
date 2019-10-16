import styled from 'styled-components';
import ExpandIcon from 'react-icons/lib/md/keyboard-arrow-down';
export const ChildContainer = styled.div `
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;

  ${({ disabled }) => disabled &&
    `
    pointer-events: none;

    &:after {
      content: "${disabled || ''}";
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: absolute;

      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
  `};
`;
export const ItemHeader = styled.div `
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.25rem 0.75rem;
  box-sizing: border-box;
  vertical-align: middle;
  height: 2rem;
  margin: 0;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => (props.theme.light ? '#636363' : props.theme.white)};
  cursor: pointer;

  /* background-color: ${props => props.theme['sideBarSectionHeader.background'] || 'transparent'}; */
`;
export const Title = styled.h3 `
  font-size: 0.875rem;
  margin: 0;
  font-weight: 400;
`;
export const ExpandIconContainer = styled(ExpandIcon) `
  transition: 0.3s ease all;
  font-size: 1rem;
  margin-right: 0.5rem;

  transform: rotateZ(${props => (props.open ? 0 : -90)}deg);
`;
export const Actions = styled.div `
  position: absolute;
  right: 1rem;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
`;
