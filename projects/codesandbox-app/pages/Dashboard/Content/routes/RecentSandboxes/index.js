import React from 'react'
import Helmet from 'react-helmet'
import {useOvermind} from '@muggle/hooks'

import getMostUsedTemplate from '../../../utils/get-most-used-template'
import { Content as Sandboxes } from '../../Sandboxes/index'
import CreateNewSandbox from '../../CreateNewSandbox/index'


const RecentSandboxes = (props) => {
  const {state} = useOvermind()
  const [loading, setLoading] = React.useState(true)

  const sandboxes = state.user && state.user.sandboxes || []

  let mostUsedTemplate = null
  try {
    mostUsedTemplate = getMostUsedTemplate(sandboxes)
  } catch (e) {
    // Not critical
  }

  const noTemplateSandboxes = sandboxes.filter(s => !s.customTemplate)

  return (
    <>
      <Helmet>
        <title>Recent Sandboxes - CodeSandbox</title>
      </Helmet>
      <Sandboxes
        isLoading={loading}
        Header="Recent Sandboxes"
        ExtraElement={({ style }) => (
          <CreateNewSandbox
            mostUsedSandboxTemplate={mostUsedTemplate}
            style={style}
          />
        )}
        hideFilters
        sandboxes={noTemplateSandboxes}
        page="recent"
      />
    </>
  )
}

export default RecentSandboxes
