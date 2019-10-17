"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAbsoluteDependencies = getAbsoluteDependencies;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fetchWithRetries(_x) {
  return _fetchWithRetries.apply(this, arguments);
}

function _fetchWithRetries() {
  _fetchWithRetries = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(url) {
    var err, i;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < 3)) {
              _context.next = 14;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return fetch(url).then(function (x) {
              if (x.ok) {
                return x.json();
              }

              throw new Error('Could not fetch ' + url);
            });

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            err = _context.t0;

          case 11:
            i++;
            _context.next = 1;
            break;

          case 14:
            throw err;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _fetchWithRetries.apply(this, arguments);
}

function fetchPackageJSON(_x2, _x3) {
  return _fetchPackageJSON.apply(this, arguments);
}

function _fetchPackageJSON() {
  _fetchPackageJSON = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(dep, version) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetchWithRetries("https://unpkg.com/".concat(dep, "@").concat(encodeURIComponent(version), "/package.json"));

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", fetchWithRetries("https://cdn.jsdelivr.net/npm/".concat(dep, "@").concat(encodeURIComponent(version), "/package.json")));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _fetchPackageJSON.apply(this, arguments);
}

function getAbsoluteDependencies(_x4) {
  return _getAbsoluteDependencies.apply(this, arguments);
}

function _getAbsoluteDependencies() {
  _getAbsoluteDependencies = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(dependencies) {
    var nonAbsoluteDependencies, newDependencies;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            nonAbsoluteDependencies = Object.keys(dependencies).filter(function (dep) {
              var version = dependencies[dep];
              var isAbsolute = /^\d+\.\d+\.\d+$/.test(version);
              return !isAbsolute && !/\//.test(version);
            });
            newDependencies = _objectSpread({}, dependencies);
            _context4.next = 4;
            return Promise.all(nonAbsoluteDependencies.map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(dep) {
                var data;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return fetchPackageJSON(dep, dependencies[dep]);

                      case 3:
                        data = _context3.sent;
                        newDependencies[dep] = data.version;
                        _context3.next = 9;
                        break;

                      case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](0);

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[0, 7]]);
              }));

              return function (_x5) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 4:
            return _context4.abrupt("return", newDependencies);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getAbsoluteDependencies.apply(this, arguments);
}