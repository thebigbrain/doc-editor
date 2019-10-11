import React from 'react'
import {MdSettings as SettingsIcon} from 'react-icons/md'
import {Action} from './Action'
import {useOvermind} from '@lz/hooks'

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
