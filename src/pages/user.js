import Page from 'base/page';
import User from 'components/Login/User';
import { LoginStatus } from 'base/const';

Page.newInstance({
  name: 'user',
  path: '/user',
  component: User,
  callbacks: {
    onLogin: 'login',
    onRegister: 'register'
  },
  props: {
    status: LoginStatus.NONE,
    routePath: {
      app: '/app',
      login: '/user/login',
      register: '/user/register',
      forget: '/user/forget'
    }
  },
  i18n: {
    register: '注册账户',
    login: '登录',
    forget: '忘记密码',
    remember: '自动登录',
    placeholder: {
      username: '用户名',
      password: '密码'
    }
  }
});
