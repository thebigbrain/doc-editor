import { EventEmitter } from 'events';
export function createInterface(options) {
    const emitter = new EventEmitter();
    options.input.on('data', data => {
        emitter.emit('line', data);
    });
    return emitter;
}
