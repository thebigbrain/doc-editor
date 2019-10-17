"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isContributor = isContributor;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var contributors;
var fetchPromise;

function isContributor(_x) {
  return _isContributor.apply(this, arguments);
}

function _isContributor() {
  _isContributor = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(username) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (contributors) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return fetchPromise || (fetchPromise = window.fetch('https://raw.githubusercontent.com/codesandbox/codesandbox-client/master/.all-contributorsrc').then(function (x) {
              return x.json();
            }).then(function (x) {
              return x.contributors.map(function (u) {
                return u.login;
              });
            }).then(function (names) {
              contributors = names;
            })["catch"](function () {}));

          case 3:
            return _context.abrupt("return", contributors && contributors.indexOf(username) > -1);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _isContributor.apply(this, arguments);
}