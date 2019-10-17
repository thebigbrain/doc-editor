"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Logo = _interopRequireDefault(require("../Logo"));

var _MaxWidth = _interopRequireDefault(require("../flex/MaxWidth"));

var _media = _interopRequireDefault(require("../../utils/media"));

var _analytics = _interopRequireDefault(require("../../utils/analytics"));

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 1.75em;\n  height: 1.75em;\n  border-radius: 4px;\n  margin-left: 0.75rem;\n  margin-bottom: 0;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      @media (max-width: ", "px) {\n        display: none;\n      }\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      display: none;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      ", ";\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    font-size: 1rem;\n    margin: 0 .5rem;\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      transition: 0.3s ease all;\n      padding: 0.2rem 0.8rem;\n      border-radius: 4px;\n      font-weight: 600;\n      background-color: ", ";\n      border: 2px solid rgba(255, 255, 255, 0.3);\n\n      &:hover {\n        color: white;\n        background-color: #7fc3f7;\n        border-color: transparent;\n      }\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-flex;\n  align-items: center;\n  transition: 0.2s ease color;\n  font-size: 1.125rem;\n  text-decoration: none;\n  color: white;\n\n  margin: 0 1rem;\n  font-weight: 400;\n\n  &:hover {\n    color: ", ";\n  }\n\n  ", ";\n\n  ", ";\n\n  ", ";\n\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    width: 38px;\n    height: 38px;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: white;\n  ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  flex: auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  padding: 1rem 0;\n  width: 100%;\n  color: white;\n  z-index: 5;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Container = _styledComponents["default"].div(_templateObject());

var Left = _styledComponents["default"].div(_templateObject2());

var StyledLogo = (0, _styledComponents["default"])(_Logo["default"])(_templateObject3(), _media["default"].phone(_templateObject4()));

var Item = _styledComponents["default"].a(_templateObject5(), function (props) {
  return props.theme.secondary;
}, function (props) {
  return props.button && (0, _styledComponents.css)(_templateObject6(), props.theme.secondary);
}, _media["default"].phone(_templateObject7()), function (props) {
  return props.hidePhone && (0, _styledComponents.css)(_templateObject8(), _media["default"].phone(_templateObject9()));
}, function (props) {
  return props.hideOn && (0, _styledComponents.css)(_templateObject10(), props.hideOn);
});

var Right = _styledComponents["default"].div(_templateObject11());

var Image = _styledComponents["default"].img(_templateObject12());

var Navigation =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(Navigation, _React$PureComponent);

  function Navigation() {
    var _this;

    (0, _classCallCheck2["default"])(this, Navigation);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Navigation).apply(this, arguments));
    _this.state = {
      user: null
    };

    _this.fetchCurrentUser = function () {
      var jwt = JSON.parse(localStorage.getItem('jwt'));
      var BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
      window.fetch(BASE + '/api/v1/users/current', {
        headers: {
          Authorization: "Bearer ".concat(jwt)
        }
      }).then(function (x) {
        return x.json();
      }).then(function (_ref) {
        var data = _ref.data;
        return _this.setState({
          user: data
        });
      })["catch"](function () {
        /* do nothing */
      });
    };

    return _this;
  }

  (0, _createClass2["default"])(Navigation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (localStorage.getItem('jwt')) {
        this.fetchCurrentUser();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var user = this.state.user;
      return _react["default"].createElement(_MaxWidth["default"], {
        width: 1440
      }, _react["default"].createElement(Container, null, _react["default"].createElement(Left, null, _react["default"].createElement("a", {
        href: "/"
      }, _react["default"].createElement(StyledLogo, {
        width: 40,
        height: 40,
        style: {
          marginRight: '1rem'
        }
      })), _react["default"].createElement(Item, {
        href: "/explore"
      }, "Explore"), _react["default"].createElement(Item, {
        href: "/search"
      }, "Search"), _react["default"].createElement(Item, {
        href: "/docs"
      }, "Docs"), _react["default"].createElement(Item, {
        href: "/blog"
      }, "Blog"), _react["default"].createElement(Item, {
        href: "https://github.com/codesandbox/codesandbox-client",
        target: "_blank",
        rel: "noopener noreferrer",
        hideOn: 970
      }, "GitHub"), _react["default"].createElement(Item, {
        href: "/jobs"
      }, "Careers")), _react["default"].createElement(Right, null, !user && _react["default"].createElement(Item, {
        hideOn: 875,
        href: "/signin"
      }, "Sign In"), _react["default"].createElement(Item, {
        onClick: function onClick() {
          (0, _analytics["default"])('Navigation - Create Sandbox Clicked');
        },
        hidePhone: true,
        href: "/s",
        rel: "noopener noreferrer",
        button: !user
      }, "Create Sandbox"), user && _react["default"].createElement(Item, {
        hidePhone: true,
        href: "/dashboard",
        rel: "noopener noreferrer"
      }, user.username, _react["default"].createElement(Image, {
        alt: user.username,
        src: user.avatar_url
      })))));
    }
  }]);
  return Navigation;
}(_react["default"].PureComponent);

exports["default"] = Navigation;