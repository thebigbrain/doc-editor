export class LoginStatus {
  static NONE = null;
  static LOGGING = {code: 'logging', message: '登录中...'};
  static SUCCESS = {code: 'success', message: '已登录'};
  static FAILED = {code: 'error', message: '登录失败'};
}
