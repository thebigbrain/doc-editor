import { executorsManager } from '~/utils/executor-manager';
export default {
    initializeExecutor(sandbox) {
        return executorsManager.initializeExecutor(sandbox);
    },
    setupExecutor() {
        return executorsManager.setupExecutor();
    },
    listen(event, action) {
        const executor = executorsManager.getExecutor();
        if (!executor) {
            throw new Error('Executor is not defined yet, this is an impossible state');
        }
        return executor.on(event, data => {
            action({ event, data: data || {} });
        });
    },
    emit(message, data) {
        const executor = executorsManager.getExecutor();
        if (executor) {
            executor.emit(message, data);
        }
    },
    closeExecutor() {
        return executorsManager.closeExecutor();
    },
    updateFiles(sandbox) {
        return executorsManager.updateFiles(sandbox);
    },
    isServer() {
        return executorsManager.isServer();
    },
};
