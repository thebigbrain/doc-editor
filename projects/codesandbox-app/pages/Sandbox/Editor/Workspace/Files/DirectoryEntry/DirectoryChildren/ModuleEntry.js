import React from 'react'
// eslint-disable-next-line import/extensions
import getType from '~/utils/get-type'
import validateTitle from '../validateTitle'
import Entry from '../Entry/index'
import { useOvermind } from '@muggle/hooks'

export default function ModuleEntry(props) {
  const { state } = useOvermind();

  const validateTitle = (id, title) => {
    const { directories, modules } = state.editor.currentSandbox
    return !!validateTitle(id, title, [...directories, ...modules])
  }

  const {
    module,
    setCurrentModule,
    markTabsNotDirty,
    depth,
    renameModule,
    deleteEntry,
    discardModuleChanges,
    getModulePath,
  } = props

  const { currentModuleShortid } = state.editor
  const mainModuleId = state.editor.mainModule.id

  const isActive = module.shortid === currentModuleShortid
  const isMainModule = module.id === mainModuleId
  const type = getType(module.title)

  const currentPath = getModulePath(module.id)

  const hasError = state.editor.errors.filter(
    error => error.path === currentPath,
  ).length

  const liveUsers = state.live.liveUsersByModule[module.shortid] || []

  const isNotSynced = state.editor.changedModuleShortids.includes(
    module.shortid,
  )

  return (
    <Entry
      id={module.id}
      shortid={module.shortid}
      title={module.title}
      rightColors={liveUsers.map(([a, b, c]) => `rgb(${a}, ${b}, ${c})`)}
      depth={depth + 1}
      active={isActive}
      type={type || 'function'}
      rename={renameModule}
      deleteEntry={deleteEntry}
      isNotSynced={isNotSynced}
      renameValidator={validateTitle}
      setCurrentModule={setCurrentModule}
      isMainModule={isMainModule}
      moduleHasError={hasError}
      markTabsNotDirty={markTabsNotDirty}
      discardModuleChanges={discardModuleChanges}
      getModulePath={getModulePath}
    />
  )
}