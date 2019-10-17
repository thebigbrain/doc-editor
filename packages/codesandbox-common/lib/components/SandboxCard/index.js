"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _repoForked = _interopRequireDefault(require("react-icons/lib/go/repo-forked"));

var _eye = _interopRequireDefault(require("react-icons/lib/go/eye"));

var _heart = _interopRequireDefault(require("react-icons/lib/go/heart"));

var _icons = _interopRequireDefault(require("../../templates/icons"));

var _templates = _interopRequireDefault(require("../../templates"));

var _urlGenerator = require("../../utils/url-generator");

var _keycodes = require("../../utils/keycodes");

var _elements = require("./elements");

var _Tags = _interopRequireDefault(require("../Tags"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getScreenshot = function getScreenshot(id) {
  return "https://codesandbox.io/api/v1/sandboxes/".concat(id, "/screenshot.png");
};

var kFormatter = function kFormatter(num) {
  if (num > 999999) {
    return (num / 1000000).toFixed(1) + 'M';
  }

  if (num > 999) {
    return (num / 1000).toFixed(1) + 'K';
  }

  return num;
};

var SandboxCard =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(SandboxCard, _React$PureComponent);

  function SandboxCard() {
    var _this;

    (0, _classCallCheck2["default"])(this, SandboxCard);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SandboxCard).apply(this, arguments));

    _this.toggleOpen = function () {
      _this.props.selectSandbox(_objectSpread({}, _this.props.sandbox));
    };

    _this.handleKeyUp = function (e) {
      if (e.keyCode === _keycodes.ENTER) {
        _this.toggleOpen();
      }
    };

    return _this;
  }

  (0, _createClass2["default"])(SandboxCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sandbox = _this$props.sandbox,
          small = _this$props.small,
          noMargin = _this$props.noMargin,
          noHeight = _this$props.noHeight,
          _this$props$defaultHe = _this$props.defaultHeight,
          defaultHeight = _this$props$defaultHe === void 0 ? 152 : _this$props$defaultHe;

      if (!sandbox) {
        return _react["default"].createElement(_elements.Container, {
          style: {}
        }, _react["default"].createElement(_elements.SandboxImage, {
          as: "div",
          style: {
            border: 0,
            height: 150
          }
        }), _react["default"].createElement(_elements.SandboxInfo, null));
      }

      var template = (0, _templates["default"])(sandbox.template);
      var Icon = (0, _icons["default"])(sandbox.template);
      return _react["default"].createElement(_elements.Container, {
        noMargin: noMargin,
        small: small,
        style: {},
        onClick: this.toggleOpen,
        role: "button",
        tabIndex: 0,
        onKeyUp: this.handleKeyUp
      }, _react["default"].createElement(_elements.Image, null, _react["default"].createElement(_elements.SandboxImage, {
        alt: sandbox.title,
        src: sandbox.screenshot_url || getScreenshot(sandbox.id),
        color: template.color(),
        style: {
          height: defaultHeight
        }
      }), _react["default"].createElement(_elements.Overlay, null, _react["default"].createElement(_elements.SandboxDescription, null, sandbox.description), sandbox.tags && _react["default"].createElement(_Tags["default"], {
        tags: sandbox.tags
      }))), _react["default"].createElement(_elements.SandboxInfo, {
        noHeight: noHeight
      }, _react["default"].createElement(_elements.SandboxTitle, {
        color: template.color()
      }, sandbox.title), _react["default"].createElement(_elements.TemplateIcon, null, _react["default"].createElement(Icon, {
        width: 16,
        height: 16
      }))), _react["default"].createElement(_elements.SandboxStats, null, _react["default"].createElement(_elements.Stats, null, _react["default"].createElement("li", null, _react["default"].createElement(_eye["default"], null), kFormatter(sandbox.view_count)), _react["default"].createElement("li", null, _react["default"].createElement(_repoForked["default"], null), kFormatter(sandbox.fork_count)), _react["default"].createElement("li", null, _react["default"].createElement(_heart["default"], null), kFormatter(sandbox.like_count))), sandbox.author && _react["default"].createElement("a", {
        href: (0, _urlGenerator.profileUrl)(sandbox.author.username)
      }, _react["default"].createElement(_elements.Avatar, {
        src: sandbox.author.avatar_url
      }))));
    }
  }]);
  return SandboxCard;
}(_react["default"].PureComponent);

exports["default"] = SandboxCard;