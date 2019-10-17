"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease border-color;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNC45NSAxMCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xLjQxIDQuNjdsMS4wNy0xLjQ5IDEuMDYgMS40OUgxLjQxek0zLjU0IDUuMzNMMi40OCA2LjgyIDEuNDEgNS4zM2gyLjEzeiI+PC9wYXRoPjwvc3ZnPg==);\n  background-color: rgba(0, 0, 0, 0.3);\n  background-position: right;\n  background-repeat: no-repeat;\n  color: white;\n  border: none;\n  outline: none;\n  border-radius: 4px;\n  padding: 0.2em 1em 0.2em 0.2em;\n  width: inherit;\n  box-sizing: border-box;\n  font-weight: 400;\n  height: 1.75em;\n  appearance: none;\n\n  border: 1px solid\n    ", ";\n\n  &:focus {\n    border-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = _styledComponents["default"].select(_templateObject(), function (props) {
  return props.error ? props.theme.red.clearer(0.5) : 'rgba(0, 0, 0, 0.1)';
}, function (props) {
  return props.theme.secondary.clearer(0.6);
});

exports["default"] = _default;