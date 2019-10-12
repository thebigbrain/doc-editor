import Template from './template';
import { decorateSelector } from '../theme';
import configurations from './configuration';

export default new Template(
  'nuxt',
  'Nuxt.js',
  'https://nuxtjs.org/',
  'github/nuxt/codesandbox-nuxt',
  decorateSelector(() => '#3B8070'),
  {
    extraConfigurations: {
      '/.babelrc': configurations.babelrc,
    },
    distDir: 'dist',
    isServer: true,
    popular: true,
    mainFile: ['/pages/index.vue'],
    showOnHomePage: true,
    main: true,
    showCube: false,
  }
);
