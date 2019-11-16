import styled, { css } from 'styled-components'
import {
  GoQuestion as Question
} from 'react-icons/go'
import {
  MdInsertLink as Unlisted,
  MdLock as Private
} from 'react-icons/md'

const iconStyles = css`
  margin-left: 0.5em;
  margin-bottom: 0.2rem;
  opacity: 0.5;
`

export const StyledUnlisted = styled(Unlisted)`
  ${iconStyles}
`

export const StyledPrivate = styled(Private)`
  ${iconStyles}
`

export const Icon = styled(Question)`
  ${iconStyles}
`
