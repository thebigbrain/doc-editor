import React from 'react'
import { ClearRefinements, Stats } from 'react-instantsearch/dom'

import { ClearAllContainer } from './elements'

const ResultInfo = () => (
  <div style={{ marginBottom: '1rem', fontSize: '.875rem' }}>
    <Stats
      translations={{
        stats: nbHits => `${nbHits.toLocaleString()} results found`,
      }}
    />

    <ClearAllContainer>
      <ClearRefinements/>
    </ClearAllContainer>
  </div>
)

export default ResultInfo
