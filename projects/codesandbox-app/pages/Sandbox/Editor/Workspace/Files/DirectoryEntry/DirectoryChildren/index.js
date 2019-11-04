import * as React from 'react'
import { sortBy } from 'lodash-es'
import { HIDDEN_DIRECTORIES } from '@csb/common/lib/templates/constants/files'

import validateTitle from '../validateTitle'
import ModuleEntry from './ModuleEntry'
import DirectoryEntry from '../index'
import {withOvermind} from '@muggle/hooks'

class DirectoryChildren extends React.Component {
  validateTitle = (id, title) => {
    const { directories, modules } = this.props.state.editor.currentSandbox
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
      overmind: {state},
      discardModuleChanges,
      getModulePath,
    } = this.props

    const {
      id: sandboxId,
      modules = [],
      directories,
      template: sandboxTemplate,
    } = state.editor.currentSandbox
    const {
      mainModule,
      currentModuleShortid,
      errors,
      corrections,
    } = state.editor
    const mainModuleId = mainModule && mainModule.id

    return (
      <div>
        {sortBy(directories, 'title')
          .filter(x => x.directory_shortid === parentShortid)
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
                this.props.overmind.actions /* TODO: Just pass what is needed by the DragDrop */
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
          modules.filter(x => x.directory_shortid === parentShortid),
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

export default withOvermind(DirectoryChildren)
