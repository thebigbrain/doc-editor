"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var styled_components_1 = require("styled-components");
var fadeInAnimation = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0%   { opacity: 0 }\n  100% { opacity: 1 }\n"], ["\n  0%   { opacity: 0 }\n  100% { opacity: 1 }\n"])));
exports.Container = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  background-color: white;\n\n  display: flex;\n  flex-direction: column;\n"], ["\n  height: 100%;\n  width: 100%;\n  background-color: white;\n\n  display: flex;\n  flex-direction: column;\n"])));
exports.StyledFrame = styled_components_1["default"].iframe(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-width: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n"], ["\n  border-width: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n"])));
exports.Loading = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  animation: ", " 0.2s;\n  animation-fill-mode: forwards;\n  position: absolute;\n  top: 35px;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.75);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  font-size: 1.5rem;\n  font-weight: 300;\n  color: white;\n  line-height: 1.3;\n  text-align: center;\n\n  z-index: 10;\n"], ["\n  animation: ", " 0.2s;\n  animation-fill-mode: forwards;\n  position: absolute;\n  top: 35px;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.75);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  font-size: 1.5rem;\n  font-weight: 300;\n  color: white;\n  line-height: 1.3;\n  text-align: center;\n\n  z-index: 10;\n"])), fadeInAnimation);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
