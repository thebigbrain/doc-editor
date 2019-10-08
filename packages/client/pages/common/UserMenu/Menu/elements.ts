import styled from 'styled-components';
import delayEffect from '@codesandbox/common/lib/utils/animation/delay-effect';

export const Container = styled.div`
  position: absolute;
  background-color: ${props => props.theme.background4};
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.75);

  ${delayEffect(0)};
  top: 35px;

  right: 0;

  min-width: 200px;

  z-index: 20;
`;

export const Item = styled.div<{ to?: string; href?: string }>`
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;

  text-decoration: none;

  color: rgba(255, 255, 255, 0.8);
  border-left: 2px solid transparent;

  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.secondary};
    color: white;
    background-color: ${props => props.theme.secondary.clearer(0.9)};
  }
`;

export const Icon = styled.span`
  margin-right: 0.75rem;
  display: inline-flex;
  align-items: center;
`;

export const Separator = styled.hr`
  height: 1px;
  width: 100%;
  margin: 0.5rem 0;

  background-color: ${props => props.theme.background};
  border: 0;
  outline: 0;
`;
