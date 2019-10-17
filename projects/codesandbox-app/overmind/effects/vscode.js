import { vscode } from 'app/vscode';
export default {
    callCallbackError(id, message) {
        // @ts-ignore
        if (window.cbs && window.cbs[id]) {
            const errorMessage = message || 'Something went wrong while saving the file.';
            // @ts-ignore
            window.cbs[id](new Error(errorMessage), undefined);
            // @ts-ignore
            delete window.cbs[id];
        }
    },
    callCallback(id) {
        // @ts-ignore
        if (window.cbs && window.cbs[id]) {
            // @ts-ignore
            window.cbs[id](undefined, undefined);
            // @ts-ignore
            delete window.cbs[id];
        }
    },
    runCommand(command) {
        // @ts-ignore
        vscode.runCommand(command);
    },
};
