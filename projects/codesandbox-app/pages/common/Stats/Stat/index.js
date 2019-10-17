import React from 'react'
import { CenteredText } from './elements'

export const Stat = ({ Icon, count }) => (
  <CenteredText>
    {Icon}
    <span style={{
      marginLeft: '0.5em',
      fontWeight: 300,
    }}>
      {count.toLocaleString()}
    </span>
  </CenteredText>
)
