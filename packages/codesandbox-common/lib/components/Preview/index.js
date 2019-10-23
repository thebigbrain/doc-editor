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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _codesandboxApi = require("codesandbox-api");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _renderprops = require("react-spring/renderprops.cjs");

var _urlGenerator = require("../../utils/url-generator");

var _modules = require("../../sandbox/modules");

var _templates = _interopRequireDefault(require("../../templates"));

var _packageJson = require("../../templates/configuration/package-json");

var _getSandboxName = require("../../utils/get-sandbox-name");

var _analytics = _interopRequireDefault(require("../../utils/analytics"));

var _Navigator = _interopRequireDefault(require("./Navigator"));

var _elements = require("./elements");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getSSEUrl = function getSSEUrl(sandbox) {
  var initialPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "https://".concat(sandbox ? "".concat(sandbox.id, ".") : '', "sse.").concat(process.env.NODE_ENV === 'development' || process.env.STAGING ? 'codesandbox.io' : (0, _urlGenerator.host)()).concat(initialPath);
};

var BasePreview =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(BasePreview, _React$Component);

  function BasePreview(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BasePreview);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BasePreview).call(this, props));
    /**
     * We have a different domain for the preview (currently :id.csb.app), some corporate
     * firewalls block calls to these domains. Which is why we ping the domain here, if it
     * returns a bad response we fall back to using our main domain (:id.codesandbox.io).
     *
     * We use a different domain for the preview, since Chrome runs iframes from a different root
     * domain in a different process, which means for us that we have a snappier editor
     */

    _this.testFallbackDomainIfNeeded = function () {
      var TRACKING_NAME = 'Preview - Fallback URL';
      var normalUrl = (0, _urlGenerator.frameUrl)(_this.props.sandbox, _this.props.initialPath || '');
      var fallbackUrl = (0, _urlGenerator.frameUrl)(_this.props.sandbox, _this.props.initialPath || '', true);

      var setFallbackDomain = function setFallbackDomain() {
        _this.setState({
          useFallbackDomain: true,
          urlInAddressBar: (0, _urlGenerator.frameUrl)(_this.props.sandbox, _this.props.initialPath || '', true)
        }, function () {
          requestAnimationFrame(function () {
            _this.sendUrl();
          });
        });
      };

      if (!_this.props.url && normalUrl !== fallbackUrl) {
        fetch(normalUrl, {
          mode: 'no-cors'
        }).then(function () {
          // Succeeded
          (0, _analytics["default"])(TRACKING_NAME, {
            needed: false
          });
        })["catch"](function () {
          // Failed, use fallback
          (0, _analytics["default"])(TRACKING_NAME, {
            needed: true
          });
          setFallbackDomain();
        });
      }
    };

    _this.currentUrl = function () {
      var _this$props = _this.props,
          url = _this$props.url,
          sandbox = _this$props.sandbox;

      if (url && !url.startsWith('/')) {
        // An absolute url is given, just return that
        return url;
      } // url may be a relative path (/test), so start with that


      var initialPath = url || _this.props.initialPath || '';
      return _this.serverPreview ? getSSEUrl(sandbox, initialPath) : (0, _urlGenerator.frameUrl)(sandbox, initialPath, _this.state && _this.state.useFallbackDomain);
    };

    _this.openNewWindow = function () {
      if (_this.props.onOpenNewWindow) {
        _this.props.onOpenNewWindow();
      }

      window.open(_this.state.urlInAddressBar, '_blank');
    };

    _this.handleSandboxChange = function (sandbox) {
      _this.serverPreview = (0, _templates["default"])(sandbox.template).isServer;
      (0, _codesandboxApi.resetState)();

      var url = _this.currentUrl();

      if (_this.serverPreview) {
        setTimeout(function () {
          // Remove screenshot after specific time, so the loading container spinner can still show
          _this.setState({
            showScreenshot: false
          });
        }, 800);
      }

      _this.setState({
        urlInAddressBar: url,
        url: url,
        showScreenshot: true
      }, function () {
        return _this.handleRefresh();
      });
    };

    _this.handleDependenciesChange = function () {
      _this.handleRefresh();
    };

    _this.handleMessage = function (data, source) {
      if (data && data.codesandbox) {
        if (data.type === 'initialized' && source) {
          (0, _codesandboxApi.registerFrame)(source, _this.currentUrl());

          if (!_this.state.frameInitialized && _this.props.onInitialized) {
            _this.disposeInitializer = _this.props.onInitialized((0, _assertThisInitialized2["default"])(_this));
          }

          setTimeout(function () {
            // We show a screenshot of the sandbox (if available) on top of the preview if the frame
            // hasn't loaded yet
            _this.setState({
              showScreenshot: false
            });
          }, _this.serverPreview ? 0 : 600);

          _this.executeCodeImmediately(true);
        } else {
          var type = data.type;

          switch (type) {
            case 'render':
              {
                _this.executeCodeImmediately();

                break;
              }

            case 'urlchange':
              {
                _this.commitUrl(data.url, data.back, data.forward);

                break;
              }

            case 'resize':
              {
                if (_this.props.onResize) {
                  _this.props.onResize(data.height);
                }

                break;
              }

            case 'action':
              {
                if (_this.props.onAction) {
                  _this.props.onAction(_objectSpread({}, data, {
                    sandboxId: _this.props.sandbox.id
                  }));
                }

                break;
              }

            case 'done':
              {
                _this.setState({
                  showScreenshot: false
                });

                break;
              }

            default:
              {
                break;
              }
          }
        }
      }
    };

    _this.executeCode = function () {
      requestAnimationFrame(function () {
        _this.executeCodeImmediately();
      });
    };

    _this.getRenderedModule = function () {
      var _this$props2 = _this.props,
          sandbox = _this$props2.sandbox,
          currentModule = _this$props2.currentModule,
          isInProjectView = _this$props2.isInProjectView;
      return isInProjectView ? '/' + sandbox.entry : (0, _modules.getModulePath)(sandbox.modules, sandbox.directories, currentModule.id);
    };

    _this.getModulesToSend = function () {
      var modulesObject = {};
      var sandbox = _this.props.sandbox;
      sandbox.modules.forEach(function (m) {
        var path = (0, _modules.getModulePath)(sandbox.modules, sandbox.directories, m.id);

        if (path) {
          modulesObject[path] = {
            path: path,
            code: m.code,
            isBinary: m.isBinary
          };
        }
      });
      var extraModules = _this.props.extraModules || {};

      var modulesToSend = _objectSpread({}, extraModules, {}, modulesObject);

      if (!modulesToSend['/package.json']) {
        modulesToSend['/package.json'] = {
          code: (0, _packageJson.generateFileFromSandbox)(sandbox),
          path: '/package.json',
          isBinary: false
        };
      }

      return modulesToSend;
    };

    _this.executeCodeImmediately = function () {
      var initialRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // We cancel the existing calls with executeCode to prevent concurrent calls,
      // the only reason we do this is because executeCodeImmediately can be called
      // directly as well
      // @ts-ignore
      _this.executeCode.cancel();

      var settings = _this.props.settings;
      var sandbox = _this.props.sandbox;

      if (settings.clearConsoleEnabled && !_this.serverPreview) {
        // @ts-ignore Chrome behaviour
        console.clear('__internal__'); // eslint-disable-line no-console

        (0, _codesandboxApi.dispatch)({
          type: 'clear-console'
        });
      } // Do it here so we can see the dependency fetching screen if needed


      _this.clearErrors();

      if (settings.forceRefresh && !initialRender) {
        _this.handleRefresh();
      } else {
        if (!_this.props.isInProjectView) {
          (0, _codesandboxApi.dispatch)({
            type: 'evaluate',
            command: "history.pushState({}, null, '/')"
          });
        }

        var modulesToSend = _this.getModulesToSend();

        if (!_this.serverPreview) {
          (0, _codesandboxApi.dispatch)({
            type: 'compile',
            version: 3,
            entry: _this.getRenderedModule(),
            modules: modulesToSend,
            sandboxId: sandbox.id,
            externalResources: sandbox.externalResources,
            isModuleView: !_this.props.isInProjectView,
            template: sandbox.template,
            hasActions: Boolean(_this.props.onAction)
          });
        }
      }
    };

    _this.setIframeElement = function (el) {
      if (el) {
        _this.element = el;
      }
    };

    _this.clearErrors = function () {
      // @ts-ignore
      (0, _codesandboxApi.dispatch)(_codesandboxApi.actions.error.clear('*', 'browser'));

      if (_this.props.onClearErrors) {
        _this.props.onClearErrors();
      }
    };

    _this.updateUrl = function (url) {
      _this.setState({
        urlInAddressBar: url
      });
    };

    _this.sendUrl = function () {
      var urlInAddressBar = _this.state.urlInAddressBar;

      if (_this.element) {
        _this.element.src = urlInAddressBar;

        _this.setState({
          url: urlInAddressBar,
          back: false,
          forward: false
        });
      }
    };

    _this.handleRefresh = function () {
      var _this$state = _this.state,
          urlInAddressBar = _this$state.urlInAddressBar,
          url = _this$state.url;
      var urlToSet = url || urlInAddressBar;

      if (_this.element) {
        _this.element.src = urlToSet || _this.currentUrl();
      }

      _this.setState({
        urlInAddressBar: urlToSet,
        back: false,
        forward: false
      });
    };

    _this.handleBack = function () {
      (0, _codesandboxApi.dispatch)({
        type: 'urlback'
      });
    };

    _this.handleForward = function () {
      (0, _codesandboxApi.dispatch)({
        type: 'urlforward'
      });
    };

    _this.commitUrl = function (url, back, forward) {
      _this.setState({
        urlInAddressBar: url,
        url: url,
        back: back,
        forward: forward
      });
    };

    _this.toggleProjectView = function () {
      if (_this.props.onToggleProjectView) {
        _this.props.onToggleProjectView();
      }
    }; // We have new behaviour in the preview for server templates, which are
    // templates that are executed in a docker container.


    _this.serverPreview = (0, _templates["default"])(props.sandbox.template).isServer;

    var initialUrl = _this.currentUrl();

    _this.state = {
      frameInitialized: false,
      urlInAddressBar: initialUrl,
      url: initialUrl,
      forward: false,
      back: false,
      showScreenshot: true,
      useFallbackDomain: false
    }; // we need a value that doesn't change when receiving `initialPath`
    // from the query params, or the iframe will continue to be re-rendered
    // when the user navigates the iframe app, which shows the loading screen

    _this.initialPath = props.initialPath;

    if (_this.serverPreview) {
      setTimeout(function () {
        // Remove screenshot after specific time, so the loading container spinner can still show
        _this.setState({
          showScreenshot: false
        });
      }, 100);
    }

    _this.listener = (0, _codesandboxApi.listen)(_this.handleMessage);

    if (props.delay) {
      _this.executeCode = (0, _debounce["default"])(_this.executeCode, 800);
    }

    window.openNewWindow = _this.openNewWindow;

    _this.testFallbackDomainIfNeeded();

    setTimeout(function () {
      if (_this.state.showScreenshot) {
        _this.setState({
          showScreenshot: false
        });
      }
    }, 800);
    return _this;
  }

  (0, _createClass2["default"])(BasePreview, [{
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
      if (nextState.frameInitialized !== this.state.frameInitialized && nextState.frameInitialized) {
        this.handleRefresh();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.listener) {
        this.listener();
      }

      if (this.disposeInitializer) {
        this.disposeInitializer();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.sandbox && this.props.sandbox && prevProps.sandbox.id !== this.props.sandbox.id) {
        this.handleSandboxChange(this.props.sandbox);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          showNavigation = _this$props3.showNavigation,
          inactive = _this$props3.inactive,
          sandbox = _this$props3.sandbox,
          settings = _this$props3.settings,
          isInProjectView = _this$props3.isInProjectView,
          dragging = _this$props3.dragging,
          hide = _this$props3.hide,
          noPreview = _this$props3.noPreview,
          className = _this$props3.className,
          overlayMessage = _this$props3.overlayMessage;
      var _this$state2 = this.state,
          urlInAddressBar = _this$state2.urlInAddressBar,
          back = _this$state2.back,
          forward = _this$state2.forward;
      var url = urlInAddressBar || this.currentUrl();

      if (noPreview) {
        // Means that preview is open in another tab definitely
        return null;
      } // Weird TS typing bug


      var AnySpring = _renderprops.Spring;
      return _react["default"].createElement(_elements.Container, {
        className: className,
        style: {
          position: 'relative',
          flex: 1,
          display: hide ? 'none' : undefined
        }
      }, showNavigation && _react["default"].createElement(_Navigator["default"], {
        url: url,
        onChange: this.updateUrl,
        onConfirm: this.sendUrl,
        onBack: back ? this.handleBack : null,
        onForward: forward ? this.handleForward : null,
        onRefresh: this.handleRefresh,
        isProjectView: isInProjectView,
        toggleProjectView: this.props.onToggleProjectView && this.toggleProjectView,
        openNewWindow: this.openNewWindow,
        zenMode: settings.zenMode
      }), overlayMessage && _react["default"].createElement(_elements.Loading, null, overlayMessage), _react["default"].createElement(AnySpring, {
        from: {
          opacity: 0
        },
        to: {
          opacity: this.state.showScreenshot ? 0 : 1
        }
      }, function (style) {
        return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_elements.StyledFrame, {
          sandbox: "allow-forms allow-scripts allow-same-origin allow-modals allow-popups allow-presentation",
          allow: "geolocation; microphone; camera;midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb",
          src: _this2.currentUrl(),
          ref: _this2.setIframeElement,
          title: (0, _getSandboxName.getSandboxName)(sandbox),
          id: "sandbox-preview",
          style: _objectSpread({}, style, {
            zIndex: 1,
            backgroundColor: 'white',
            pointerEvents: dragging || inactive || _this2.props.isResizing ? 'none' : 'initial'
          })
        }), _this2.props.sandbox.screenshotUrl && style.opacity !== 1 && _react["default"].createElement("div", {
          style: {
            overflow: 'hidden',
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            left: 0,
            right: 0,
            bottom: 0,
            top: 35,
            zIndex: 0
          }
        }, _react["default"].createElement("div", {
          style: {
            width: '100%',
            height: '100%',
            filter: "blur(2px)",
            transform: 'scale(1.025, 1.025)',
            backgroundImage: "url(\"".concat(_this2.props.sandbox.screenshotUrl, "\")"),
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center'
          }
        })));
      }));
    }
  }]);
  return BasePreview;
}(_react["default"].Component);

BasePreview.defaultProps = {
  showNavigation: true,
  delay: true
};
var _default = BasePreview;
exports["default"] = _default;