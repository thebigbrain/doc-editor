import React from 'react'
import {MdSettings as SettingsIcon} from 'react-icons/md'
import {Action} from './Action/index'
import {useOvermind} from '@muggle/hooks'

export const PreferencesButton = () => {
  const {actions: {modalOpened}} = useOvermind()

  return (
    <Action
      onClick={() => modalOpened({modal: 'preferences'})}
      tooltip="Preferences"
      Icon={SettingsIcon}
    />
  )
}
