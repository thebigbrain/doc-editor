const HandlerCache = new Map();

export default class Handler {
  static get(name, options={}) {
    return HandlerCache.get(name);
  }

  static register(handlers) {
    for (let k in handlers) {
      if (handlers.hasOwnProperty(k) && typeof handlers[k] === 'function') {
        const _ = async function (...args) {
          let hResult = new HandleResult();
          try {
            hResult.value = await handlers[k](...args);
          } catch (e) {
            hResult.error = e;
          }
          return hResult;
        };
        HandlerCache.set(k, _);
      }
    }
  }
}

class HandleResult {
  error = null;
  value = null;

  hasError() {
    return this.error != null;
  }

  result() {
    return this.value;
  }
}
