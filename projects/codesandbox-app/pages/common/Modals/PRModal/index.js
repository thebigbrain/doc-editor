import React from 'react'
import { GitProgress } from '~/components/GitProgress'
import {useOvermind} from '~/overmind'

export default function PRModal() {
  let result = null
  const {state} = useOvermind()

  if (!state.git.isCreatingPr) {
    const newUrl = state.git.pr.prURL

    result = (
      <div>
        Done! We{'\''}ll now open the new sandbox of this PR and GitHub in 3
        seconds...
        <div style={{ fontSize: '.875rem', marginTop: '1rem' }}>
          <a href={newUrl} target="_blank" rel="noreferrer noopener">
            Click here if nothing happens.
          </a>
        </div>
      </div>
    )
  }

  return (
    <GitProgress
      result={result}
      message="Forking Repository & Creating PR..."
    />
  )
}
