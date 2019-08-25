import {Page} from '@doce/core'
import Config from "components/Config/Config"

const PageConfig = {
  path: '/app/config',
  component: Config,
  props: {
  },
  i18n: {

  }
}

Page.newInstance(PageConfig)
