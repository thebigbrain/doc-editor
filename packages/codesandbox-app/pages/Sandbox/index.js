import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name'
import { Button } from '@codesandbox/common/lib/components/Button'
import Centered from '@codesandbox/common/lib/components/flex/Centered'
import Fullscreen from '@codesandbox/common/lib/components/flex/Fullscreen'
import Padding from '@codesandbox/common/lib/components/spacing/Padding'

import { Title } from '~/components/Title'
import { Skeleton } from '~/components/Skeleton'
import { QuickActions } from '~/pages/Sandbox/QuickActions'
import { NotFound } from '~/pages/common/NotFound'
// import { Navigation } from '~/pages/common/Navigation'
// import { GithubIntegration } from '~/pages/common/GithubIntegration'
// import Editor from './Editor/index'
import { useOvermind } from '~/hooks/index'

function getContent(props) {
  const { state } = useOvermind()

  const { hasLogIn } = state

  if (state.editor.notFound) {
    return <NotFound/>
  }

  if (state.editor.error) {
    const isGithub = props.match.params.id.includes('github')
    const hasPrivateAccess = state.user && state.user.integrations.github
    return (
      <>
        <div
          style={{
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '1rem',
            fontSize: '1.5rem',
          }}
        >
          Something went wrong
        </div>
        <Title style={{ fontSize: '1.25rem', marginBottom: 0 }}>
          {state.editor.error}
        </Title>
        <br/>
        <div style={{ display: 'flex', maxWidth: 400, width: '100%' }}>
          <Button block small style={{ margin: '.5rem' }} href="/s">
            Create Sandbox
          </Button>
          <Button block small style={{ margin: '.5rem' }} href="/">
            {hasLogIn ? 'Dashboard' : 'Homepage'}
          </Button>
        </div>
        {hasLogIn && isGithub && !hasPrivateAccess && (
          <div style={{ maxWidth: 400, marginTop: '2.5rem', width: '100%' }}>
            <div
              style={{
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1rem',
                fontSize: '1rem',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              Did you try to open a private GitHub repository and are you a{' '}
              <Link to="/patron">patron</Link>? Then you might need to get
              private access:
            </div>
            {/*<GithubIntegration small/>*/}
          </div>
        )}
      </>
    )
  }

  if (
    state.editor.isLoading ||
    (state.live.isTeam && state.live.isLoading) ||
    state.editor.currentSandbox == null
  ) {
    return (
      <>
        <Skeleton
          titles={[
            {
              content: 'Loading Sandbox',
              delay: 0.6,
            },
            {
              content: 'Fetching git repository...',
              delay: 2,
            },
          ]}
        />
      </>
    )
  }

  return null
}

export default function(props) {
  const { match } = props
  const {state, actions} = useOvermind()
  const { id } = match.params
  const sandbox = state.editor.currentSandbox

  actions.editor.sandboxChanged({ id })

  const content = getContent(props)
  if (content) {
    return (
      <Fullscreen>
        <Padding
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
          }}
          margin={1}
        >
          {/*<Navigation title="Sandbox Editor"/>*/}
          <Centered
            style={{ flex: 1, width: '100%', height: '100%' }}
            horizontal
            vertical
          >
            {content}
          </Centered>
        </Padding>
      </Fullscreen>
    )
  }

  return (
    <>
      <Helmet>
        <title>{getSandboxName(sandbox)} - CodeSandbox</title>
      </Helmet>
      {/*<Editor match={match}/>*/}
      <QuickActions/>
    </>
  )
}
