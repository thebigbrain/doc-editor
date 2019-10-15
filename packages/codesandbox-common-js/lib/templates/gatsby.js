import Template from './template';
import { decorateSelector } from '../theme';
import configurations from './configuration';
class GatsbyTemplate extends Template {
    getViews() {
        const GATSBY_VIEWS = [
            {
                views: [
                    { id: 'codesandbox.browser' },
                    {
                        id: 'codesandbox.browser',
                        closeable: true,
                        options: {
                            url: '/___graphql',
                            title: 'GraphiQL',
                        },
                    },
                ],
            },
            {
                open: true,
                views: [
                    { id: 'codesandbox.terminal' },
                    { id: 'codesandbox.console' },
                    { id: 'codesandbox.problems' },
                ],
            },
        ];
        return GATSBY_VIEWS;
    }
}
export default new GatsbyTemplate('gatsby', 'Gatsby', 'https://www.gatsbyjs.org/', 'github/gatsbyjs/gatsby-starter-default', decorateSelector(() => '#8C65B3'), {
    extraConfigurations: {
        '/.babelrc': configurations.babelrc,
    },
    distDir: 'public',
    isServer: true,
    mainFile: ['/src/pages/index.js'],
    showOnHomePage: true,
    main: true,
    popular: true,
    showCube: false,
});
