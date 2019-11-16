import { commonPostMessage, getGlobal } from '@codesandbox/common/lib/utils/global';
const ctx = getGlobal();
export function getTypeFetcher() {
    let types = {};
    const options = {
        manager: {
            getTranspiledModules: () => types,
            addModule(module) {
            },
            removeModule(module) {
            },
            moveModule(module, newPath) {
            },
            updateModule(module) {
            },
        },
    };
    self.addEventListener('message', evt => {
        if (evt.data.$type === 'typings-sync') {
            types = evt.data.$data;
            // This forces the file watchers to emit, which causes typescript to reload
            ctx.BrowserFS.BFSRequire('fs').rename('/sandbox/node_modules/@types', '/sandbox/node_modules/@types', () => {
            });
        }
    });
    commonPostMessage({
        $broadcast: true,
        $type: 'request-data',
        $data: {},
    });
    return { options };
}
