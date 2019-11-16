import * as childProcess from 'node-services/lib/child_process';
// @ts-ignore
import DefaultWorkLoader from './generic-1.worker';
// @ts-ignore
import TSWorker from './ts-extension.worker';
// @ts-ignore
import VueWorker from './vue-worker.worker';
// @ts-ignore
import SvelteWorker from './svelte-worker.worker';
import { initializeAll } from '../common/global';

childProcess.addDefaultForkHandler(DefaultWorkLoader);
childProcess.addForkHandler('/extensions/node_modules/typescript/lib/tsserver.js', TSWorker);
childProcess.addForkHandler('/extensions/octref.vetur.0.16.2/server/dist/vueServerMain.js', VueWorker);
childProcess.addForkHandler('/extensions/jamesbirtles.svelte-vscode-0.7.1/node_modules/svelte-language-server/bin/server.js', SvelteWorker);

initializeAll().then(() => {
    // Preload the TS worker for fast init
    childProcess.preloadWorker('/extensions/node_modules/typescript/lib/tsserver.js');
    require('../workers/ext-host-worker');
});
