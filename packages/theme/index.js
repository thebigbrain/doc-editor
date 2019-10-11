import {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'

export function useTheme() {
  return useContext(ThemeContext)
}

export * from 'styled-components'

export default styled
