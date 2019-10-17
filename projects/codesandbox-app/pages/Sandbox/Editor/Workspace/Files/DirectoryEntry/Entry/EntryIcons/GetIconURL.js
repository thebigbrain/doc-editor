import folderSvg from '@csb/common/lib/components/icons/folder.svg'
import folderOpenSvg from '@csb/common/lib/components/icons/folder-open.svg'
import fileSvg from '@csb/common/lib/components/icons/file.svg'
import imageSvg from '@csb/common/lib/components/icons/image.svg'
import codesandboxSvg from '@csb/common/lib/components/icons/codesandbox.svg'
import nowSvg from '@csb/common/lib/components/icons/now.svg'

function imageExists(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })
}

async function getIconURL(type) {
  const base =
    'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons'

  let url

  switch (type) {
    case 'codesandbox':
      url = codesandboxSvg
      break

    case 'image':
      url = imageSvg
      break

    case 'now':
      url = nowSvg
      break

    case 'directory':
      url = folderSvg
      break

    case 'directory-open':
      url = folderOpenSvg
      break

    default:
      url = `${base}/${type}.svg`
  }

  try {
    await imageExists(url)

    return url
  } catch (_) {
    return fileSvg
  }
}

export default getIconURL
