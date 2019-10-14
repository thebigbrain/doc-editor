import React from 'react'
import {render} from 'react-dom'
import {ThemeProvider} from 'styled-components'
import {Router} from 'react-router-dom'
import _debug from '@codesandbox/common/lib/utils/debug'
import {createOvermind} from 'overmind'
import {logError} from '@codesandbox/common/lib/utils/analytics'
import '@codesandbox/common/lib/global.css'
import history from '~/utils/history'
// import { client } from '~/graphql/client'
import requirePolyfills from '@codesandbox/common/lib/load-dynamic-polyfills'
import {convertTypeToStatus, notificationState} from '@codesandbox/common/lib/utils/notifications'
import 'normalize.css'
import theme from '@codesandbox/common/lib/theme'
import {isSafari} from '@codesandbox/common/lib/utils/platform'

import {Routes as App} from './pages'
import {config, OvermindProvider} from './overmind'
import './split-pane.css'

const debug = _debug('cs:app')

window.setImmediate = (func, delay) => setTimeout(func, delay)

window.addEventListener('unhandledrejection', e => {
  if (e && e.reason && e.reason.name === 'Canceled') {
    // This is an error from vscode that vscode uses to cancel some actions
    // We don't want to show this to the user
    e.preventDefault()
  }
})

async function boot(overmind) {
  requirePolyfills().then(() => {
    if (isSafari) {
      import('subworkers')
    }

    const rootEl = document.getElementById('root')

    const showNotification = (message, type) => {
      notificationState.addNotification({
        message,
        status: convertTypeToStatus(type),
      })
    }

    window.showNotification = showNotification

    try {
      render(
        <OvermindProvider value={overmind}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <App/>
            </Router>
          </ThemeProvider>
        </OvermindProvider>,
        rootEl,
      )
    } catch (e) {
      logError(e)
    }
  })
}

async function initialize() {
  /*
    Configure Cerebral and Overmind
  */

  const overmind = createOvermind(config, {
    devtools:
      (window.opener && window.opener !== window) || !window.chrome
        ? false
        : 'localhost:3031',
    name:
      'CodeSandbox - ' +
      (navigator.userAgent.indexOf('Chrome/76') > 0 ? 'Chrome' : 'Canary'),
    logProxies: true,
  })

  boot(overmind)
}

initialize()
