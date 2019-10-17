"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSentry = initializeSentry;
exports.logError = logError;
exports.identify = identify;
exports.setUserId = setUserId;
exports.resetUserId = resetUserId;
exports["default"] = track;
exports.DNT = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _version = _interopRequireDefault(require("../version"));

var _debug2 = _interopRequireDefault(require("../utils/debug"));

var _hash = _interopRequireDefault(require("./hash"));

var _systemImportTransformerGlobalIdentifier = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var debug = (0, _debug2["default"])('cs:analytics');
var global = typeof window !== 'undefined' ? window : {};
var WHITELISTED_VSCODE_EVENTS = ['codesandbox.preview.toggle', 'workbench.action.splitEditor', 'workbench.action.toggleSidebarVisibility', 'codesandbox.sandbox.new', 'workbench.action.files.saveAs', 'editor.action.addCommentLine', 'codesandbox.sandbox.exportZip', 'codesandbox.preferences', 'codesandbox.sandbox.fork', 'codesandbox.help.documentation', 'codesandbox.help.github', 'view.preview.flip', 'codesandbox.search', 'workbench.action.splitEditorLeft', 'codesandbox.dashboard', 'workbench.action.toggleCenteredLayout', 'workbench.action.toggleMenuBar', 'codesandbox.explore', 'editor.action.toggleTabFocusMode', 'workbench.action.splitEditorUp', 'workbench.action.toggleSidebarPosition', 'workbench.action.toggleActivityBarVisibility', 'workbench.action.toggleStatusbarVisibility', 'codesandbox.dependencies.add', 'codesandbox.help.open-issue', 'codesandbox.action.search', 'workbench.action.editorLayoutThreeColumns', 'breadcrumbs.toggleToOn', 'workbench.action.openSettings2', 'workbench.action.globalSettings', 'workbench.action.editorLayoutTwoRows', 'workbench.action.editorLayoutTwoByTwoGrid', 'editor.action.showContextMenu', 'toggleVim', 'codesandbox.help.spectrum', 'codesandbox.help.feedback', 'workbench.action.webview.openDeveloperTools', 'workbench.action.editorLayoutThreeRows', 'codesandbox.help.twitter', 'workbench.action.editorLayoutTwo', 'codesandbox.preview.external', 'notifications.showList', 'workbench.action.editor.changeEncoding', 'editor.action.indentationToTabs', 'workbench.action.maximizeEditor', 'editor.action.indentationToSpaces', 'revealFilesInOS', 'keybindings.editor.searchKeyBindings', 'notifications.hideList', 'workbench.action.terminal.focus', 'workbench.action.console.focus', 'workbench.action.openRecent', 'code-runner.run'];
var DNT = typeof window !== 'undefined' && Boolean(global.doNotTrack === '1' || global.navigator.doNotTrack === '1' || global.navigator.msDoNotTrack === '1');
exports.DNT = DNT;
var sentryInitialized = false;

function getSentry() {
  return typeof _systemImportTransformerGlobalIdentifier.define === "function" && _systemImportTransformerGlobalIdentifier.define.amd ? new Promise(function (resolve, reject) {
    _systemImportTransformerGlobalIdentifier.require(["@sentry/browser"], resolve, reject);
  }) : typeof module !== "undefined" && module.exports && typeof require !== "undefined" || typeof module !== "undefined" && module.component && _systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === "component" ? Promise.resolve(require((
  /* webpackChunkName: 'sentry' */
  '@sentry/browser'))) : Promise.resolve(_systemImportTransformerGlobalIdentifier["@sentry/browser"]);
}

function initializeSentry(_x) {
  return _initializeSentry.apply(this, arguments);
}

function _initializeSentry() {
  _initializeSentry = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(dsn) {
    var Sentry;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (DNT) {
              _context.next = 6;
              break;
            }

            sentryInitialized = true;
            _context.next = 4;
            return getSentry();

          case 4:
            Sentry = _context.sent;
            return _context.abrupt("return", Sentry.init({
              dsn: dsn,
              release: _version["default"],
              ignoreErrors: ['Custom Object', 'TypeScript Server Error', /^Canceled$/],

              /**
               * Don't send messages from the sandbox, so don't send from eg.
               * new.codesandbox.io or new.csb.app
               */
              blacklistUrls: ['codesandbox.editor.main.js', /.*\.codesandbox\.io/, /.*\.csb\.app/],
              beforeSend: function beforeSend(event) {
                if (event.stacktrace && event.stacktrace.frames && event.stacktrace.frames[0] && event.stacktrace.frames[0].filename.endsWith('codesandbox.editor.main.js')) {
                  // This is the spammy event that doesn't do anything: https://sentry.io/organizations/codesandbox/issues/1054971728/?project=155188&query=is%3Aunresolved
                  // Don't do anything with it right now, I can't seem to reproduce it for some reason.
                  // We need to add sourcemaps
                  return undefined;
                }

                return event;
              }
            }));

          case 6:
            return _context.abrupt("return", Promise.resolve());

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initializeSentry.apply(this, arguments);
}

function logError(_x2) {
  return _logError.apply(this, arguments);
}

function _logError() {
  _logError = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(err) {
    var Sentry;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!sentryInitialized) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return getSentry();

          case 3:
            Sentry = _context2.sent;
            Sentry.captureException(err);

          case 5:
            if (window.console && console.error) console.error(err);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _logError.apply(this, arguments);
}

function identify(_x3, _x4) {
  return _identify.apply(this, arguments);
}

function _identify() {
  _identify = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(key, value) {
    var identity, Sentry;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (DNT) {
              _context3.next = 8;
              break;
            }

            if (typeof global.amplitude !== 'undefined') {
              identity = new global.amplitude.Identify();
              identity.set(key, value);
              global.amplitude.identify(identity);
              debug('[Amplitude] Identifying', key, value);
            }

            if (!sentryInitialized) {
              _context3.next = 8;
              break;
            }

            _context3.next = 6;
            return getSentry();

          case 6:
            Sentry = _context3.sent;
            Sentry.configureScope(function (scope) {
              scope.setExtra(key, value);
            });

          case 8:
            _context3.next = 12;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _identify.apply(this, arguments);
}

if (process.env.NODE_ENV === 'production') {
  setTimeout(function () {
    identify('[Amplitude] Version', _version["default"]);
  }, 5000);
}

function setUserId(_x5) {
  return _setUserId.apply(this, arguments);
}

function _setUserId() {
  _setUserId = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(userId) {
    var hashedId, Sentry;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            if (DNT) {
              _context4.next = 8;
              break;
            }

            if (typeof global.amplitude !== 'undefined') {
              hashedId = (0, _hash["default"])(userId);
              debug('[Amplitude] Setting User ID', hashedId);
              identify('userId', hashedId);
              global.amplitude.getInstance().setUserId(hashedId);
            }

            if (!sentryInitialized) {
              _context4.next = 8;
              break;
            }

            _context4.next = 6;
            return getSentry();

          case 6:
            Sentry = _context4.sent;
            Sentry.configureScope(function (scope) {
              scope.setUser({
                id: userId
              });
            });

          case 8:
            _context4.next = 12;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return _setUserId.apply(this, arguments);
}

function resetUserId() {
  return _resetUserId.apply(this, arguments);
}

function _resetUserId() {
  _resetUserId = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var Sentry;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (DNT) {
              _context5.next = 8;
              break;
            }

            if (typeof global.amplitude !== 'undefined') {
              debug('[Amplitude] Resetting User ID');
              identify('userId', null);

              if (global.amplitude.getInstance().options.userId) {
                global.amplitude.getInstance().setUserId(null);
                global.amplitude.getInstance().regenerateDeviceId();
              }
            }

            if (!sentryInitialized) {
              _context5.next = 8;
              break;
            }

            _context5.next = 6;
            return getSentry();

          case 6:
            Sentry = _context5.sent;
            Sentry.configureScope(function (scope) {
              scope.setUser({
                id: undefined
              });
            });

          case 8:
            _context5.next = 12;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return _resetUserId.apply(this, arguments);
}

var isAllowedEvent = function isAllowedEvent(eventName, secondArg) {
  try {
    if (eventName === 'VSCode - workbenchActionExecuted') {
      return WHITELISTED_VSCODE_EVENTS.includes(secondArg.id);
    }

    return true;
  } catch (e) {
    return true;
  }
}; // After 30min no event we mark a session


var NEW_SESSION_TIME = 1000 * 60 * 30;

var getLastTimeEventSent = function getLastTimeEventSent() {
  var lastTime = localStorage.getItem('csb-last-event-sent');

  if (lastTime === null) {
    return 0;
  }

  return +lastTime;
};

var markLastTimeEventSent = function markLastTimeEventSent() {
  localStorage.setItem('csb-last-event-sent', Date.now().toString());
};

function track(eventName) {
  var secondArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    if (!DNT && isAllowedEvent(eventName, secondArg)) {
      var data = _objectSpread({}, secondArg, {
        version: _version["default"],
        path: location.pathname + location.search
      });

      try {
        if (global.ga) {
          global.ga('send', data);
        }
      } catch (e) {
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
      } catch (e) {
        /* */
      }
    }
  } catch (e) {
    /* empty */
  }
}