const express = require('express');
const {default: ParseServer, ParseGraphQLServer} = require('parse-server');
const ParseDashboard = require('parse-dashboard');

const app = express();

const parseServer = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/test',
  cloud: './cloud/main.js',
  appId: 'appid',
  masterKey: 'masterkey',
  serverURL: 'http://localhost:1337/parse',
  startLiveQueryServer: true,
  // liveQuery: {
  //   classNames: ['Game', 'User'],
  // },
  auth: {
    'phone': {
      module: require('./cloud/phone-auth.js')
    }
  }
})

const parseGraphQLServer = new ParseGraphQLServer(
  parseServer,
  {
    graphQLPath: '/graphql',
    playgroundPath: '/playground'
  }
);

const options = {allowInsecureHTTP: false};

const dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "appid",
      "masterKey": "masterkey",
      "appName": "DocEditor"
    }
  ],
}, options);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

app.use('/parse', parseServer.app); // (Optional) Mounts the REST API
parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
parseGraphQLServer.applyPlayground(app); // (Optional) Mounts the GraphQL Playground - do NOT use in Production

const httpServer = require('http').createServer(app);

httpServer.listen(1337, function () {
  console.log('REST API running on http://localhost:1337/parse');
  console.log('GraphQL API running on http://localhost:1337/graphql');
  console.log('GraphQL Playground running on http://localhost:1337/playground');
});

const parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
