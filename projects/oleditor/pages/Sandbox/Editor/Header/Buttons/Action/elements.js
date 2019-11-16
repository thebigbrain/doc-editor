import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

import Tooltip from '@csb/common/lib/components/Tooltip'
import { BaseMoreInfoIcon } from '@muggle/icons'


const blinkAnimation = keyframes`
  0% {
  // @ts-ignore;
    color: ${({ theme: { light } }) => light ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'}
  }

  50 % {
    color: rgba(255, 255, 255, 1);
  }

  100 % {
    color: ${({ theme: { light } }) => light ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'}
  }
`

const styles = ({ blink, hideBottomHighlight, highlight, theme }) =>
  css`
    ${blink &&
  css`
        animation: ${blinkAnimation} 1s infinite;
        font-weight: 600;
      `};
    display: flex !important;
    transition: 0.3s ease all;
    flex-direction: row;
    align-items: center;
    vertical-align: middle;
    font-size: 0.875rem;
    line-height: 1;
    height: 100%;
    color: ${theme.light ? css`#636363` : css`rgba(255, 255, 255, 0.7)`};
    cursor: pointer;
    box-sizing: inherit;
    border-bottom: 2px solid transparent;
    z-index: 1;
    ${highlight
    ? css`
          background-color: ${theme.secondary.darken(0.1)()};
          color: rgba(255, 255, 255, 0.7);
          border-bottom: 1px solid ${theme.secondary.darken(0.1)()};

          &:hover {
            background-color: ${theme.secondary.darken(0.2)()};
          }
        `
    : css`
          &:hover {
            color: ${theme['editor.foreground'] ||
    (theme.light ? 'black' : 'white')};
            border-color: ${hideBottomHighlight
      ? 'transparent'
      : theme.secondary()};
          }
        `};
  `

export const Title = styled.span`
  padding-left: 0.5rem;
`

export const Container = styled.div`
  ${styles};
`

export const ActionLink = styled(Link)`
  ${styles};
  text-decoration: none;
`

export const ActionA = styled.a`
  ${styles};
  text-decoration: none;
`

export const ActionTooltip = styled(Tooltip)`
  ${({ disabledAction, theme }) => css`
    ${styles};
    ${disabledAction &&
css`
        color: ${theme.light
  ? css`rgba(0,0,0,0.3)`
  : css`rgba(255,255,255,0.3)`};
        cursor: default;

        &:hover {
          color: ${theme.light
  ? css`rgba(0,0,0,0.4)`
  : css`rgba(255,255,255,0.4)`};
        }
      `};
  `}
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.5rem;
`

export const MoreInfoIcon = styled(BaseMoreInfoIcon)`
  font-size: 1.1rem;
`
