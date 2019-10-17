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

var _icons = _interopRequireDefault(require("../../templates/icons"));

var _templates = _interopRequireDefault(require("../../templates"));

var _urlGenerator = require("../../utils/url-generator");

var _keycodes = require("../../utils/keycodes");

var _elements = require("./elements");

var getScreenshot = function getScreenshot(id) {
  return "https://codesandbox.io/api/v1/sandboxes/".concat(id, "/screenshot.png");
};
/* eslint-enable camelcase */


var WideSandbox =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(WideSandbox, _React$PureComponent);

  function WideSandbox() {
    var _this;

    (0, _classCallCheck2["default"])(this, WideSandbox);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WideSandbox).apply(this, arguments));
    _this.state = {
      imageLoaded: false
    };

    _this.getTitle = function () {
      if ((_this.props.sandbox.picks || []).length !== 0) {
        return _this.props.sandbox.picks[0].title;
      }

      return _this.props.sandbox.title || _this.props.sandbox.id;
    };

    _this.getDescription = function () {
      if ((_this.props.sandbox.picks || []).length !== 0) {
        return _this.props.sandbox.picks[0].description;
      }

      return _this.props.sandbox.description;
    };

    _this.toggleOpen = function () {
      _this.props.selectSandbox({
        id: _this.props.sandbox.id,
        title: _this.getTitle(),
        description: _this.getDescription(),
        screenshotUrl: _this.props.sandbox.screenshot_url
      });
    };

    _this.handleKeyUp = function (e) {
      if (e.keyCode === _keycodes.ENTER) {
        _this.toggleOpen();
      }
    };

    return _this;
  }

  (0, _createClass2["default"])(WideSandbox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          sandbox = _this$props.sandbox,
          small = _this$props.small,
          noMargin = _this$props.noMargin,
          noHeight = _this$props.noHeight,
          _this$props$defaultHe = _this$props.defaultHeight,
          defaultHeight = _this$props$defaultHe === void 0 ? 245 : _this$props$defaultHe;

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
      }, _react["default"].createElement(_elements.SandboxImage, {
        alt: this.getTitle(),
        src: sandbox.screenshot_url || getScreenshot(sandbox.id),
        color: template.color(),
        style: {
          height: this.state.imageLoaded ? 'auto' : defaultHeight
        },
        ref: function ref(img) {
          if (img && img.complete) {
            _this2.setState({
              imageLoaded: true
            });
          }
        },
        onLoad: function onLoad() {
          _this2.setState({
            imageLoaded: true
          });
        }
      }), _react["default"].createElement(_elements.SandboxInfo, {
        noHeight: noHeight
      }, _react["default"].createElement(_elements.SandboxTitle, {
        color: template.color()
      }, this.getTitle()), this.getDescription() ? _react["default"].createElement(_elements.SandboxDescription, null, this.getDescription()) : null, sandbox.author && _react["default"].createElement("a", {
        href: (0, _urlGenerator.profileUrl)(sandbox.author.username)
      }, _react["default"].createElement(_elements.Author, {
        username: sandbox.author.username,
        avatarUrl: sandbox.author.avatar_url
      })), _react["default"].createElement(_elements.TemplateIcon, null, _react["default"].createElement(Icon, {
        width: 24,
        height: 24
      }))));
    }
  }]);
  return WideSandbox;
}(_react["default"].PureComponent);

exports["default"] = WideSandbox;