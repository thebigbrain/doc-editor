import React from 'react'
import { inject, observer } from 'app/componentConnectors'

import EntryIcons from 'app/pages/Sandbox/Editor/Workspace/Files/DirectoryEntry/Entry/EntryIcons'
// eslint-disable-next-line import/extensions
import getType from 'app/utils/get-type.ts'
import { getModulePath } from '@csb/common/lib/sandbox/modules'
import { saveAllModules } from 'app/store/modules/editor/utils'

import CrossIcon from 'react-icons/lib/md/clear'

import WorkspaceItem from '../WorkspaceItem/index'
import { EntryContainer } from '../elements'
import { CrossIconContainer, Dir, Title } from './elements'
import SaveIcon from './SaveIcon'

const OpenedTabs = ({ store, signals }) => {
  const sandbox = store.editor.currentSandbox
  const { currentModuleShortid } = store.editor
  const moduleObject = {}
  sandbox.modules.forEach(m => {
    moduleObject[m.shortid] = m
  })

  const openModules = store.editor.tabs
    .map(t => moduleObject[t.moduleShortid])
    .filter(x => x)

  return (
    <WorkspaceItem
      title="Open Tabs"
      actions={
        <SaveIcon
          disabled={store.editor.isAllModulesSynced}
          onClick={e => {
            if (e) {
              e.preventDefault()
              e.stopPropagation()
            }
            saveAllModules(store, signals)
          }}
        />
      }
    >
      {openModules.map((m, i) => (
        <EntryContainer
          onClick={() => {
            signals.editor.moduleSelected({ id: m.id })
          }}
          active={currentModuleShortid === m.shortid}
          key={m.id}
        >
          <EntryIcons
            isNotSynced={m.isNotSynced}
            type={getType(m.title)}
            error={m.errors && m.errors.length > 0}
          />
          <Title>{m.title}</Title>
          <Dir>
            {getModulePath(sandbox.modules, sandbox.directories, m.id)
              .replace('/', '')
              .replace(new RegExp(m.title + '$'), '')}
          </Dir>
          {currentModuleShortid !== m.shortid && (
            <CrossIconContainer
              onClick={e => {
                if (e) {
                  e.preventDefault()
                  e.stopPropagation()
                }

                signals.editor.tabClosed({ tabIndex: i })
              }}
            >
              <CrossIcon/>
            </CrossIconContainer>
          )}
        </EntryContainer>
      ))}
    </WorkspaceItem>
  )
}

export default inject('signals', 'store')(observer(OpenedTabs))
