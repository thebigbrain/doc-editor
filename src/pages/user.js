import Page from 'base/page';
import handlers from 'base/handler';
import Login from 'components/Login/Login';
import { LoginStatus } from 'base/const';

async function onLogin(values) {
  const h = handlers.get('login');
  const r = await h(values.username, values.password);
  if (r.hasError()) {
    pageLogin.setState({'status': LoginStatus.FAILED});
  } else {
    pageLogin.setState({'status': LoginStatus.SUCCESS});
  }
}

const pageLogin = Page.newInstance({
  path: '/user/login',
  component: Login,
  props: {
    onLogin,
    status: LoginStatus.NONE
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
