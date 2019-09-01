import {connect, Page} from '@doce/core'
import Config from "components/Config/Config"

const component = connect({
  service: 'Component'
})(Config)

const PageConfig = {
  path: '/app/config',
  component,
  props: {
  },
  i18n: {

  }
}

Page.newInstance(PageConfig)
