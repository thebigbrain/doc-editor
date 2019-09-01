import _Parse from 'parse'

const APP_ID = 'appid'
const JS_KEY = 'javascriptkey'

_Parse.initialize(APP_ID, JS_KEY)

//javascriptKey is required only if you have it on server.
_Parse.serverURL = 'http://localhost:1337/parse';

// let LiveQueryClient = _Parse.LiveQueryClient;
// let client = new LiveQueryClient({
//   applicationId: appId,
//   serverURL: 'ws://localhost:1337/parse',
// });

export const Parse = _Parse;
// export const LiveClient = client;
export default Parse
