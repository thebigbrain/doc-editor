/* @flow */
import React from 'react'
import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import MaxWidth from '@codesandbox/common/lib/components/flex/MaxWidth'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import { profileLikesUrl, profileSandboxesUrl } from '@codesandbox/common/lib/utils/url-generator'
import { inject, observer } from 'app/componentConnectors'
import { NotFound } from 'app/pages/common/NotFound'
import Header from './Header'
import Navigation from './Navigation'
import Showcase from './Showcase'
import Sandboxes from './Sandboxes'
import { Container, Content } from './elements'

type
Props = {
  match: {
    params: { username: string },
    url: string,
  },
  signals: any,
  store: any,
}

class Profile extends React.Component<Props> {
  componentDidMount() {
    const { username } = this.props.match.params

    this.props.signals.profile.profileMounted({ username })
  }

  componentDidUpdate(prevProps) {
    const prevUsername = prevProps.match.params.username
    const { username } = this.props.match.params

    if (prevUsername !== username) {
      this.props.signals.profile.profileMounted({ username })
    }
  }

  render() {
    const { store, match } = this.props

    if (store.profile.notFound) {
      return <NotFound/>
    }

    if (!store.profile.current) return <div/>

    const user = store.profile.current

    return (
      <Container>
        <Helmet>
          <title>{user.name || user.username} - CodeSandbox</title>
        </Helmet>
        <Header user={user}/>
        <Content>
          <MaxWidth>
            <Navigation
              username={user.username}
              sandboxCount={user.sandboxCount}
              likeCount={user.givenLikeCount}
            />
          </MaxWidth>
        </Content>
        <MaxWidth width={1024}>
          <Margin horizontal={2} style={{ minHeight: '60vh' }}>
            <Switch>
              <Route path={match.url} exact render={() => <Showcase/>}/>
              <Route
                path={`${profileSandboxesUrl(user.username)}/:page?`}
                // eslint-disable-next-line
                children={({ match }) => (
                  <Sandboxes
                    source="currentSandboxes"
                    page={match.params.page && +match.params.page}
                    baseUrl={profileSandboxesUrl(user.username)}
                  />
                )}
              />
              <Route
                path={`${profileLikesUrl(user.username)}/:page?`}
                // eslint-disable-next-line
                children={({ match }) => (
                  <Sandboxes
                    source="currentLikedSandboxes"
                    page={match.params.page && +match.params.page}
                    baseUrl={profileLikesUrl(user.username)}
                  />
                )}
              />
            </Switch>
          </Margin>
        </MaxWidth>
      </Container>
    )
  }
}

// eslint-disable-next-line import/no-default-export
export default inject('signals', 'store')(observer(Profile))
