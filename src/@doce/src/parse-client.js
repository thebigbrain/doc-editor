import _Parse from 'parse';

const appId = 'appid';

// const Parse = require('parse');
_Parse.initialize(appId, null);

//javascriptKey is required only if you have it on server.
_Parse.serverURL = 'http://localhost:1337/parse';

// let LiveQueryClient = _Parse.LiveQueryClient;
// let client = new LiveQueryClient({
//   applicationId: appId,
//   serverURL: 'ws://localhost:1337/parse',
// });

export const Parse = _Parse;
// export const LiveClient = client;
