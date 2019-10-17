import React from 'react'
import {Alert} from '~/components/Alert'
import {useOvermind} from '@muggle/hooks'

function DeleteDeploymentModal() {
  const {actions} = useOvermind()

  return (
    <Alert
      title="Delete Deployment"
      body={<span>Are you sure you want to delete this Deployment?</span>}
      onCancel={() => actions.modalClosed()}
      onConfirm={() => actions.deployment.deleteDeployment()}
    />
  )
}

export default DeleteDeploymentModal
