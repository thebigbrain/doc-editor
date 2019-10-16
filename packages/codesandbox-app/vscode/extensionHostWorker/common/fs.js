import { getTypeFetcher } from './type-downloader';
import { EXTENSIONS_LOCATION } from '../../constants';
const global = self;
export const BROWSER_FS_CONFIG = {
    fs: 'MountableFileSystem',
    options: {
        '/': { fs: 'InMemory', options: {} },
        '/tmp': { fs: 'InMemory', options: {} },
        '/worker': { fs: 'WorkerFS', options: { worker: self } },
        '/sandbox': {
            fs: 'InMemory',
        },
        '/vscode': {
            fs: 'InMemory',
            options: {},
        },
        '/extensions': {
            fs: 'BundledHTTPRequest',
            options: {
                index: EXTENSIONS_LOCATION + '/extensions/index.json',
                baseUrl: EXTENSIONS_LOCATION + '/extensions',
                logReads: process.env.NODE_ENV === 'development',
            },
        },
    },
};
export async function initializeBrowserFS({ syncSandbox = false, syncTypes = false, extraMounts = {}, } = {}) {
    return new Promise(async (resolve) => {
        const config = { ...BROWSER_FS_CONFIG };
        let modulesByPath = {};
        if (syncSandbox) {
            if (syncTypes) {
                const { options } = getTypeFetcher();
                config.options['/sandbox/node_modules'] = {
                    fs: 'CodeSandboxFS',
                    options,
                };
            }
            config.options['/sandbox'] = {
                fs: 'CodeSandboxEditorFS',
                options: {
                    api: {
                        getState: () => ({
                            modulesByPath,
                        }),
                    },
                },
            };
        }
        config.options = { ...config.options, ...extraMounts };
        global.BrowserFS.configure(config, async (e) => {
            if (e) {
                console.error(e);
                return;
            }
            let resolved = false;
            if (syncSandbox) {
                self.addEventListener('message', evt => {
                    if (evt.data.$type === 'file-sync') {
                        modulesByPath = evt.data.$data;
                        if (!resolved) {
                            resolve();
                            resolved = true;
                        }
                    }
                });
            }
            else {
                resolve();
            }
            // BrowserFS is initialized and ready-to-use!
        });
    });
}
