import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.theme.background};
  padding: 1rem;
  margin: 0;
  color: ${props =>
  props.theme.light ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
`

export const Heading = styled.h2`
  margin-top: 0;
`

export const Explanation = styled.p`
  line-height: 1.3;
  margin-bottom: 2rem;
`
