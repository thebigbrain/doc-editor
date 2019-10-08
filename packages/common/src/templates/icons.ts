import {
  AdonisIcon,
  AngularIcon,
  ApolloIcon,
  CxJSIcon,
  DojoIcon,
  EmberIcon,
  GatsbyIcon,
  GridsomeIcon,
  HTML5Icon,
  MarkoIcon,
  MDXDeckIcon,
  NestIcon,
  NextIcon,
  NodeIcon,
  NuxtIcon,
  ParcelIcon,
  PreactIcon,
  QuasarIcon,
  ReactIcon,
  ReasonIcon,
  SapperIcon,
  StyleguidistIcon,
  SvelteIcon,
  UnibitIcon,
  VueIcon,
  VuePressIcon,
} from '@codesandbox/template-icons';

import {
  adonis,
  angular,
  apollo,
  cxjs,
  dojo,
  ember,
  gatsby,
  gridsome,
  marko,
  mdxDeck,
  nest,
  next,
  node,
  nuxt,
  parcel,
  preact,
  quasar,
  react,
  reactTs,
  reason,
  sapper,
  staticTemplate,
  styleguidist,
  svelte,
  TemplateType,
  unibit,
  vue,
  vuepress,
} from '.';

export type ReturnedIcon = React.SFC<{
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

export default function getIcon(theme: TemplateType): ReturnedIcon {
  switch (theme) {
    case adonis.name:
      return AdonisIcon;
    case react.name:
      return ReactIcon;
    case vue.name:
      return VueIcon;
    case preact.name:
      return PreactIcon;
    case reactTs.name:
      return ReactIcon;
    case svelte.name:
      return SvelteIcon;
    case angular.name:
      return AngularIcon;
    case parcel.name:
      return ParcelIcon;
    case dojo.name:
      return DojoIcon;
    case ember.name:
      return EmberIcon;
    case sapper.name:
      return SapperIcon;
    case cxjs.name:
      return CxJSIcon;
    case reason.name:
      return ReasonIcon;
    case gatsby.name:
      return GatsbyIcon;
    case marko.name:
      return MarkoIcon;
    case next.name:
      return NextIcon;
    case nuxt.name:
      return NuxtIcon;
    case node.name:
      return NodeIcon;
    case apollo.name:
      return ApolloIcon;
    case nest.name:
      return NestIcon;
    case staticTemplate.name:
      return HTML5Icon;
    case styleguidist.name:
      return StyleguidistIcon;
    case gridsome.name:
      return GridsomeIcon;
    case vuepress.name:
      return VuePressIcon;
    case mdxDeck.name:
      return MDXDeckIcon;
    case quasar.name:
      return QuasarIcon;
    case unibit.name:
      return UnibitIcon;
    default:
      return ReactIcon;
  }
}
