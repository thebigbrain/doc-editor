import React from 'react'
import {Alert} from '~/components/Alert'
import {useOvermind} from '@doce/hooks'

function DeleteSandboxModal({ signals }) {
  const {actions} = useOvermind()

  return (
    <Alert
      title="Delete Sandbox"
      body={<span>Are you sure you want to delete this sandbox?</span>}
      onCancel={() => actions.modalClosed()}
      onConfirm={() => actions.workspace.sandboxDeleted()}
    />
  )
}

export default DeleteSandboxModal
