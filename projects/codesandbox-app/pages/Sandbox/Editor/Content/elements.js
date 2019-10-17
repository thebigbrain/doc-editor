import styled from 'styled-components'
import fadeIn from '@csb/common/lib/utils/animation/fade-in'

export const FullSize = styled.div`
  height: 100%;
  width: 100%;

  ${fadeIn(0)};
  display: flex;
  flex-direction: column;

  background-color: ${props =>
  props.theme['editor.background'] || 'transparent'};
`
