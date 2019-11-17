import React from 'react';

import folderSvg from '@csb/common/lib/components/icons/folder.svg'
import folderOpenSvg from '@csb/common/lib/components/icons/folder-open.svg'
import fileSvg from '@csb/common/lib/components/icons/file.svg'
import imageSvg from '@csb/common/lib/components/icons/image.svg'
import codesandboxSvg from '@csb/common/lib/components/icons/codesandbox.svg'
import nowSvg from '@csb/common/lib/components/icons/now.svg'

import { SVGIcon } from './elements'

function getIcon(type) {
  const base =
    'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons'

  let icon

  switch (type) {
    case 'codesandbox':
      icon = codesandboxSvg
      break

    case 'image':
      icon = imageSvg
      break

    case 'now':
      icon = nowSvg
      break

    case 'directory':
      icon = folderSvg
      break

    case 'directory-open':
      icon = folderOpenSvg
      break

    default:
      icon = (props) => <SVGIcon {...props} url={`${base}/${type}.svg`}/>
  }

  try {
    return icon
  } catch (_) {
    return fileSvg
  }
}

export default getIcon
