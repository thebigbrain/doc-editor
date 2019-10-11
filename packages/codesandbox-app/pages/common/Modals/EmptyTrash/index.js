import React from 'react'
import { Alert } from '~/components/Alert'
import { permanentlyDeleteSandboxes } from '../../../Dashboard/queries'
import {useOvermind} from '@doce/hooks'


function EmptyTrash() {
  const {state: store, actions: signals} = useOvermind()

  return (
    <Alert
      title="Empty Trash"
      body={
        <span>
          Are you sure you want to permanently delete all the sandboxes in the
          trash?
        </span>
      }
      onCancel={() => signals.modalClosed()}
      onConfirm={async () => {
        await permanentlyDeleteSandboxes(store.dashboard.trashSandboxIds)
        signals.modalClosed()
      }}
    />
  )
}

export default EmptyTrash
