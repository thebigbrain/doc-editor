import React from 'react'
import { sandboxUrl } from '@csb/common/lib/utils/url-generator'

import history from '~/utils/history'
import { NewSandboxModal } from '~/pages/Dashboard/Content/CreateNewSandbox/NewSandboxModal'

export default ({ closeModal }) => (
  <NewSandboxModal
    createSandbox={template => {
      history.push(sandboxUrl({ id: template.shortid }))
      closeModal()
    }}
    closeOnCreate
    width={925}
  />
);
