"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var Portal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Portal, _React$Component);

  function Portal() {
    (0, _classCallCheck2["default"])(this, Portal);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Portal).apply(this, arguments));
  }

  (0, _createClass2["default"])(Portal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.defaultNode) {
        document.body.removeChild(this.defaultNode);
      }

      this.defaultNode = null;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.node && !this.defaultNode) {
        this.defaultNode = document.createElement('div');
        document.body.appendChild(this.defaultNode);
      }

      return _reactDom["default"].createPortal(this.props.children, this.props.node || this.defaultNode);
    }
  }]);
  return Portal;
}(_react["default"].Component);

exports["default"] = Portal;