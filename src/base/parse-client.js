import Parse from 'parse/lib/browser/Parse';

// const Parse = require('parse');
Parse.initialize("appid", null);

//javascriptKey is required only if you have it on server.
Parse.serverURL = 'http://192.168.1.104:1337/parse';

export default Parse;
