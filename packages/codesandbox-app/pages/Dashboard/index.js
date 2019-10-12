// @ts-check
import React from 'react'
import { MdKeyboardArrowRight as RightIcon, MdKeyboardArrowLeft as LeftIcon } from 'react-icons/md'
import { Navigation } from '~/pages/common/Navigation'
import { SignInButton } from '~/pages/common/SignInButton'

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
import { useOvermind } from '~/overmind'

export default function(props) {
  const { history } = props
  const { state, actions } = useOvermind()
  const [showSidebar, setShowSidebar] = React.useState(false)

  const onRouteChange = () => {
    setShowSidebar(false)
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  React.useEffect(() => {
    actions.dashboard.dashboardMounted()
  }, [])

  history.listen(({ state }) => {
    if (!!state && state.from === 'sandboxSearchFocused') {
      return
    }

    onRouteChange()
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

  if (!state.hasLogIn) {
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
