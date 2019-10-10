import React from 'react'
import { Alert } from '~/components/Alert'
import {useOvermind} from '~/hooks'


function DeleteProfileSandboxModal() {
  const {actions: signals} = useOvermind()

  return (
    <Alert
      title="Delete Sandbox"
      body={<span>Are you sure you want to delete this sandbox?</span>}
      onCancel={() => signals.modalClosed()}
      onConfirm={() => signals.profile.sandboxDeleted()}
    />
  )
}

export default DeleteProfileSandboxModal
