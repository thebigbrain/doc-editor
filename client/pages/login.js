import { Page } from '@doce/core'
import { connect } from '@doce/livequery/client'
import Login from 'components/User/Login'

const component = connect({
  service: 'users',
  optimization: {},
})(Login)

const PageConfig = {
  path: '/user/login',
  component,
  props: {},
  i18n: {},
}

Page.newInstance(PageConfig)
