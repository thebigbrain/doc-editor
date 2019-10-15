"use strict";
exports.__esModule = true;
var config = {
    title: 'sandbox.config.json',
    type: 'sandbox',
    description: 'Configuration specific to the current sandbox.',
    moreInfoUrl: 'https://codesandbox.io/docs/configuration#sandbox-configuration',
    getDefaultCode: function () {
        return JSON.stringify({
            infiniteLoopProtection: true,
            hardReloadOnChange: false,
            view: 'browser'
        }, null, 2);
    }
};
exports["default"] = config;
