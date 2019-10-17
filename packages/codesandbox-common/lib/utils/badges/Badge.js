"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Tooltip = _interopRequireDefault(require("../../components/Tooltip"));

var _ = _interopRequireDefault(require("."));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease all;\n  margin-bottom: -0.4em;\n\n  opacity: ", ";\n  cursor: pointer;\n\n  &:hover {\n    ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  text-align: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var NameContainer = _styledComponents["default"].div(_templateObject());

var Image = _styledComponents["default"].img(_templateObject2(), function (props) {
  return props.visible ? 1 : 0.5;
}, function (props) {
  return !props.visible && "opacity: .75;";
});

var Badge =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Badge, _React$Component);

  function Badge() {
    var _this;

    (0, _classCallCheck2["default"])(this, Badge);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Badge).apply(this, arguments));

    _this.handleClick = function () {
      if (_this.props.onClick) {
        _this.props.onClick(_this.props.badge);
      }
    };

    return _this;
  }

  (0, _createClass2["default"])(Badge, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          badge = _this$props.badge,
          tooltip = _this$props.tooltip,
          size = _this$props.size,
          onClick = _this$props.onClick,
          props = (0, _objectWithoutProperties2["default"])(_this$props, ["visible", "badge", "tooltip", "size", "onClick"]);

      var innerContent = _react["default"].createElement(Image, (0, _extends2["default"])({}, props, {
        width: size,
        src: (0, _["default"])(badge.id),
        alt: badge.name,
        visible: visible || badge.visible,
        onClick: this.handleClick
      }));

      if (tooltip !== false) {
        return _react["default"].createElement(_Tooltip["default"], {
          style: {
            display: 'block'
          },
          content: tooltip || badge.name
        }, innerContent);
      }

      return _react["default"].createElement(NameContainer, null, innerContent, _react["default"].createElement("div", {
        style: {
          marginTop: '0.5rem'
        }
      }, badge.name));
    }
  }]);
  return Badge;
}(_react["default"].Component);

exports["default"] = Badge;