import React from 'react'
import {MdSave as SaveIcon} from 'react-icons/md'
// import {saveAllModules} from 'app/store/modules/editor/utils'
import {Action} from './Action/index'
import {useOvermind} from '~/overmind'

export const SaveAllButton = () => {
  const {state, actions} = useOvermind()
  const {
    editor: {isAllModulesSynced, changedModuleShortids},
  } = state

  return (
    <Action
      onClick={
        isAllModulesSynced ? null : () => saveAllModules(state, actions)
      }
      placeholder={isAllModulesSynced ? 'All modules are saved' : false}
      blink={changedModuleShortids.length > 2}
      title="Save"
      Icon={SaveIcon}
    />
  )
}
