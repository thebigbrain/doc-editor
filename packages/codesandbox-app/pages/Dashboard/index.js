// @ts-check
import * as React from 'react'
import { inject, observer } from 'app/componentConnectors'
import RightIcon from 'react-icons/lib/md/keyboard-arrow-right'
import LeftIcon from 'react-icons/lib/md/keyboard-arrow-left'
import { withRouter } from 'react-router-dom'
import { Navigation } from 'app/pages/common/Navigation'
import { SignInButton } from 'app/pages/common/SignInButton'
import { client } from 'app/graphql/client'

import SidebarContents from './Sidebar/index'
import Content from './Content/index'
import {
  Centered,
  Container,
  Content as ContentContainer,
  LoggedInContainer,
  LoggedInTitle,
  NavigationContainer,
  OffsettedLogo,
  ShowSidebarButton,
  Sidebar,
} from './elements'

class Dashboard extends React.Component {
  state = {
    showSidebar: false,
  }
  onRouteChange = () => {
    this.setState({ showSidebar: false })
  }
  toggleSidebar = () => {
    this.setState(({ showSidebar }) => ({ showSidebar: !showSidebar }))
  }

  componentDidMount() {
    this.props.signals.dashboard.dashboardMounted()
  }

  componentWillUnmount() {
    // Reset store so new visits get fresh data
    client.resetStore()
  }

  render() {
    const {
      store: { hasLogIn },
      history,
    } = this.props
    const { showSidebar } = this.state

    history.listen(({ state }) => {
      if (!!state && state.from === 'sandboxSearchFocused') {
        return
      }

      this.onRouteChange()
    })

    let DashboardContent = (
      <>
        <Sidebar active={showSidebar}>
          <SidebarContents/>
          <ShowSidebarButton onClick={this.toggleSidebar}>
            {showSidebar ? (
              <LeftIcon style={{ color: 'white' }}/>
            ) : (
              <RightIcon style={{ color: 'white' }}/>
            )}
          </ShowSidebarButton>
        </Sidebar>

        <ContentContainer>
          <Content/>
        </ContentContainer>
      </>
    )

    if (!hasLogIn) {
      DashboardContent = (
        <Container>
          <Centered>
            <LoggedInContainer>
              <OffsettedLogo/>
              <LoggedInTitle>Sign in to CodeSandbox</LoggedInTitle>

              <SignInButton big style={{ fontSize: '1rem' }}/>
            </LoggedInContainer>
          </Centered>
        </Container>
      )
    }

    return (
      <Container>
        <NavigationContainer>
          <Navigation searchNoInput title="Dashboard"/>
        </NavigationContainer>

        <div style={{ display: 'flex', overflow: 'hidden' }}>
          {DashboardContent}
        </div>
      </Container>
    )
  }
}

export default inject('store', 'signals')(withRouter(observer(Dashboard)))
