import React from 'react'
import {
  CrossIcon, AddFileIcon, AddFolderIcon, DownloadIcon, UploadFileIcon, EditIcon
} from '@muggle/icons'
import Tooltip from '@csb/common/lib/components/Tooltip'

import { Icon } from '../../../../elements'
import { Container } from './elements'

const handleClick = func => e => {
  e.preventDefault()
  e.stopPropagation()
  func()
}

export default function EditIcons({
  className,
  hovering,
  onDelete,
  onEdit,
  onCreateFile,
  onCreateDirectory,
  active,
  onUploadFile,
  onDownload,
  forceShow,
}) {
  // Phones need double click if we show elements on click, that's why we only want
  // to show these edit icons when the user clicks and hasn't activated the module
  if (window.__isTouch && !active && !forceShow) {
    return null
  }

  return (
    <div className={className}>
      {(hovering || (window.__isTouch && active) || forceShow) && (
        <Container>
          {onDownload && (
            <Tooltip content="Export to ZIP">
              <Icon onClick={handleClick(onDownload)}>
                <DownloadIcon />
              </Icon>
            </Tooltip>
          )}
          {onUploadFile && (
            <Tooltip content="Upload Files">
              <Icon onClick={handleClick(onUploadFile)}>
                <UploadFileIcon />
              </Icon>
            </Tooltip>
          )}
          {onEdit && (
            <Tooltip content="Rename">
              <Icon onClick={handleClick(onEdit)}>
                <EditIcon />
              </Icon>
            </Tooltip>
          )}
          {onCreateFile && (
            <Tooltip content="New File">
              <Icon onClick={handleClick(onCreateFile)}>
                <AddFileIcon />
              </Icon>
            </Tooltip>
          )}
          {onCreateDirectory && (
            <Tooltip content="New Directory">
              <Icon onClick={handleClick(onCreateDirectory)}>
                <AddFolderIcon />
              </Icon>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip content="Delete">
              <Icon onClick={handleClick(onDelete)}>
                <CrossIcon />
              </Icon>
            </Tooltip>
          )}
        </Container>
      )}
    </div>
  )
}
