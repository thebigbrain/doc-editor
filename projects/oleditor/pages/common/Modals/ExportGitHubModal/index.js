import React from 'react'
import { GitProgress } from '~/components/GitProgress'

function ExportGitHubModal({ isExported }) {
  return (
    <GitProgress
      result={isExported ? <div>Exported to GitHub!</div> : null}
      message="Creating Repository..."
    />
  )
}

export default ExportGitHubModal
