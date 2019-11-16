import React from 'react';
import { Action } from '../Action/index';
import { UpdateFound } from './UpdateFound/index';

export const RefreshButton = () => (
  <Action
    onClick={document.location.reload}
    Icon={UpdateFound}
    tooltip="Update Available! Click to Refresh."
  />
);
