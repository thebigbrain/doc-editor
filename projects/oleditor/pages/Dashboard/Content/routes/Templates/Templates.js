import React from 'react'
import Helmet from 'react-helmet'
import { sortBy } from 'lodash-es'
import { useQuery } from '@apollo/react-hooks'
import track from '@csb/common/lib/utils/analytics'
import { sandboxUrl } from '@csb/common/lib/utils/url-generator'
import CustomTemplate from '@csb/common/lib/components/CustomTemplate'
import { getSandboxName } from '@csb/common/lib/utils/get-sandbox-name'

import { DelayedAnimation } from '~/components/DelayedAnimation'
import history from '~/utils/history'
import { ContextMenu } from '~/components/ContextMenu'
import { LIST_TEMPLATES, unmakeTemplates } from '../../../queries'
import { Container, EmptyTitle, Grid } from './elements'
import { Navigation } from './Navigation/index'

export const Templates = ({ match }) => {
  const { teamId } = match.params
  const { loading, error, data } = useQuery(LIST_TEMPLATES, {
    variables: { teamId },
  })
  if (error) {
    console.error(error)
    return <div>Error!</div>
  }
  if (loading) {
    return (<DelayedAnimation delay={0.6} style={{
      textAlign: 'center',
      marginTop: '2rem',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.5)',
    }}>
      Fetching Sandboxes...
    </DelayedAnimation>)
  }
  const sortedTemplates = sortBy(data.me.templates, template => getSandboxName(template.sandbox).toLowerCase())
  return (<Container>
    <Helmet>
      <title>{teamId ? 'Team' : 'My'} Templates - CodeSandbox</title>
    </Helmet>
    <Navigation teamId={teamId} number={sortedTemplates.length}/>
    {!sortedTemplates.length && (<div>
      <EmptyTitle>
        <p style={{ marginBottom: '0.5rem' }}>
          You have not created any templates yet. You can create a template
          by dragging a sandbox from {'"'}My Sandboxes{'"'} to here or by
          clicking
          {'"'}Create Template{'"'} from the editor.
        </p>
        You can learn more about templates{' '}
        <a href="/docs/templates" target="_blank">
          here
        </a>
        .
      </EmptyTitle>
    </div>)}
    <Grid>
      {sortedTemplates.map((template, i) => (<ContextMenu items={[
        {
          title: 'Convert to Sandbox',
          action: () => {
            track('Template - Removed', { source: 'Context Menu' })
            unmakeTemplates([template.sandbox.id], teamId)
            return true
          },
        },
      ]} key={template.id}>
        <CustomTemplate i={i} template={template} onClick={() => history.push(sandboxUrl(template.sandbox))}/>
      </ContextMenu>))}
    </Grid>
  </Container>)
}
