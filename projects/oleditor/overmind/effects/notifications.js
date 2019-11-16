import * as api from './api/feathers';

let channel = {}
let _options = null
let service = null

/*
  TODO: Refactor to pass in data instead of using context
*/
export default {
  initialize(options) {
    _options = options;
    if (!service) return;

    service = api.getService('notifications');
    service.on('created', (newNotis) => {
      if (channel.name == null) return;
      if (typeof channel.onMessage === 'function'){
        channel.onMessage('new-notification', newNotis);
      }
    });
  },
  disconnect() {
    service.off('created');
  },
  joinChannel(userId) {
    channel.name = `notification:${userId}`;
    return {unread: 0};
  },
  listen(action) {
    channel.onMessage = (event, data) => {
      const disconnected = data == null && event === 'phx_error';
      const alteredEvent = disconnected ? 'connection-loss' : event;

      action({
        event: alteredEvent,
        data: data == null ? {} : data,
      });

      return data;
    };
  },
};
