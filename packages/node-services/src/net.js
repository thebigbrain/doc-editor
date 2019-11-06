import { EventEmitter } from 'events';
import { commonPostMessage } from '@codesandbox/common/lib/utils/global';
import { protocolAndHost } from '@codesandbox/common/lib/utils/url-generator';
const SOCKET_IDENTIFIER = 'node-socket';
export class Socket extends EventEmitter {
    constructor(target, channel, isWorker) {
        super();
        this.target = target;
        this.channel = channel;
        this.isWorker = isWorker;
        this.destroyed = false;
        this.emit('connect');
        this.startListening();
    }
    setEncoding(encoding) {
        this.encoding = encoding;
    }
    defaultListener(e) {
        const evt = e;
        if ((evt.source || self) !== this.target) {
            return;
        }
        const data = evt.data.$data;
        if (!data) {
            return;
        }
        if (data.$type === SOCKET_IDENTIFIER && data.$channel === this.channel) {
            this.emit('data', Buffer.from(JSON.parse(data.data)));
        }
    }
    startListening() {
        self.addEventListener('message', this.defaultListener.bind(this));
    }
    end() {
        self.removeEventListener('message', this.defaultListener.bind(this));
        this.destroyed = true;
        // @ts-ignore
        if (typeof this.target.terminate !== 'undefined') {
            // @ts-ignore
            this.target.terminate();
        }
    }
    unref() { }
    write(buffer) {
        if (this.destroyed) {
            return;
        }
        const message = {
            $type: SOCKET_IDENTIFIER,
            $channel: this.channel,
            data: JSON.stringify(buffer),
        };
        if (this.isWorker) {
            this.target.postMessage(message);
        }
        else {
            this.target.postMessage(message, protocolAndHost());
        }
    }
}
export class Server extends EventEmitter {
    constructor() {
        super(...arguments);
        this.connected = false;
        this.closed = false;
        this.socket = null;
        this.listenerFunctions = [];
    }
    listen(listenPath, listenCallback) {
        const listenerFunction = (e) => {
            const data = e.data.$data || e.data;
            if (this.closed) {
                return;
            }
            if (data.$type === 'node-server' &&
                data.$channel === listenPath &&
                data.$event === 'init') {
                this.connected = true;
                this.socket = new Socket(e.source || self, listenPath, false);
                this.emit('connection', this.socket);
            }
        };
        this.listenerFunctions.push(listenerFunction);
        self.addEventListener('message', listenerFunction);
        if (listenCallback) {
            listenCallback();
        }
    }
    close(cb) {
        this.closed = true;
        this.removeAllListeners();
        // This is not according to spec, but we do this anyways for clean cleanup
        this.listenerFunctions.forEach(func => {
            self.removeEventListener('message', func);
        });
        if (cb) {
            cb();
        }
    }
}
function blobToBuffer(blob, cb) {
    if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
        throw new Error('first argument must be a Blob');
    }
    if (typeof cb !== 'function') {
        throw new Error('second argument must be a function');
    }
    const reader = new FileReader();
    function onLoadEnd(e) {
        reader.removeEventListener('loadend', onLoadEnd, false);
        if (e.error) {
            cb(e.error);
        }
        else {
            // @ts-ignore
            cb(null, Buffer.from(reader.result));
        }
    }
    reader.addEventListener('loadend', onLoadEnd, false);
    reader.readAsArrayBuffer(blob);
}
export class WebSocketServer extends EventEmitter {
    constructor(url) {
        super();
        this.url = url;
        this.connected = false;
        this.closed = false;
        this.socket = null;
        this.listenerFunctions = [];
    }
    listen(listenPath, listenCallback) {
        this.socket = new WebSocket(this.url);
        this.socket.onmessage = message => {
            blobToBuffer(message.data, (err, r) => {
                this.emit('data', r);
            });
        };
        this.socket.onclose = () => {
            this.emit('close');
        };
        if (listenCallback) {
            listenCallback();
        }
        this.socket.onopen = () => {
            this.connected = true;
            this.emit('connection', this);
        };
    }
    write(buffer) {
        this.socket.send(buffer);
    }
    end() {
        this.socket.close();
    }
    close(cb) {
        this.closed = true;
        this.removeAllListeners();
        // This is not according to spec, but we do this anyways for clean cleanup
        this.listenerFunctions.forEach(func => {
            self.removeEventListener('message', func);
        });
        if (cb) {
            cb();
        }
    }
}
let socketUrl = '';
function setSocketURL(url) {
    socketUrl = url;
}
function createServerWS() {
    return new WebSocketServer(socketUrl);
}
function createServerLocal() {
    return new Server();
}
function createServer(...args) {
    if (socketUrl) {
        return createServerWS();
    }
    else {
        return createServerLocal();
    }
}
function createConnection(pipeName, cb) {
    commonPostMessage({
        $type: 'node-server',
        $channel: pipeName,
        $event: 'init',
    });
    const socket = new Socket(self, pipeName, true);
    setTimeout(() => {
        if (cb) {
            cb();
        }
    }, 0);
    // TODO: Fix this to initialize properly
    return socket;
}
const connect = createConnection;
export { setSocketURL, createServer, createConnection, connect };
