import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@csb/common/lib/components/Button'
import MaxWidth from '@csb/common/lib/components/flex/MaxWidth'
import Margin from '@csb/common/lib/components/spacing/Margin'
import { gitHubRepoPattern, gitHubToSandboxUrl, protocolAndHost } from '@csb/common/lib/utils/url-generator'
import { hooksObserver, inject } from 'app/componentConnectors'
import { Title } from 'app/components/Title'
import { SubTitle } from 'app/components/SubTitle'
import { Navigation } from 'app/pages/common/Navigation'
import { Container, Content, Description, ErrorMessage, Label, StyledInput } from './elements'

const getFullGitHubUrl = url =>
  `${protocolAndHost()}${gitHubToSandboxUrl(url)}`

const GitHub = ({ signals: { githubPageMounted } }) => {
  const [error, setError] = useState(null)
  const [transformedUrl, setTransformedUrl] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    githubPageMounted()
  }, [githubPageMounted])

  const updateUrl = useCallback(({ target: { value: newUrl } }) => {
    if (!newUrl) {
      setError(null)
      setTransformedUrl('')
      setUrl(newUrl)
    } else if (!gitHubRepoPattern.test(newUrl)) {
      setError('The URL provided is not valid.')
      setTransformedUrl('')
      setUrl(newUrl)
    } else {
      setError(null)
      setTransformedUrl(getFullGitHubUrl(newUrl.trim()))
      setUrl(newUrl)
    }
  }, [])

  return (
    <MaxWidth>
      <Margin vertical={1.5} horizontal={1.5}>
        <Container>
          <Navigation title="GitHub Import"/>

          <Content
            vertical
            horizontal
            css={`
              margin-top: 5rem;
            `}
          >
            <Description>
              <Title>Import from GitHub</Title>

              <SubTitle>
                Enter the URL to your GitHub repository to generate a URL to
                your sandbox. The sandbox will stay in sync with your
                repository.
                <br/>
                <a
                  href="/docs/importing#import-from-github"
                  rel="noopener norefereer"
                  target="_blank"
                >
                  See the docs
                </a>
              </SubTitle>
            </Description>

            <Label htmlFor="githuburl">
              URL to GitHub Repository (supports branches and paths too)
            </Label>

            <StyledInput
              name="githuburl"
              onChange={updateUrl}
              placeholder="Insert GitHub URL..."
              value={url}
            />

            {error !== null && <ErrorMessage>{error}</ErrorMessage>}

            <Label htmlFor="sandboxurl">Converted Sandbox URL</Label>

            <StyledInput
              name="sandboxurl"
              placeholder="The Sandbox URL"
              value={transformedUrl}
            />

            <Button disabled={!transformedUrl} to={gitHubToSandboxUrl(url)}>
              Open Sandbox
            </Button>
          </Content>
        </Container>
      </Margin>
    </MaxWidth>
  )
}

// eslint-disable-next-line import/no-default-export
export default inject('signals')(hooksObserver(GitHub))
