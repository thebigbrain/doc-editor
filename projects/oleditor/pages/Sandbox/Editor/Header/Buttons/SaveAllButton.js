import React from 'react'
import {SaveIcon} from '@muggle/icons'
import {Action} from './Action/index'
import {useOvermind} from '@muggle/hooks'

export const SaveAllButton = () => {
  const {state, actions} = useOvermind()
  const {
    editor: {isAllModulesSynced, changedModuleShortids},
  } = state

  return (
    <Action
      onClick={
        isAllModulesSynced ? null : () => actions.editor.saveAllModules()
      }
      placeholder={isAllModulesSynced ? 'All modules are saved' : false}
      blink={changedModuleShortids.length > 2}
      title="Save"
      Icon={SaveIcon}
    />
  )
}
