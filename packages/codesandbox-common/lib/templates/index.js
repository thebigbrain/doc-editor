"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDefinition;
Object.defineProperty(exports, "adonis", {
  enumerable: true,
  get: function get() {
    return _adonis["default"];
  }
});
Object.defineProperty(exports, "angular", {
  enumerable: true,
  get: function get() {
    return _angular["default"];
  }
});
Object.defineProperty(exports, "babel", {
  enumerable: true,
  get: function get() {
    return _babel["default"];
  }
});
Object.defineProperty(exports, "parcel", {
  enumerable: true,
  get: function get() {
    return _parcel["default"];
  }
});
Object.defineProperty(exports, "preact", {
  enumerable: true,
  get: function get() {
    return _preact["default"];
  }
});
Object.defineProperty(exports, "reason", {
  enumerable: true,
  get: function get() {
    return _reason["default"];
  }
});
Object.defineProperty(exports, "react", {
  enumerable: true,
  get: function get() {
    return _react["default"];
  }
});
Object.defineProperty(exports, "reactTs", {
  enumerable: true,
  get: function get() {
    return _reactTs["default"];
  }
});
Object.defineProperty(exports, "svelte", {
  enumerable: true,
  get: function get() {
    return _svelte["default"];
  }
});
Object.defineProperty(exports, "vue", {
  enumerable: true,
  get: function get() {
    return _vue["default"];
  }
});
Object.defineProperty(exports, "ember", {
  enumerable: true,
  get: function get() {
    return _ember["default"];
  }
});
Object.defineProperty(exports, "cxjs", {
  enumerable: true,
  get: function get() {
    return _cxjs["default"];
  }
});
Object.defineProperty(exports, "dojo", {
  enumerable: true,
  get: function get() {
    return _dojo["default"];
  }
});
Object.defineProperty(exports, "custom", {
  enumerable: true,
  get: function get() {
    return _custom["default"];
  }
});
Object.defineProperty(exports, "gatsby", {
  enumerable: true,
  get: function get() {
    return _gatsby["default"];
  }
});
Object.defineProperty(exports, "marko", {
  enumerable: true,
  get: function get() {
    return _marko["default"];
  }
});
Object.defineProperty(exports, "nuxt", {
  enumerable: true,
  get: function get() {
    return _nuxt["default"];
  }
});
Object.defineProperty(exports, "next", {
  enumerable: true,
  get: function get() {
    return _next["default"];
  }
});
Object.defineProperty(exports, "node", {
  enumerable: true,
  get: function get() {
    return _node["default"];
  }
});
Object.defineProperty(exports, "apollo", {
  enumerable: true,
  get: function get() {
    return _apolloServer["default"];
  }
});
Object.defineProperty(exports, "sapper", {
  enumerable: true,
  get: function get() {
    return _sapper["default"];
  }
});
Object.defineProperty(exports, "nest", {
  enumerable: true,
  get: function get() {
    return _nest["default"];
  }
});
Object.defineProperty(exports, "staticTemplate", {
  enumerable: true,
  get: function get() {
    return _static["default"];
  }
});
Object.defineProperty(exports, "styleguidist", {
  enumerable: true,
  get: function get() {
    return _styleguidist["default"];
  }
});
Object.defineProperty(exports, "gridsome", {
  enumerable: true,
  get: function get() {
    return _gridsome["default"];
  }
});
Object.defineProperty(exports, "vuepress", {
  enumerable: true,
  get: function get() {
    return _vuepress["default"];
  }
});
Object.defineProperty(exports, "mdxDeck", {
  enumerable: true,
  get: function get() {
    return _mdxDeck["default"];
  }
});
Object.defineProperty(exports, "quasar", {
  enumerable: true,
  get: function get() {
    return _quasar["default"];
  }
});
Object.defineProperty(exports, "unibit", {
  enumerable: true,
  get: function get() {
    return _unibit["default"];
  }
});

var _adonis = _interopRequireDefault(require("./adonis"));

var _angular = _interopRequireDefault(require("./angular"));

var _babel = _interopRequireDefault(require("./babel"));

var _parcel = _interopRequireDefault(require("./parcel"));

var _preact = _interopRequireDefault(require("./preact"));

var _reason = _interopRequireDefault(require("./reason"));

var _react = _interopRequireDefault(require("./react"));

var _reactTs = _interopRequireDefault(require("./react-ts"));

var _svelte = _interopRequireDefault(require("./svelte"));

var _vue = _interopRequireDefault(require("./vue"));

var _ember = _interopRequireDefault(require("./ember"));

var _cxjs = _interopRequireDefault(require("./cxjs"));

var _dojo = _interopRequireDefault(require("./dojo"));

var _custom = _interopRequireDefault(require("./custom"));

var _gatsby = _interopRequireDefault(require("./gatsby"));

var _marko = _interopRequireDefault(require("./marko"));

var _nuxt = _interopRequireDefault(require("./nuxt"));

var _next = _interopRequireDefault(require("./next"));

var _node = _interopRequireDefault(require("./node"));

var _apolloServer = _interopRequireDefault(require("./apollo-server"));

var _sapper = _interopRequireDefault(require("./sapper"));

var _nest = _interopRequireDefault(require("./nest"));

var _static = _interopRequireDefault(require("./static"));

var _styleguidist = _interopRequireDefault(require("./styleguidist"));

var _gridsome = _interopRequireDefault(require("./gridsome"));

var _vuepress = _interopRequireDefault(require("./vuepress"));

var _mdxDeck = _interopRequireDefault(require("./mdx-deck"));

var _quasar = _interopRequireDefault(require("./quasar"));

var _unibit = _interopRequireDefault(require("./unibit"));

function getDefinition(theme) {
  switch (theme) {
    case _adonis["default"].name:
      return _adonis["default"];

    case _react["default"].name:
      return _react["default"];

    case _vue["default"].name:
      return _vue["default"];

    case _preact["default"].name:
      return _preact["default"];

    case _reactTs["default"].name:
      return _reactTs["default"];

    case _svelte["default"].name:
      return _svelte["default"];

    case _angular["default"].name:
      return _angular["default"];

    case _parcel["default"].name:
      return _parcel["default"];

    case _babel["default"].name:
      return _babel["default"];

    case _cxjs["default"].name:
      return _cxjs["default"];

    case _dojo["default"].name:
      return _dojo["default"];

    case _custom["default"].name:
      return _custom["default"];

    case _gatsby["default"].name:
      return _gatsby["default"];

    case _marko["default"].name:
      return _marko["default"];

    case _nuxt["default"].name:
      return _nuxt["default"];

    case _next["default"].name:
      return _next["default"];

    case _reason["default"].name:
      return _reason["default"];

    case _node["default"].name:
      return _node["default"];

    case _apolloServer["default"].name:
      return _apolloServer["default"];

    case _sapper["default"].name:
      return _sapper["default"];

    case _nest["default"].name:
      return _nest["default"];

    case _static["default"].name:
      return _static["default"];

    case _styleguidist["default"].name:
      return _styleguidist["default"];

    case _mdxDeck["default"].name:
      return _mdxDeck["default"];

    case _gridsome["default"].name:
      return _gridsome["default"];

    case _ember["default"].name:
      return _ember["default"];

    case _vuepress["default"].name:
      return _vuepress["default"];

    case _quasar["default"].name:
      return _quasar["default"];

    case _unibit["default"].name:
      return _unibit["default"];

    default:
      return _react["default"];
  }
}