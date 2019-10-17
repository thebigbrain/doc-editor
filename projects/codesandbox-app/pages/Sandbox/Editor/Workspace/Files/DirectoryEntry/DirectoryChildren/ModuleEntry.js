import React from 'react'
// eslint-disable-next-line import/extensions
import getType from '~/utils/get-type'
import validateTitle from '../validateTitle'
import Entry from '../Entry/index'
import {withOvermind} from '@muggle/hooks'

class ModuleEntry extends React.Component {
  validateTitle = (id, title) => {
    const { directories, modules } = this.props.state.editor.currentSandbox
    return !!validateTitle(id, title, [...directories, ...modules])
  }

  render() {
    const {
      state,
      module,
      setCurrentModule,
      markTabsNotDirty,
      depth,
      renameModule,
      deleteEntry,
      discardModuleChanges,
      getModulePath,
    } = this.props
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
        renameValidator={this.validateTitle}
        setCurrentModule={setCurrentModule}
        isMainModule={isMainModule}
        moduleHasError={hasError}
        markTabsNotDirty={markTabsNotDirty}
        discardModuleChanges={discardModuleChanges}
        getModulePath={getModulePath}
      />
    )
  }
}

export default withOvermind(ModuleEntry)
