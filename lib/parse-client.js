const Parse = require('parse/node');
Parse._initialize("appid", null, 'masterkey');

//javascriptKey is required only if you have it on server.
Parse.serverURL = process.env.PARSE_SERVER_URL;

export default Parse;
