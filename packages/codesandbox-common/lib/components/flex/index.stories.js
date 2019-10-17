"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _Centered = _interopRequireDefault(require("./Centered"));

var _Fullscreen = _interopRequireDefault(require("./Fullscreen"));

var _Row = _interopRequireDefault(require("./Row"));

var _Column = _interopRequireDefault(require("./Column"));

var _fixtures = require("./fixtures");

var _MaxWidth = _interopRequireDefault(require("./MaxWidth"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    display: flex;\n    overflow: hidden;\n    white-space: pre-wrap;\n    justify-content: center;\n    align-items: center;\n    min-height: ", "px;\n    min-width: ", "px;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border: 5px dashed ", ";\n  padding: 10px;\n  box-sizing: border-box;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Background = _styledComponents["default"].div(_templateObject());

var withBackground = function withBackground(fn) {
  return _react["default"].createElement(Background, null, fn());
};

var makeBorderedContainer = function makeBorderedContainer(name, Component, defaultColor) {
  return (0, _styledComponents["default"])(Component)(_templateObject2(), function () {
    return (0, _addonKnobs.color)(name, defaultColor, 'colors');
  });
};

var Content = makeBorderedContainer('content', _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.minHeight;
}, function (props) {
  return props.minWidth;
}), 'green');

var makeContent = function makeContent() {
  var count = (0, _addonKnobs.number)('Repeat content', 1, {}, 'other');
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  var contents = [];

  for (var i = 0; i < count; i++) {
    var letter = letters[i % letters.length];

    var _repeat = Math.trunc(i / letters.length);

    var label = letter;

    for (var j = 0; j < _repeat; j++) {
      label += " ".concat(letter);
    }

    var width = (0, _addonKnobs.number)("\"".concat(label, "\".minWidth"), 100, {}, 'content sizes');
    var height = (0, _addonKnobs.number)("\"".concat(label, "\".minHeight"), 100, {}, 'content sizes');
    contents.push(_react["default"].createElement(Content, {
      minWidth: width,
      minHeight: height
    }, label));
  }

  return _react["default"].createElement(_react["default"].Fragment, null, contents);
};

var CenteredBordered = makeBorderedContainer('Centered', _Centered["default"], 'yellow');

var withCenteredBordered = function withCenteredBordered(fn) {
  return _react["default"].createElement(CenteredBordered, {
    horizontal: (0, _addonKnobs["boolean"])('horizontal', false, 'Centered Props'),
    vertical: (0, _addonKnobs["boolean"])('vertical', false, 'Centered Props')
  }, fn());
};

var FullscreenBordered = makeBorderedContainer('Fullscreen', _Fullscreen["default"], 'red');

var withFullscreenBordered = function withFullscreenBordered(fn) {
  return _react["default"].createElement(FullscreenBordered, null, fn());
};

var ColumnBordered = makeBorderedContainer('Column', _Column["default"], 'purple');

var withColumnBordered = function withColumnBordered(fn) {
  return _react["default"].createElement(ColumnBordered, {
    flex: (0, _addonKnobs["boolean"])('flex', false, 'Column Props'),
    alignItems: (0, _addonKnobs.select)('alignItems', _fixtures.alignItemsOptions, null, 'Column Props'),
    justifyContent: (0, _addonKnobs.select)('justifyContent', _fixtures.justifyContentOptions, 'space-between', 'Column Props')
  }, fn());
};

var RowBordered = makeBorderedContainer('Row', _Row["default"], 'orange');

var withRowBordered = function withRowBordered(fn) {
  return _react["default"].createElement(RowBordered, {
    alignItems: (0, _addonKnobs.select)('alignItems', _fixtures.alignItemsOptions, null, 'Row Props'),
    justifyContent: (0, _addonKnobs.select)('justifyContent', _fixtures.justifyContentOptions, 'space-between', 'Row Props')
  }, fn());
};

var MaxWidthBordered = makeBorderedContainer('MaxWidth', _MaxWidth["default"], 'blue');

var withMaxWidthBordered = function withMaxWidthBordered(fn) {
  return _react["default"].createElement(MaxWidthBordered, {
    responsive: (0, _addonKnobs["boolean"])('responsive', undefined, 'MaxWidth props'),
    width: (0, _addonKnobs.number)('width', undefined, {}, 'MaxWidth props')
  }, fn());
};

var repeat = function repeat(name, fn) {
  return function () {
    var times = (0, _addonKnobs.number)("Repeat ".concat(name), 1, {}, 'other');
    var content = [];

    for (var i = 0; i < times; i++) {
      content.push(fn());
    }

    return _react["default"].createElement(_react["default"].Fragment, null, content);
  };
};

(0, _react2.storiesOf)('components/flex', module).addDecorator(withBackground).add('Centered', function () {
  return withCenteredBordered(makeContent);
}).add('Fullscreen', function () {
  return withFullscreenBordered(makeContent);
}).add('MaxWidth', function () {
  return withMaxWidthBordered(makeContent);
}).add('Column', function () {
  return withColumnBordered(makeContent);
}).add('Row', function () {
  return withRowBordered(makeContent);
}).add('Fullscreen > Centered', function () {
  return withFullscreenBordered(repeat('Centered', function () {
    return withCenteredBordered(makeContent);
  }));
}).add('Fullscreen > Column', function () {
  return withFullscreenBordered(repeat('Column', function () {
    return withColumnBordered(makeContent);
  }));
}).add('Fullscreen > Row', function () {
  return withFullscreenBordered(repeat('Row', function () {
    return withRowBordered(makeContent);
  }));
}).add('MaxWidth > Centered', function () {
  return withMaxWidthBordered(repeat('Centered', function () {
    return withCenteredBordered(makeContent);
  }));
}).add('MaxWidth > Column', function () {
  return withMaxWidthBordered(repeat('Column', function () {
    return withColumnBordered(makeContent);
  }));
}).add('MaxWidth > Row', function () {
  return withMaxWidthBordered(repeat('Row', function () {
    return withRowBordered(makeContent);
  }));
}).add("Playground \uD83D\uDE80", function () {
  var decorators = [];
  var current = null;

  do {
    current = (0, _addonKnobs.select)("Component ".concat(decorators.length), ['Fullscreen', 'MaxWidth', 'Centered', 'Row', 'Column', null], null, 'structure');

    switch (current) {
      case 'Fullscreen':
        decorators.push(withFullscreenBordered);
        break;

      case 'MaxWidth':
        decorators.push(withMaxWidthBordered);
        break;

      case 'Centered':
        decorators.push(withCenteredBordered);
        break;

      case 'Row':
        decorators.push(withRowBordered);
        break;

      case 'Column':
        decorators.push(withColumnBordered);
        break;
    }
  } while (current);

  return decorators.reduceRight(function (last, decorator, i) {
    return repeat("Component ".concat(i), function () {
      return decorator(last);
    });
  }, makeContent)();
});