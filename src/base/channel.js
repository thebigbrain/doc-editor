const ChannelCache = new Map();

export default class Channel {
  static newInstance(name) {
    return new Channel(name)
  }

  constructor(name) {
    this.channelName = name;
  }

  on(evt, callback) {
    if (typeof callback !== 'function') return null;

    const eventName = `${this.channelName}.${evt}`;
    if (ChannelCache.has(eventName)) {

    }
  }
}
