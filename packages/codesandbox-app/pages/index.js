import React, { useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import _debug from '@codesandbox/common/lib/utils/debug'
import { NotificationStatus, Toasts } from '@codesandbox/notifications'
import { notificationState } from '@codesandbox/common/lib/utils/notifications'
import send, { DNT } from '@codesandbox/common/lib/utils/analytics'
import theme from '@codesandbox/common/lib/theme'
import { Button } from '@codesandbox/common/lib/components/Button'
import { useOvermind } from '~/overmind'

import Loadable from '~/utils/Loadable'
// import { ErrorBoundary } from './common/ErrorBoundary'
import HTML5Backend from './common/HTML5BackendWithFolderSupport'
// import Modals from './common/Modals'
import Sandbox from './Sandbox'
import NewSandbox from './NewSandbox'
// import Dashboard from './Dashboard'
import { Container, Content } from './elements'

const routeDebugger = _debug('cs:app:router')

// const SignIn = Loadable(() => import('./common/SignIn'));
// const Live = Loadable(() => import('./Live');
// const ZeitSignIn = Loadable(() => import('./common/ZeitAuth'));
const NotFound = Loadable(() => import('./common/NotFound'))
// const Profile = Loadable(() => import('./Profile'));
// const Search = Loadable(() => import('./Search'));
// const CLI = Loadable(() => import('./CLI'));
//
// const GitHub = Loadable(() => import('./GitHub'));
// const CliInstructions = Loadable(() => import('./CliInstructions'));
// const Patron = Loadable(() => import('./Patron'));
// const Curator = Loadable(() => import('./Curator'));
// const CodeSadbox = () => this[`💥`].kaboom();

export const Routes = () => {
  const {actions} = useOvermind()

  useEffect(() => () => actions.appUnmounted(), [actions.appUnmounted])

  return (
    <DndProvider backend={HTML5Backend}>
    <Container>
      <Route
        path="/"
        render={({ location }) => {
          if (process.env.NODE_ENV === 'production') {
            routeDebugger(
              `Sending '${location.pathname + location.search}' to ga.`,
            )
            if (typeof window.ga === 'function' && !DNT) {
              window.ga(
                'set',
                'page',
                location.pathname + location.search,
              )

              send('pageview', { path: location.pathname + location.search })
            }
          }
          return null
        }}
      />
      <Toasts
        colors={{
          [NotificationStatus.ERROR]: theme.dangerBackground(),
          [NotificationStatus.SUCCESS]: theme.green(),
          [NotificationStatus.NOTICE]: theme.secondary(),
          [NotificationStatus.WARNING]: theme.primary(),
        }}
        state={notificationState}
        Button={Button}
      />
      <Content>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/s"/>}/>
          {/*<Route exact path="/s/github" component={GitHub}/>*/}
          {/*<Route exact path="/s/cli" component={CliInstructions}/>*/}
          <Route exact path="/s" component={NewSandbox}/>
          {/*<Route path="/dashboard" component={Dashboard}/>*/}
          {/*<Route path="/curator" component={Curator}/>*/}
          <Route path="/s/:id*" component={Sandbox}/>
          {/*<Route path="/live/:id" component={Live}/>*/}
          {/*<Route path="/signin" exact component={Dashboard}/>*/}
          {/*<Route path="/signin/:jwt?" component={SignIn}/>*/}
          {/*<Route path="/u/:username" component={Profile}/>*/}
          {/*<Route path="/search" component={Search}/>*/}
          {/*<Route path="/patron" component={Patron}/>*/}
          {/*<Route path="/cli/login" component={CLI}/>*/}
          {/*<Route path="/auth/zeit" component={ZeitSignIn}/>*/}
          {/*{process.env.NODE_ENV === `development` && (*/}
          {/*<Route path="/codesadbox" component={CodeSadbox}/>*/}
          {/*)}*/}
          <Route component={NotFound}/>
        </Switch>
      </Content>
      {/*<Modals/>*/}
    </Container>
    </DndProvider>
  )
}
