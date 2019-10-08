import { Page } from '@doce/core'
import UserList from 'components/UserList'

const PageConfig = {
  path: '/app/users',
  component: UserList,
  props: {},
  i18n: {},
}

Page.newInstance(PageConfig)
