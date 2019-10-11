import React from 'react';
import {GoPlus as PlusIcon} from 'react-icons/go';
import { Action } from './Action/index';
import {useOvermind} from '@lz/hooks'

export const NewSandboxButton = () => {
  const {actions: { modalOpened }} = useOvermind()

  return (
    <Action
      onClick={() => modalOpened({ modal: 'newSandbox' })}
      tooltip="New Sandbox"
      Icon={PlusIcon}
    />
  )
}

