import { EventEmitter } from 'events';
import { protocolAndHost } from '@codesandbox/common/lib/utils/url-generator';
import { commonPostMessage } from '@codesandbox/common/lib/utils/global';
import _debug from '@codesandbox/common/lib/utils/debug';

const debug = _debug('cs:node:child_process');

const isSafari =
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

let DefaultWorker: false | (() => Worker);
const workerMap: Map<string, false | (() => Worker)> = new Map();

function addDefaultForkHandler(worker: false | (() => Worker)) {
  DefaultWorker = worker;
}
function addForkHandler(path: string, worker: false | (() => Worker)) {
  workerMap.set(path, worker);
}

interface IProcessOpts {
  silent?: boolean;
  detached?: boolean;
  execArgv?: string[];
  cwd?: string;
  env?: {
    [key: string]: any;
  };
}

class Stream extends EventEmitter {
  constructor(private worker: Worker) {
    super();
  }

  setEncoding() {}

  write(message: string) {
    this.worker.postMessage({ $type: 'input-write', $data: message });
  }
}

class NullStream extends EventEmitter {
  setEncoding() {}
}

class NullChildProcess extends EventEmitter {
  public stdout: NullStream = new NullStream();
  public stderr: NullStream = new NullStream();
  public stdin: NullStream = new NullStream();

  public kill() {}
}

class ChildProcess extends EventEmitter {
  public stdout: Stream;
  public stderr: Stream;
  public stdin: Stream;

  private destroyed = false;

  constructor(private worker: Worker) {
    super();
    this.stdout = new Stream(worker);
    this.stderr = new Stream(worker);
    this.stdin = new Stream(worker);

    this.listen();
  }

  public send(message: any, _a: any, _b: any, callback: (arg: any) => void) {
    if (this.destroyed) {
      callback(new Error('This connection has been killed'));
      return;
    }

    const m = {
      $type: 'message',
      $data: JSON.stringify(message),
    };
    this.worker.postMessage(m);

    if (typeof _a === 'function') {
      _a(null);
    } else if (typeof _b === 'function') {
      _b(null);
    } else if (typeof callback === 'function') {
      callback(null);
    }
  }

  public kill() {
    this.destroyed = true;
    this.worker.removeEventListener('message', this.listener.bind(this));

    this.worker.terminate();
  }

  private listener(message: MessageEvent) {
    const data = message.data.$data;

    if (data) {
      switch (message.data.$type) {
        case 'stdout':
          this.stdout.emit('data', data);
          break;
        case 'message':
          this.emit('message', JSON.parse(data));
          break;
        default:
          break;
      }
    }
  }

  private listen() {
    this.worker.addEventListener('message', this.listener.bind(this));
  }
}

const cachedWorkers: { [path: string]: Array<Worker | false> } = {};
const cachedDefaultWorkers: Array<Worker | false> = [];

function getWorker(path: string) {
  let WorkerConstructor = workerMap.get(path);

  if (!WorkerConstructor) {
    WorkerConstructor = DefaultWorker;

    // Explicitly ignore
    if (WorkerConstructor === false) {
      return false;
    }

    if (WorkerConstructor == null) {
      throw new Error('No worker set for path: ' + path);
    }
  }

  const worker = WorkerConstructor();

  // Register file system that syncs with filesystem in manager
  BrowserFS.FileSystem.WorkerFS.attachRemoteListener(worker);

  return worker;
}

function getWorkerFromCache(path: string, isDefaultWorker: boolean) {
  if (isDefaultWorker) {
    const cachedDefaultWorker = cachedDefaultWorkers.pop();

    if (cachedDefaultWorker) {
      return cachedDefaultWorker;
    }
  } else if (cachedWorkers[path]) {
    return cachedWorkers[path].pop();
  }

  return undefined;
}

const sentBroadcasts: Map<string, number[]> = new Map();
/**
 * Broadcasts a message if it hasn't been sent by this worker/window before
 */
function handleBroadcast(
  path: string,
  target: Worker | Window,
  data: {
    $id?: number;
    $data: object;
    $type: string;
  }
) {
  const sentBroadcastsForPath = sentBroadcasts.get(path) || [];

  if (data.$id && sentBroadcastsForPath.indexOf(data.$id) > -1) {
    return;
  }

  data.$id = data.$id || Math.random() * 1000000;

  if (sentBroadcastsForPath.length > 100) {
    sentBroadcastsForPath.shift();
  }
  sentBroadcastsForPath.push(data.$id);
  if (
    // @ts-ignore This check is for the subworker polyfill, if it has an id it's polyfilled by subworkers and indeed a worker
    target.id ||
    target.constructor.name === 'Worker' ||
    // @ts-ignore Unknown to TS
    (typeof DedicatedWorkerGlobalScope !== 'undefined' &&
      // @ts-ignore Unknown to TS
      target instanceof DedicatedWorkerGlobalScope)
  ) {
    // @ts-ignore
    target.postMessage(data);
  } else {
    (target as Window).postMessage(data, protocolAndHost());
  }

  sentBroadcasts.set(path, sentBroadcastsForPath);
}

function fork(path: string, argv?: string[], processOpts?: IProcessOpts) {
  const WorkerConstructor = workerMap.get(path);
  const isDefaultWorker = !WorkerConstructor;

  const worker = getWorkerFromCache(path, isDefaultWorker) || getWorker(path);

  if (worker === false) {
    return new NullChildProcess();
  }

  debug('Forking', path);

  const WORKER_ID = path + '-' + Math.floor(Math.random() * 100000);

  self.addEventListener('message', ((e: MessageEvent) => {
    const { data } = e;

    if (data.$broadcast) {
      handleBroadcast(WORKER_ID, worker, data);
      return;
    }

    if (!data.$sang && data.$type) {
      const newData = {
        $sang: true,
        $data: data,
      };

      worker.postMessage(newData);
    }
  }) as EventListener);

  worker.addEventListener('message', e => {
    const { data } = e;

    if (data.$broadcast) {
      handleBroadcast(WORKER_ID, self, data);
      return;
    }

    if (!data.$sang && data.$type) {
      const newData = {
        $sang: true,
        $data: data,
      };

      commonPostMessage(newData);
    }
  });

  const data: any = {
    entry: path,
    argv: argv || [],
  };

  if (processOpts) {
    data.env = processOpts.env;
    data.cwd = processOpts.cwd;
    data.execArgv = processOpts.execArgv;
  }

  if (isSafari) {
    // For Safari it takes a while until the worker started, so we listen for ready message
    // and send a message anyway if a second passes

    let sentReady = false;
    const timeout = setTimeout(() => {
      if (!sentReady) {
        worker.postMessage({
          $type: 'worker-manager',
          $event: 'init',
          data,
        });
        sentReady = true;
      }
    }, 1500);

    worker.addEventListener('message', e => {
      if (!sentReady && e.data && e.data.$type === 'ready') {
        worker.postMessage({
          $type: 'worker-manager',
          $event: 'init',
          data,
        });
        clearTimeout(timeout);
        sentReady = true;
      }
    });
  } else {
    worker.postMessage({
      $type: 'worker-manager',
      $event: 'init',
      data,
    });
  }

  return new ChildProcess(worker);
}

function preloadWorker(path: string) {
  const WorkerConstructor = workerMap.get(path);
  const isDefaultWorker = !WorkerConstructor;

  const worker = getWorker(path);

  if (isDefaultWorker) {
    cachedDefaultWorkers.push(worker);
  } else {
    cachedWorkers[path] = cachedWorkers[path] || [];
    cachedWorkers[path].push(worker);
  }
}

function execFileSync(path: string) {
  if (process.env.NODE_ENV === 'development') {
    debug('EXEC_FILE_SYNC', path);
  }
}

function execSync(path: string) {
  if (process.env.NODE_ENV === 'development') {
    debug('EXEC_SYNC', path);
  }
}

export {
  addForkHandler,
  addDefaultForkHandler,
  preloadWorker,
  fork,
  execSync,
  execFileSync,
};
