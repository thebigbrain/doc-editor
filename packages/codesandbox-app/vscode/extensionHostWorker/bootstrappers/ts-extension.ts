import * as childProcess from 'node-services/lib/child_process';
// @ts-ignore
import SubWorkLoader from 'worker-loader?publicPath=/&name=sub-dynamic-worker.[hash:8].worker.js!./generic-2';
import { initializeAll } from '../common/global';
import { EXTENSIONS_LOCATION } from '../../constants';

declare const __DEV__: boolean;
childProcess.addDefaultForkHandler(SubWorkLoader);

initializeAll().then(() => {
  // Use require so that it only starts executing the chunk with all globals specified.
  require('../workers/generic-worker').start({
    syncSandbox: true,
    syncTypes: true,
    extraMounts: {
      '/extensions': {
        fs: 'BundledHTTPRequest',
        options: {
          index: EXTENSIONS_LOCATION + '/extensions/index.json',
          baseUrl: EXTENSIONS_LOCATION + '/extensions',
          bundle: EXTENSIONS_LOCATION + '/bundles/ts.min.json',
          logReads: __DEV__,
        },
      },
    },
  });
});
