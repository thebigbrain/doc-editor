import addListener from '@csb/common/lib/connection-manager';

const listeners = new Map();

export default {
  addListener(listener) {
    const disposer = addListener(listener);
    listeners.set(listener, disposer);
  },
  removeListener(listener) {
    if (listeners.has(listener)) {
      listeners.get(listener)();
      listeners.delete(listener);
    }
  },
};
