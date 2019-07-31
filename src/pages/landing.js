import Page from 'base/page';
import Landing from 'components/Landing/Landing';

Page.newInstance('root', {
  path: '/',
  component: Landing,
  props: {
    accept: '/app',
    reject: '/user'
  }
});
