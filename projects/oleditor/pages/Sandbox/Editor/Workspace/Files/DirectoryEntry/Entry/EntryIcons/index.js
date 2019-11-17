import React, { Component } from 'react'

import { ErrorIcon } from '@muggle/icons';

import { RedIcon } from './elements'
import getIcon from './GetIconURL'


function EntryIcon({
  type,
  width = 16,
  height = 16,
  error,
}) {
  const Icon = getIcon(type);

  return (
    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {
        error ? (
          <RedIcon>
            <ErrorIcon width={width} height={height} />
          </RedIcon>
        ) : <Icon width={width} height={height} />
      }
    </div>
  )
}

export default EntryIcon
