"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STRIPE_API_KEY = exports.ALGOLIA_DEFAULT_INDEX = exports.ALGOLIA_APPLICATION_ID = exports.ALGOLIA_API_KEY = void 0;
var ALGOLIA_API_KEY = '7675b9e87ed7dd5bbf18f3e5310f92d6';
exports.ALGOLIA_API_KEY = ALGOLIA_API_KEY;
var ALGOLIA_APPLICATION_ID = 'ZACZHDBO7S';
exports.ALGOLIA_APPLICATION_ID = ALGOLIA_APPLICATION_ID;
var ALGOLIA_DEFAULT_INDEX = process.env.NODE_ENV === 'production' || process.env.LOCAL_SERVER ? 'prod_sandboxes' : 'dev_sandboxes';
exports.ALGOLIA_DEFAULT_INDEX = ALGOLIA_DEFAULT_INDEX;
var STRIPE_API_KEY = process.env.NODE_ENV === 'production' ? 'pk_live_KeUgofl1VrjTtbrhhN7gGI9W' : 'pk_test_0HgnQIkQJCECIFCQkafGQ5gA';
exports.STRIPE_API_KEY = STRIPE_API_KEY;