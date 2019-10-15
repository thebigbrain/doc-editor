"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var version_1 = require("../version");
var debug_1 = require("../utils/debug");
var hash_1 = require("./hash");
var debug = debug_1["default"]('cs:analytics');
var global = (typeof window !== 'undefined' ? window : {});
var WHITELISTED_VSCODE_EVENTS = [
    'codesandbox.preview.toggle',
    'workbench.action.splitEditor',
    'workbench.action.toggleSidebarVisibility',
    'codesandbox.sandbox.new',
    'workbench.action.files.saveAs',
    'editor.action.addCommentLine',
    'codesandbox.sandbox.exportZip',
    'codesandbox.preferences',
    'codesandbox.sandbox.fork',
    'codesandbox.help.documentation',
    'codesandbox.help.github',
    'view.preview.flip',
    'codesandbox.search',
    'workbench.action.splitEditorLeft',
    'codesandbox.dashboard',
    'workbench.action.toggleCenteredLayout',
    'workbench.action.toggleMenuBar',
    'codesandbox.explore',
    'editor.action.toggleTabFocusMode',
    'workbench.action.splitEditorUp',
    'workbench.action.toggleSidebarPosition',
    'workbench.action.toggleActivityBarVisibility',
    'workbench.action.toggleStatusbarVisibility',
    'codesandbox.dependencies.add',
    'codesandbox.help.open-issue',
    'codesandbox.action.search',
    'workbench.action.editorLayoutThreeColumns',
    'breadcrumbs.toggleToOn',
    'workbench.action.openSettings2',
    'workbench.action.globalSettings',
    'workbench.action.editorLayoutTwoRows',
    'workbench.action.editorLayoutTwoByTwoGrid',
    'editor.action.showContextMenu',
    'toggleVim',
    'codesandbox.help.spectrum',
    'codesandbox.help.feedback',
    'workbench.action.webview.openDeveloperTools',
    'workbench.action.editorLayoutThreeRows',
    'codesandbox.help.twitter',
    'workbench.action.editorLayoutTwo',
    'codesandbox.preview.external',
    'notifications.showList',
    'workbench.action.editor.changeEncoding',
    'editor.action.indentationToTabs',
    'workbench.action.maximizeEditor',
    'editor.action.indentationToSpaces',
    'revealFilesInOS',
    'keybindings.editor.searchKeyBindings',
    'notifications.hideList',
    'workbench.action.terminal.focus',
    'workbench.action.console.focus',
    'workbench.action.openRecent',
    'code-runner.run',
];
exports.DNT = typeof window !== 'undefined' &&
    Boolean(global.doNotTrack === '1' ||
        global.navigator.doNotTrack === '1' ||
        global.navigator.msDoNotTrack === '1');
var sentryInitialized = false;
function getSentry() {
    return Promise.resolve().then(function () { return require(/* webpackChunkName: 'sentry' */ '@sentry/browser'); });
}
function initializeSentry(dsn) {
    return __awaiter(this, void 0, void 0, function () {
        var Sentry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!exports.DNT) return [3 /*break*/, 2];
                    sentryInitialized = true;
                    return [4 /*yield*/, getSentry()];
                case 1:
                    Sentry = _a.sent();
                    return [2 /*return*/, Sentry.init({
                            dsn: dsn,
                            release: version_1["default"],
                            ignoreErrors: [
                                'Custom Object',
                                'TypeScript Server Error',
                                /^Canceled$/,
                            ],
                            /**
                             * Don't send messages from the sandbox, so don't send from eg.
                             * new.codesandbox.io or new.csb.app
                             */
                            blacklistUrls: [
                                'codesandbox.editor.main.js',
                                /.*\.codesandbox\.io/,
                                /.*\.csb\.app/,
                            ],
                            beforeSend: function (event) {
                                if (event.stacktrace &&
                                    event.stacktrace.frames &&
                                    event.stacktrace.frames[0] &&
                                    event.stacktrace.frames[0].filename.endsWith('codesandbox.editor.main.js')) {
                                    // This is the spammy event that doesn't do anything: https://sentry.io/organizations/codesandbox/issues/1054971728/?project=155188&query=is%3Aunresolved
                                    // Don't do anything with it right now, I can't seem to reproduce it for some reason.
                                    // We need to add sourcemaps
                                    return undefined;
                                }
                                return event;
                            }
                        })];
                case 2: return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.initializeSentry = initializeSentry;
function logError(err) {
    return __awaiter(this, void 0, void 0, function () {
        var Sentry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sentryInitialized) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSentry()];
                case 1:
                    Sentry = _a.sent();
                    Sentry.captureException(err);
                    _a.label = 2;
                case 2:
                    if (window.console && console.error)
                        console.error(err);
                    return [2 /*return*/];
            }
        });
    });
}
exports.logError = logError;
function identify(key, value) {
    return __awaiter(this, void 0, void 0, function () {
        var identity, Sentry, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!!exports.DNT) return [3 /*break*/, 2];
                    if (typeof global.amplitude !== 'undefined') {
                        identity = new global.amplitude.Identify();
                        identity.set(key, value);
                        global.amplitude.identify(identity);
                        debug('[Amplitude] Identifying', key, value);
                    }
                    if (!sentryInitialized) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSentry()];
                case 1:
                    Sentry = _a.sent();
                    Sentry.configureScope(function (scope) {
                        scope.setExtra(key, value);
                    });
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.identify = identify;
if (process.env.NODE_ENV === 'production') {
    setTimeout(function () {
        identify('[Amplitude] Version', version_1["default"]);
    }, 5000);
}
function setUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedId, Sentry, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!!exports.DNT) return [3 /*break*/, 2];
                    if (typeof global.amplitude !== 'undefined') {
                        hashedId = hash_1["default"](userId);
                        debug('[Amplitude] Setting User ID', hashedId);
                        identify('userId', hashedId);
                        global.amplitude.getInstance().setUserId(hashedId);
                    }
                    if (!sentryInitialized) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSentry()];
                case 1:
                    Sentry = _a.sent();
                    Sentry.configureScope(function (scope) {
                        scope.setUser({ id: userId });
                    });
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.setUserId = setUserId;
function resetUserId() {
    return __awaiter(this, void 0, void 0, function () {
        var Sentry, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!!exports.DNT) return [3 /*break*/, 2];
                    if (typeof global.amplitude !== 'undefined') {
                        debug('[Amplitude] Resetting User ID');
                        identify('userId', null);
                        if (global.amplitude.getInstance().options.userId) {
                            global.amplitude.getInstance().setUserId(null);
                            global.amplitude.getInstance().regenerateDeviceId();
                        }
                    }
                    if (!sentryInitialized) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSentry()];
                case 1:
                    Sentry = _a.sent();
                    Sentry.configureScope(function (scope) {
                        scope.setUser({ id: undefined });
                    });
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.resetUserId = resetUserId;
var isAllowedEvent = function (eventName, secondArg) {
    try {
        if (eventName === 'VSCode - workbenchActionExecuted') {
            return WHITELISTED_VSCODE_EVENTS.includes(secondArg.id);
        }
        return true;
    }
    catch (e) {
        return true;
    }
};
// After 30min no event we mark a session
var NEW_SESSION_TIME = 1000 * 60 * 30;
var getLastTimeEventSent = function () {
    var lastTime = localStorage.getItem('csb-last-event-sent');
    if (lastTime === null) {
        return 0;
    }
    return +lastTime;
};
var markLastTimeEventSent = function () {
    localStorage.setItem('csb-last-event-sent', Date.now().toString());
};
function track(eventName, secondArg) {
    if (secondArg === void 0) { secondArg = {}; }
    try {
        if (!exports.DNT && isAllowedEvent(eventName, secondArg)) {
            var data = __assign(__assign({}, secondArg), { version: version_1["default"], path: location.pathname + location.search });
            try {
                if (global.ga) {
                    global.ga('send', data);
                }
            }
            catch (e) {
                /* */
            }
            try {
                if (typeof global.amplitude !== 'undefined') {
                    var currentTime = Date.now();
                    if (currentTime - getLastTimeEventSent() > NEW_SESSION_TIME) {
                        // We send a separate New Session event if people have been inactive for a while
                        global.amplitude.logEvent('New Session');
                    }
                    markLastTimeEventSent();
                    debug('[Amplitude] Tracking', eventName, data);
                    global.amplitude.logEvent(eventName, data);
                }
            }
            catch (e) {
                /* */
            }
        }
    }
    catch (e) {
        /* empty */
    }
}
exports["default"] = track;
