"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});

var LocalStorageMock =
/*#__PURE__*/
function () {
  function LocalStorageMock() {
    (0, _classCallCheck2["default"])(this, LocalStorageMock);
    this.store = {};
  }

  (0, _createClass2["default"])(LocalStorageMock, [{
    key: "clear",
    value: function clear() {
      this.store = {};
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.store[key] || null;
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.store[key] = value;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this.store[key];
    }
  }]);
  return LocalStorageMock;
}(); // @ts-ignore


global.localStorage = new LocalStorageMock();