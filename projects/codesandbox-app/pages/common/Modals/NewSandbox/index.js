import React from 'react'
import history from '~/utils/history'
import { sandboxUrl } from '@csb/common/lib/utils/url-generator'
import { NewSandboxModal } from '../../../Dashboard/Content/CreateNewSandbox/NewSandboxModal/index'

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
