"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var diff = _interopRequireWildcard(require(".."));

describe('Diffing', function () {
  it('can diff two strings', function () {
    expect(diff.findDiff('aaa', 'aba')).toMatchSnapshot();
    expect(diff.findDiff('aaaaa', 'aba')).toMatchSnapshot();
  });
  it('can generate an operation from a diff', function () {
    var textA = 'I like pizza';
    var textB = 'They like cookies';
    var op = diff.getTextOperation(textA, textB);
    expect(op.toJSON()).toMatchSnapshot();
    expect(op.apply(textA)).toBe('They like cookies');
  });
  it('can generate with many deletions', function () {
    var textA = 'I like pizza';
    var textB = ' I';
    var op = diff.getTextOperation(textA, textB);
    expect(op.toJSON()).toMatchSnapshot();
    expect(op.apply(textA)).toBe(' I');
  });
  it('can generate an operation on real code', function () {
    var textA = "\n    import React from 'react'\n    import ReactDOM from 'react-dom'\n\n    import './styles.css'\n\n    function App() {\n      return (\n        <div className=\"App\">\n          <h1>Hello wereld aa pok CodeSandbox</h1>\n\n          <h2>Start editing to see some magic happen!</h2>\n        </div>\n      )\n    }\n\n    const rootElement = document.getElementById('root')\n    ReactDOM.render(<App />, rootElement)\n    ";
    var textB = "\n    import React from \"react\";\n    import ReactDOM from \"react-dom\";\n\n    import \"./styles.css\";\n\n    function App() {\n      return (\n        <div className=\"App\">\n          <h1>Hello wereld aa pok CodeSandbox</h1>\n\n          <h2>Start editing to see some magic happen!</h2>\n        </div>\n      );\n    }\n\n    const rootElement = document.getElementById(\"root\");\n    ReactDOM.render(<App />, rootElement);\n    ";
    var op = diff.getTextOperation(textA, textB);
    expect(op.toJSON()).toMatchSnapshot();
    expect(op.apply(textA)).toBe(textB);
  });
  it('can work with big files', function () {
    var A = Array.from({
      length: 10000
    }).map(function () {
      return 'a';
    }).join('');
    var B = A.split('').map(function (c, i) {
      return i > 2000 && i < 2050 ? 'b' : c;
    }).join('');
    var op = diff.getTextOperation(A, B);
    expect(op.apply(A)).toEqual(B);
  });
  it('falls back to stupid diff really big files', function () {
    var A = Array.from({
      length: 15000
    }).map(function () {
      return 'a';
    }).join('');
    var B = A.split('').map(function (c, i) {
      return i > 2000 && i < 2050 ? 'b' : c;
    }).join('');
    var op = diff.getTextOperation(A, B);
    expect(op).toMatchSnapshot();
    expect(op.apply(A)).toEqual(B);
  });
});