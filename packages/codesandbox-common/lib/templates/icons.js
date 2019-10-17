"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getIcon;

var _templateIcons = require("@codesandbox/template-icons");

var _ = require(".");

function getIcon(theme) {
  switch (theme) {
    case _.adonis.name:
      return _templateIcons.AdonisIcon;

    case _.react.name:
      return _templateIcons.ReactIcon;

    case _.vue.name:
      return _templateIcons.VueIcon;

    case _.preact.name:
      return _templateIcons.PreactIcon;

    case _.reactTs.name:
      return _templateIcons.ReactIcon;

    case _.svelte.name:
      return _templateIcons.SvelteIcon;

    case _.angular.name:
      return _templateIcons.AngularIcon;

    case _.parcel.name:
      return _templateIcons.ParcelIcon;

    case _.dojo.name:
      return _templateIcons.DojoIcon;

    case _.ember.name:
      return _templateIcons.EmberIcon;

    case _.sapper.name:
      return _templateIcons.SapperIcon;

    case _.cxjs.name:
      return _templateIcons.CxJSIcon;

    case _.reason.name:
      return _templateIcons.ReasonIcon;

    case _.gatsby.name:
      return _templateIcons.GatsbyIcon;

    case _.marko.name:
      return _templateIcons.MarkoIcon;

    case _.next.name:
      return _templateIcons.NextIcon;

    case _.nuxt.name:
      return _templateIcons.NuxtIcon;

    case _.node.name:
      return _templateIcons.NodeIcon;

    case _.apollo.name:
      return _templateIcons.ApolloIcon;

    case _.nest.name:
      return _templateIcons.NestIcon;

    case _.staticTemplate.name:
      return _templateIcons.HTML5Icon;

    case _.styleguidist.name:
      return _templateIcons.StyleguidistIcon;

    case _.gridsome.name:
      return _templateIcons.GridsomeIcon;

    case _.vuepress.name:
      return _templateIcons.VuePressIcon;

    case _.mdxDeck.name:
      return _templateIcons.MDXDeckIcon;

    case _.quasar.name:
      return _templateIcons.QuasarIcon;

    case _.unibit.name:
      return _templateIcons.UnibitIcon;

    default:
      return _templateIcons.ReactIcon;
  }
}