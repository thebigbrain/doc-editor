import * as React from 'react'
import { inject, observer } from 'app/componentConnectors'
import { sortBy } from 'lodash-es'
import { HIDDEN_DIRECTORIES } from '@codesandbox/common/lib/templates/constants/files'
import validateTitle from '../validateTitle'
import ModuleEntry from './ModuleEntry'
import DirectoryEntry from '../index'

class DirectoryChildren extends React.Component {
  validateTitle = (id, title) => {
    const { directories, modules } = this.props.store.editor.currentSandbox
    return !!validateTitle(id, title, [...directories, ...modules])
  }

  render() {
    const {
      depth = 0,
      renameModule,
      setCurrentModule,
      parentShortid,
      deleteEntry,
      isInProjectView,
      markTabsNotDirty,
      store,
      discardModuleChanges,
      getModulePath,
    } = this.props

    const {
      id: sandboxId,
      modules,
      directories,
      template: sandboxTemplate,
    } = store.editor.currentSandbox
    const {
      mainModule,
      currentModuleShortid,
      errors,
      corrections,
    } = store.editor
    const mainModuleId = mainModule.id

    return (
      <div>
        {sortBy(directories, 'title')
          .filter(x => x.directoryShortid === parentShortid)
          .filter(
            x =>
              !(
                x.directoryShortid == null &&
                HIDDEN_DIRECTORIES.includes(x.title)
              ),
          )
          .map(dir => (
            <DirectoryEntry
              key={dir.id}
              siblings={[...directories, ...modules]}
              depth={depth + 1}
              signals={
                this.props
                  .signals /* TODO: Just pass what is needed by the DragDrop */
              }
              id={dir.id}
              shortid={dir.shortid}
              title={dir.title}
              sandboxId={sandboxId}
              sandboxTemplate={sandboxTemplate}
              mainModuleId={mainModuleId}
              modules={modules}
              directories={directories}
              currentModuleShortid={currentModuleShortid}
              isInProjectView={isInProjectView}
              markTabsNotDirty={markTabsNotDirty}
              errors={errors}
              corrections={corrections}
              getModulePath={getModulePath}
            />
          ))}
        {sortBy(
          modules.filter(x => x.directoryShortid === parentShortid),
          'title',
        ).map(m => (
          <ModuleEntry
            key={m.id}
            module={m}
            depth={depth}
            setCurrentModule={setCurrentModule}
            markTabsNotDirty={markTabsNotDirty}
            renameModule={renameModule}
            deleteEntry={deleteEntry}
            discardModuleChanges={discardModuleChanges}
            getModulePath={getModulePath}
          />
        ))}
      </div>
    )
  }
}

export default inject('store', 'signals')(observer(DirectoryChildren))
