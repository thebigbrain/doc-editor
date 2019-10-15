"use strict";
exports.__esModule = true;
var adonis_1 = require("./adonis");
exports.adonis = adonis_1["default"];
var angular_1 = require("./angular");
exports.angular = angular_1["default"];
var babel_1 = require("./babel");
exports.babel = babel_1["default"];
var parcel_1 = require("./parcel");
exports.parcel = parcel_1["default"];
var preact_1 = require("./preact");
exports.preact = preact_1["default"];
var reason_1 = require("./reason");
exports.reason = reason_1["default"];
var react_1 = require("./react");
exports.react = react_1["default"];
var react_ts_1 = require("./react-ts");
exports.reactTs = react_ts_1["default"];
var svelte_1 = require("./svelte");
exports.svelte = svelte_1["default"];
var vue_1 = require("./vue");
exports.vue = vue_1["default"];
var ember_1 = require("./ember");
exports.ember = ember_1["default"];
var cxjs_1 = require("./cxjs");
exports.cxjs = cxjs_1["default"];
var dojo_1 = require("./dojo");
exports.dojo = dojo_1["default"];
var custom_1 = require("./custom");
exports.custom = custom_1["default"];
var gatsby_1 = require("./gatsby");
exports.gatsby = gatsby_1["default"];
var marko_1 = require("./marko");
exports.marko = marko_1["default"];
var nuxt_1 = require("./nuxt");
exports.nuxt = nuxt_1["default"];
var next_1 = require("./next");
exports.next = next_1["default"];
var node_1 = require("./node");
exports.node = node_1["default"];
var apollo_server_1 = require("./apollo-server");
exports.apollo = apollo_server_1["default"];
var sapper_1 = require("./sapper");
exports.sapper = sapper_1["default"];
var nest_1 = require("./nest");
exports.nest = nest_1["default"];
var static_1 = require("./static");
exports.staticTemplate = static_1["default"];
var styleguidist_1 = require("./styleguidist");
exports.styleguidist = styleguidist_1["default"];
var gridsome_1 = require("./gridsome");
exports.gridsome = gridsome_1["default"];
var vuepress_1 = require("./vuepress");
exports.vuepress = vuepress_1["default"];
var mdx_deck_1 = require("./mdx-deck");
exports.mdxDeck = mdx_deck_1["default"];
var quasar_1 = require("./quasar");
exports.quasar = quasar_1["default"];
var unibit_1 = require("./unibit");
exports.unibit = unibit_1["default"];
function getDefinition(theme) {
    switch (theme) {
        case adonis_1["default"].name:
            return adonis_1["default"];
        case react_1["default"].name:
            return react_1["default"];
        case vue_1["default"].name:
            return vue_1["default"];
        case preact_1["default"].name:
            return preact_1["default"];
        case react_ts_1["default"].name:
            return react_ts_1["default"];
        case svelte_1["default"].name:
            return svelte_1["default"];
        case angular_1["default"].name:
            return angular_1["default"];
        case parcel_1["default"].name:
            return parcel_1["default"];
        case babel_1["default"].name:
            return babel_1["default"];
        case cxjs_1["default"].name:
            return cxjs_1["default"];
        case dojo_1["default"].name:
            return dojo_1["default"];
        case custom_1["default"].name:
            return custom_1["default"];
        case gatsby_1["default"].name:
            return gatsby_1["default"];
        case marko_1["default"].name:
            return marko_1["default"];
        case nuxt_1["default"].name:
            return nuxt_1["default"];
        case next_1["default"].name:
            return next_1["default"];
        case reason_1["default"].name:
            return reason_1["default"];
        case node_1["default"].name:
            return node_1["default"];
        case apollo_server_1["default"].name:
            return apollo_server_1["default"];
        case sapper_1["default"].name:
            return sapper_1["default"];
        case nest_1["default"].name:
            return nest_1["default"];
        case static_1["default"].name:
            return static_1["default"];
        case styleguidist_1["default"].name:
            return styleguidist_1["default"];
        case mdx_deck_1["default"].name:
            return mdx_deck_1["default"];
        case gridsome_1["default"].name:
            return gridsome_1["default"];
        case ember_1["default"].name:
            return ember_1["default"];
        case vuepress_1["default"].name:
            return vuepress_1["default"];
        case quasar_1["default"].name:
            return quasar_1["default"];
        case unibit_1["default"].name:
            return unibit_1["default"];
        default:
            return react_1["default"];
    }
}
exports["default"] = getDefinition;
