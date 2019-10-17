import styled from 'styled-components'
import NotSyncedIcon from 'react-icons/lib/go/primitive-dot'

export const Right = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 1rem;
`

export const NotSyncedIconWithMargin = styled(NotSyncedIcon)`
  margin-left: 2px;
  color: ${props => props.theme.templateColor || props.theme.secondary};
  vertical-align: middle;

  margin-top: 1.5px;
`
