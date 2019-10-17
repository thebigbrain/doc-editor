"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _renderprops = require("react-spring/renderprops.cjs");

var _humps = require("humps");

var _Preview = _interopRequireDefault(require("../Preview"));

var _urlGenerator = require("../../utils/url-generator");

var _icons = _interopRequireDefault(require("../../templates/icons"));

var _elements = require("./elements");

var Springg = _renderprops.Spring;
var Transitionn = _renderprops.Transition;

var SandboxIcon = function SandboxIcon(_ref) {
  var template = _ref.template;
  var Icon = (0, _icons["default"])(template);
  return _react["default"].createElement(_elements.IconContainer, null, _react["default"].createElement(Icon, null));
};

var FeaturedSandbox =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(FeaturedSandbox, _React$PureComponent);

  function FeaturedSandbox() {
    var _this;

    (0, _classCallCheck2["default"])(this, FeaturedSandbox);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FeaturedSandbox).apply(this, arguments));
    _this.state = {
      sandbox: undefined,
      showPreview: false
    };
    _this.fetchedSandboxes = {};

    _this.fetchSandbox = function (id) {
      if (_this.fetchedSandboxes[id]) {
        return Promise.resolve(_this.fetchedSandboxes[id]);
      }

      return fetch("".concat((0, _urlGenerator.protocolAndHost)(), "/api/v1/sandboxes/").concat(id)).then(function (x) {
        return x.json();
      }).then(function (x) {
        _this.fetchedSandboxes[x.data.id] = (0, _humps.camelizeKeys)(x.data);
        return x.data;
      });
    };

    _this.setUpPreview = function () {
      setTimeout(function () {
        // Only load it later so everything else can initialize
        _this.setState({
          showPreview: true
        });

        _this.fetchAllFeaturedSandboxes();
      }, 1000);
    };

    _this.fetchAllFeaturedSandboxes = function () {
      (_this.props.featuredSandboxes || []).forEach(function (s) {
        _this.fetchSandbox(s.sandboxId);
      });
    };

    _this.toggleOpen = function () {
      _this.props.pickSandbox({
        id: _this.state.sandbox.id,
        title: _this.props.title,
        description: _this.props.description,
        screenshotUrl: _this.state.sandbox.screenshotUrl
      });
    };

    return _this;
  }

  (0, _createClass2["default"])(FeaturedSandbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.sandboxId) {
        this.fetchSandbox(this.props.sandboxId).then(function (sandbox) {
          _this2.setState({
            sandbox: (0, _humps.camelizeKeys)(sandbox)
          });

          _this2.setUpPreview();
        });
      } else {
        this.setUpPreview();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function () {
      var _componentWillReceiveProps = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(nextProps) {
        var _this3 = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (nextProps.sandboxId !== this.props.sandboxId) {
                  this.fetchSandbox(nextProps.sandboxId).then(function (sandbox) {
                    _this3.setState({
                      sandbox: sandbox
                    });
                  });
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillReceiveProps(_x) {
        return _componentWillReceiveProps.apply(this, arguments);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state$sandbox = this.state.sandbox,
          sandbox = _this$state$sandbox === void 0 ? this.props.sandbox : _this$state$sandbox;
      var _this$props = this.props,
          title = _this$props.title,
          description = _this$props.description,
          height = _this$props.height;
      return _react["default"].createElement(_elements.Container, {
        height: height
      }, _react["default"].createElement(_elements.SandboxContainer, {
        role: "button",
        onClick: this.toggleOpen
      }, _react["default"].createElement(_elements.SandboxInfo, null, _react["default"].createElement(_elements.Title, null, title), _react["default"].createElement(_elements.Description, null, description), sandbox && _react["default"].createElement(Springg, {
        from: {
          height: 0,
          opacity: 0,
          overflow: 'hidden'
        },
        to: {
          height: 28,
          opacity: 1
        }
      }, function (style) {
        return _react["default"].createElement(_elements.StyledStats, {
          style: style,
          viewCount: sandbox.viewCount,
          likeCount: sandbox.likeCount,
          forkCount: sandbox.forkCount
        });
      })), sandbox && _react["default"].createElement(Springg, {
        "native": true,
        from: {
          height: 0,
          opacity: 0,
          overflow: 'hidden'
        },
        to: {
          height: 28,
          opacity: 1
        }
      }, function (style) {
        return _react["default"].createElement(_renderprops.animated.div, {
          style: style
        }, sandbox.author && _react["default"].createElement("a", {
          href: (0, _urlGenerator.profileUrl)(sandbox.author.username)
        }, _react["default"].createElement(_elements.Author, {
          username: sandbox.author.username,
          avatarUrl: sandbox.author.avatarUrl
        })), _react["default"].createElement(SandboxIcon, {
          template: sandbox.template
        }));
      })), typeof window === 'undefined' ? _react["default"].createElement("div", {
        style: {
          flex: 1,
          opacity: 1
        }
      }, _react["default"].createElement("div", {
        style: {
          zIndex: 2,
          height: 48,
          minHeight: 48,
          backgroundColor: '#eee'
        }
      }), _react["default"].createElement(_elements.SandboxPreviewImage, null, _react["default"].createElement("div", {
        style: {
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          backgroundImage: "url(".concat(sandbox && sandbox.screenshotUrl, ")"),
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: 'center',
          transform: 'scale(1.025, 1.025)',
          filter: 'blur(2px)',
          marginTop: -8
        }
      }))) : _react["default"].createElement(Transitionn, {
        items: this.state.showPreview,
        from: {
          flex: 1,
          opacity: 1
        },
        enter: {
          opacity: 1,
          flex: 1
        },
        leave: {
          opacity: 0,
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          right: 0
        },
        "native": true
      }, function (show) {
        return show ? function (style) {
          return _react["default"].createElement(_renderprops.animated.div, {
            style: style
          }, _react["default"].createElement(_Preview["default"], {
            sandbox: sandbox,
            settings: {
              autoCompleteEnabled: true,
              autoDownloadTypes: false,
              codeMirror: false,
              clearConsoleEnabled: true,
              fontSize: 15,
              lineHeight: 1.4,
              lintEnabled: false,
              vimMode: false,
              tabWidth: 2,
              enableLigatures: true,
              forceRefresh: false,
              experimentVSCode: true,
              prettierConfig: false,
              zenMode: true
            },
            isInProjectView: true
          }));
        } : function (style) {
          return _react["default"].createElement(_renderprops.animated.div, {
            style: style
          }, _react["default"].createElement("div", {
            style: {
              zIndex: 2,
              height: 48,
              minHeight: 48,
              backgroundColor: '#eee'
            }
          }), _react["default"].createElement(_elements.SandboxPreviewImage, null, _react["default"].createElement("div", {
            style: {
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
              backgroundImage: "url(".concat(sandbox && sandbox.screenshotUrl, ")"),
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'center',
              transform: 'scale(1.025, 1.025)',
              filter: 'blur(2px)',
              marginTop: -8
            }
          })));
        };
      }));
    }
  }]);
  return FeaturedSandbox;
}(_react["default"].PureComponent);

exports["default"] = FeaturedSandbox;