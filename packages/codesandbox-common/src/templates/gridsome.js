import Template from './template'
import {decorateSelector} from '../theme'

class GridsomeTemplate extends Template {
  getViews() {
    const GRIDSOME_VIEWS = [
      {
        views: [
          {id: 'codesandbox.browser'},
          {
            id: 'codesandbox.browser',
            closeable: true,
            options: {
              url: '/___explore',
              title: 'GraphiQL',
            },
          },
        ],
      },
      {
        open: true,
        views: [
          {id: 'codesandbox.terminal'},
          {id: 'codesandbox.console'},
          {id: 'codesandbox.problems'},
        ],
      },
    ]
    return GRIDSOME_VIEWS
  }
}

export default new GridsomeTemplate('gridsome', 'Gridsome', 'https://gridsome.org/', 'github/SaraVieira/gridsome-starter-codesandbox', decorateSelector(() => '#00a672'), {
  distDir: 'dist',
  isServer: true,
  mainFile: ['/src/pages/Index.vue'],
  showOnHomePage: true,
  main: true,
})
