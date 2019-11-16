import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import _debug from '@csb/common/lib/utils/debug';

import * as childProcess from 'node-services/lib/child_process';
import { createOvermind } from 'overmind';
import { logError } from '@csb/common/lib/utils/analytics';
import '@csb/common/lib/global.css';
import history from '~/utils/history';
// import { client } from '~/graphql/client'
import requirePolyfills from '@csb/common/lib/load-dynamic-polyfills';
import { convertTypeToStatus, notificationState } from '@csb/common/lib/utils/notifications';
import 'normalize.css';
import theme from '@csb/common/lib/theme';
import { isSafari } from '@csb/common/lib/utils/platform';

import { Routes as App } from './pages';
import { config } from './overmind';
import { OvermindProvider } from '@muggle/hooks';
import './split-pane.css';
// import { getTypeFetcher } from './vscode/extensionHostWorker/common/type-downloader';
// import { vscode } from './vscode';
// import {
//   initializeThemeCache,
//   initializeSettings,
//   initializeExtensionsFolder,
//   initializeCustomTheme,
//   setVimExtensionEnabled,
// } from './vscode/initializers';
// import { EXTENSIONS_LOCATION } from './vscode/constants';

// import BrowserFS from 'browserfs';

const debug = _debug('cs:app');

window.setImmediate = (func, delay) => setTimeout(func, delay);

window.addEventListener('unhandledrejection', e => {
  if (e && e.reason && e.reason.name === 'Canceled') {
    // This is an error from vscode that vscode uses to cancel some actions
    // We don't want to show this to the user
    e.preventDefault();
  }
});

async function boot(overmind) {
  requirePolyfills().then(() => {
    if (isSafari) {
      import('subworkers');
    }

    const rootEl = document.getElementById('root');

    window.showNotification = (message, type) => {
      notificationState.addNotification({
        message,
        status: convertTypeToStatus(type),
      });
    };

    try {
      render(
        <OvermindProvider value={overmind}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <App />
            </Router>
          </ThemeProvider>
        </OvermindProvider>,
        rootEl,
      );
    } catch (e) {
      logError(e);
    }
  });
}

async function initialize() {
  /*
    Configure Cerebral and Overmind
  */

  const overmind = createOvermind(config, {
    devtools: false,
    // (window.opener && window.opener !== window) || !window.chrome
    //   ? false
    //   : 'localhost:3031',
    name:
      'CodeSandbox - ' +
      (navigator.userAgent.indexOf('Chrome/76') > 0 ? 'Chrome' : 'Canary'),
    logProxies: true,
  });

  boot(overmind);

  // const getState = () => overmind.state;
  // const getSignal = () => overmind.actions;

  // window.process = {
  //   env: {
  //     VSCODE_DEV: false,
  //   },
  //   nextTick: function(cb) {
  //     return requestAnimationFrame(cb)
  //   },
  //   once: BrowserFS.BFSRequire('process').once,
  //   removeListener: function() {
  //   },
  // };
  
  // window.Buffer = BrowserFS.BFSRequire('buffer').Buffer;
  // window.require =BrowserFS.BFSRequire.bind(BrowserFS);

  // // Configures BrowserFS to use the LocalStorage file system.
  // BrowserFS.configure(
  //   {
  //     fs: 'MountableFileSystem',
  //     options: {
  //       '/': { fs: 'InMemory', options: {} },
  //       '/sandbox': {
  //         fs: 'CodeSandboxEditorFS',
  //         options: {
  //           api: {
  //             getState: () => ({
  //               modulesByPath: getState().editor.currentSandbox
  //                 ? getState().editor.modulesByPath
  //                 : {},
  //             }),
  //           },
  //         },
  //       },
  //       '/sandbox/node_modules': {
  //         fs: 'CodeSandboxFS',
  //         options: getTypeFetcher().options,
  //       },
  //       '/vscode': {
  //         fs: 'LocalStorage',
  //       },
  //       '/home': {
  //         fs: 'LocalStorage',
  //       },
  //       '/extensions': {
  //         fs: 'BundledHTTPRequest',
  //         options: {
  //           index: EXTENSIONS_LOCATION + '/extensions/index.json',
  //           baseUrl: EXTENSIONS_LOCATION + '/extensions',
  //           bundle: EXTENSIONS_LOCATION + '/bundles/main.min.json',
  //           logReads: process.env.NODE_ENV === 'development',
  //         },
  //       },
  //       '/extensions/custom-theme': {
  //         fs: 'InMemory',
  //       },
  //     },
  //   },
  //   async e => {
  //     if (e) {
  //       console.error('Problems initializing FS', e);
  //       // An error happened!
  //       throw e;
  //     }

  //     const isVSCode = true;

  //     if (isVSCode) {
  //       // For first-timers initialize a theme in the cache so it doesn't jump colors
  //       initializeExtensionsFolder();
  //       initializeCustomTheme();
  //       initializeThemeCache();
  //       initializeSettings();
  //       setVimExtensionEnabled(
  //         localStorage.getItem('settings.vimmode') === 'true'
  //       );
  //     }

  //     // eslint-disable-next-line global-require
  //     vscode.loadScript(
  //       ['vs/editor/codesandbox.editor.main'],
  //       true,
  //       () => {
  //         if (process.env.NODE_ENV === 'development') {
  //           console.log('Loaded Monaco'); // eslint-disable-line
  //         }

  //         vscode.acquireController({
  //           getSignal,
  //           getState,
  //         });

  //         import(
  //           './vscode/extensionHostWorker/bootstrappers/ext-host.worker'
  //         ).then(ExtHostWorkerLoader => {
  //           childProcess.addDefaultForkHandler(ExtHostWorkerLoader.default);
  //           // child_process.preloadWorker('/vs/bootstrap-fork');
  //         });

  //         // import('worker-loader?publicPath=/&name=ext-host-worker.[hash:8].worker.js!./vscode/extensionHostWorker/services/searchService').then(
  //         //   SearchServiceWorker => {
  //         //     child_process.addForkHandler(
  //         //       'csb:search-service',
  //         //       SearchServiceWorker.default
  //         //     );
  //         //   }
  //         // );

  //         boot(overmind);
  //       }
  //     );
  //   }
  // );
}

initialize();
