"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var codesandbox_api_1 = require("codesandbox-api");
var debounce_1 = require("lodash/debounce");
var renderprops_cjs_1 = require("react-spring/renderprops.cjs");
var url_generator_1 = require("../../utils/url-generator");
var modules_1 = require("../../sandbox/modules");
var templates_1 = require("../../templates");
var package_json_1 = require("../../templates/configuration/package-json");
var get_sandbox_name_1 = require("../../utils/get-sandbox-name");
var analytics_1 = require("../../utils/analytics");
var Navigator_1 = require("./Navigator");
var elements_1 = require("./elements");
var getSSEUrl = function (sandbox, initialPath) {
    if (initialPath === void 0) { initialPath = ''; }
    return "https://" + (sandbox ? sandbox.id + "." : '') + "sse." + (process.env.NODE_ENV === 'development' || process.env.STAGING
        ? 'codesandbox.io'
        : url_generator_1.host()) + initialPath;
};
var BasePreview = /** @class */ (function (_super) {
    __extends(BasePreview, _super);
    function BasePreview(props) {
        var _this = _super.call(this, props) || this;
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
            var normalUrl = url_generator_1.frameUrl(_this.props.sandbox, _this.props.initialPath || '');
            var fallbackUrl = url_generator_1.frameUrl(_this.props.sandbox, _this.props.initialPath || '', true);
            var setFallbackDomain = function () {
                _this.setState({
                    useFallbackDomain: true,
                    urlInAddressBar: url_generator_1.frameUrl(_this.props.sandbox, _this.props.initialPath || '', true)
                }, function () {
                    requestAnimationFrame(function () {
                        _this.sendUrl();
                    });
                });
            };
            if (!_this.props.url && normalUrl !== fallbackUrl) {
                fetch(normalUrl, { mode: 'no-cors' })
                    .then(function () {
                    // Succeeded
                    analytics_1["default"](TRACKING_NAME, { needed: false });
                })["catch"](function () {
                    // Failed, use fallback
                    analytics_1["default"](TRACKING_NAME, { needed: true });
                    setFallbackDomain();
                });
            }
        };
        _this.currentUrl = function () {
            var _a = _this.props, url = _a.url, sandbox = _a.sandbox;
            if (url && !url.startsWith('/')) {
                // An absolute url is given, just return that
                return url;
            }
            // url may be a relative path (/test), so start with that
            var initialPath = url || _this.props.initialPath || '';
            return _this.serverPreview
                ? getSSEUrl(sandbox, initialPath)
                : url_generator_1.frameUrl(sandbox, initialPath, _this.state && _this.state.useFallbackDomain);
        };
        _this.openNewWindow = function () {
            if (_this.props.onOpenNewWindow) {
                _this.props.onOpenNewWindow();
            }
            window.open(_this.state.urlInAddressBar, '_blank');
        };
        _this.handleSandboxChange = function (sandbox) {
            _this.serverPreview = templates_1["default"](sandbox.template).isServer;
            codesandbox_api_1.resetState();
            var url = _this.currentUrl();
            if (_this.serverPreview) {
                setTimeout(function () {
                    // Remove screenshot after specific time, so the loading container spinner can still show
                    _this.setState({ showScreenshot: false });
                }, 800);
            }
            _this.setState({
                urlInAddressBar: url,
                url: url,
                showScreenshot: true
            }, function () { return _this.handleRefresh(); });
        };
        _this.handleDependenciesChange = function () {
            _this.handleRefresh();
        };
        _this.handleMessage = function (data, source) {
            if (data && data.codesandbox) {
                if (data.type === 'initialized' && source) {
                    codesandbox_api_1.registerFrame(source, _this.currentUrl());
                    if (!_this.state.frameInitialized && _this.props.onInitialized) {
                        _this.disposeInitializer = _this.props.onInitialized(_this);
                    }
                    setTimeout(function () {
                        // We show a screenshot of the sandbox (if available) on top of the preview if the frame
                        // hasn't loaded yet
                        _this.setState({ showScreenshot: false });
                    }, _this.serverPreview ? 0 : 600);
                    _this.executeCodeImmediately(true);
                }
                else {
                    var type = data.type;
                    switch (type) {
                        case 'render': {
                            _this.executeCodeImmediately();
                            break;
                        }
                        case 'urlchange': {
                            _this.commitUrl(data.url, data.back, data.forward);
                            break;
                        }
                        case 'resize': {
                            if (_this.props.onResize) {
                                _this.props.onResize(data.height);
                            }
                            break;
                        }
                        case 'action': {
                            if (_this.props.onAction) {
                                _this.props.onAction(__assign(__assign({}, data), { sandboxId: _this.props.sandbox.id }));
                            }
                            break;
                        }
                        case 'done': {
                            _this.setState({ showScreenshot: false });
                            break;
                        }
                        default: {
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
            var _a = _this.props, sandbox = _a.sandbox, currentModule = _a.currentModule, isInProjectView = _a.isInProjectView;
            return isInProjectView
                ? '/' + sandbox.entry
                : modules_1.getModulePath(sandbox.modules, sandbox.directories, currentModule.id);
        };
        _this.getModulesToSend = function () {
            var modulesObject = {};
            var sandbox = _this.props.sandbox;
            sandbox.modules.forEach(function (m) {
                var path = modules_1.getModulePath(sandbox.modules, sandbox.directories, m.id);
                if (path) {
                    modulesObject[path] = {
                        path: path,
                        code: m.code,
                        isBinary: m.isBinary
                    };
                }
            });
            var extraModules = _this.props.extraModules || {};
            var modulesToSend = __assign(__assign({}, extraModules), modulesObject);
            if (!modulesToSend['/package.json']) {
                modulesToSend['/package.json'] = {
                    code: package_json_1.generateFileFromSandbox(sandbox),
                    path: '/package.json',
                    isBinary: false
                };
            }
            return modulesToSend;
        };
        _this.executeCodeImmediately = function (initialRender) {
            if (initialRender === void 0) { initialRender = false; }
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
                codesandbox_api_1.dispatch({ type: 'clear-console' });
            }
            // Do it here so we can see the dependency fetching screen if needed
            _this.clearErrors();
            if (settings.forceRefresh && !initialRender) {
                _this.handleRefresh();
            }
            else {
                if (!_this.props.isInProjectView) {
                    codesandbox_api_1.dispatch({
                        type: 'evaluate',
                        command: "history.pushState({}, null, '/')"
                    });
                }
                var modulesToSend = _this.getModulesToSend();
                if (!_this.serverPreview) {
                    codesandbox_api_1.dispatch({
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
            codesandbox_api_1.dispatch(codesandbox_api_1.actions.error.clear('*', 'browser'));
            if (_this.props.onClearErrors) {
                _this.props.onClearErrors();
            }
        };
        _this.updateUrl = function (url) {
            _this.setState({ urlInAddressBar: url });
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
            var _a = _this.state, urlInAddressBar = _a.urlInAddressBar, url = _a.url;
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
            codesandbox_api_1.dispatch({
                type: 'urlback'
            });
        };
        _this.handleForward = function () {
            codesandbox_api_1.dispatch({
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
        };
        // We have new behaviour in the preview for server templates, which are
        // templates that are executed in a docker container.
        _this.serverPreview = templates_1["default"](props.sandbox.template).isServer;
        var initialUrl = _this.currentUrl();
        _this.state = {
            frameInitialized: false,
            urlInAddressBar: initialUrl,
            url: initialUrl,
            forward: false,
            back: false,
            showScreenshot: true,
            useFallbackDomain: false
        };
        // we need a value that doesn't change when receiving `initialPath`
        // from the query params, or the iframe will continue to be re-rendered
        // when the user navigates the iframe app, which shows the loading screen
        _this.initialPath = props.initialPath;
        if (_this.serverPreview) {
            setTimeout(function () {
                // Remove screenshot after specific time, so the loading container spinner can still show
                _this.setState({ showScreenshot: false });
            }, 100);
        }
        _this.listener = codesandbox_api_1.listen(_this.handleMessage);
        if (props.delay) {
            _this.executeCode = debounce_1["default"](_this.executeCode, 800);
        }
        window.openNewWindow = _this.openNewWindow;
        _this.testFallbackDomainIfNeeded();
        setTimeout(function () {
            if (_this.state.showScreenshot) {
                _this.setState({ showScreenshot: false });
            }
        }, 800);
        return _this;
    }
    BasePreview.prototype.UNSAFE_componentWillUpdate = function (nextProps, nextState) {
        if (nextState.frameInitialized !== this.state.frameInitialized &&
            nextState.frameInitialized) {
            this.handleRefresh();
        }
    };
    BasePreview.prototype.componentWillUnmount = function () {
        if (this.listener) {
            this.listener();
        }
        if (this.disposeInitializer) {
            this.disposeInitializer();
        }
    };
    BasePreview.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.sandbox &&
            this.props.sandbox &&
            prevProps.sandbox.id !== this.props.sandbox.id) {
            this.handleSandboxChange(this.props.sandbox);
        }
    };
    BasePreview.prototype.render = function () {
        var _this = this;
        var _a = this.props, showNavigation = _a.showNavigation, inactive = _a.inactive, sandbox = _a.sandbox, settings = _a.settings, isInProjectView = _a.isInProjectView, dragging = _a.dragging, hide = _a.hide, noPreview = _a.noPreview, className = _a.className, overlayMessage = _a.overlayMessage;
        var _b = this.state, urlInAddressBar = _b.urlInAddressBar, back = _b.back, forward = _b.forward;
        var url = urlInAddressBar || this.currentUrl();
        if (noPreview) {
            // Means that preview is open in another tab definitely
            return null;
        }
        // Weird TS typing bug
        var AnySpring = renderprops_cjs_1.Spring;
        return (<elements_1.Container className={className} style={{
            position: 'relative',
            flex: 1,
            display: hide ? 'none' : undefined
        }}>
        {showNavigation && (<Navigator_1["default"] url={url} onChange={this.updateUrl} onConfirm={this.sendUrl} onBack={back ? this.handleBack : null} onForward={forward ? this.handleForward : null} onRefresh={this.handleRefresh} isProjectView={isInProjectView} toggleProjectView={this.props.onToggleProjectView && this.toggleProjectView} openNewWindow={this.openNewWindow} zenMode={settings.zenMode}/>)}
        {overlayMessage && <elements_1.Loading>{overlayMessage}</elements_1.Loading>}

        <AnySpring from={{ opacity: 0 }} to={{
            opacity: this.state.showScreenshot ? 0 : 1
        }}>
          {function (style) { return (<>
              <elements_1.StyledFrame sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-popups allow-presentation" allow="geolocation; microphone; camera;midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" src={_this.currentUrl()} ref={_this.setIframeElement} title={get_sandbox_name_1.getSandboxName(sandbox)} id="sandbox-preview" style={__assign(__assign({}, style), { zIndex: 1, backgroundColor: 'white', pointerEvents: dragging || inactive || _this.props.isResizing
                ? 'none'
                : 'initial' })}/>

              {_this.props.sandbox.screenshotUrl && style.opacity !== 1 && (<div style={{
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
        }}>
                  <div style={{
            width: '100%',
            height: '100%',
            filter: "blur(2px)",
            transform: 'scale(1.025, 1.025)',
            backgroundImage: "url(\"" + _this.props.sandbox.screenshotUrl + "\")",
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center'
        }}/>
                </div>)}
            </>); }}
        </AnySpring>
      </elements_1.Container>);
    };
    BasePreview.defaultProps = {
        showNavigation: true,
        delay: true
    };
    return BasePreview;
}(react_1["default"].Component));
exports["default"] = BasePreview;
