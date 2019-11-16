import React from 'react'
import EntryIcons from '~/pages/Sandbox/Editor/Workspace/Files/DirectoryEntry/Entry/EntryIcons'
// eslint-disable-next-line import/extensions
import getType from '~/utils/get-type'

import { StyledNotSyncedIcon } from './elements'
import { StyledCloseIcon, TabDir, TabTitle } from '../Tab/elements'
import TabContainer from '../TabContainer/index'

export default class ModuleTab extends React.PureComponent {
  setCurrentModule = () => {
    this.props.setCurrentModule(this.props.module.id)
  }

  renderTabStatus = (hovering, closeTab) => {
    const { isNotSynced, tabCount } = this.props

    if (hovering && isNotSynced && tabCount === 1) {
      return <StyledNotSyncedIcon show="true"/>
    }
    if (hovering && isNotSynced && tabCount > 1) {
      return <StyledCloseIcon onClick={closeTab} show="true"/>
    }
    if (hovering && tabCount === 1) {
      return <StyledCloseIcon onClick={closeTab} show={undefined}/>
    }
    if (hovering && tabCount > 1) {
      return <StyledCloseIcon onClick={closeTab} show="true"/>
    }
    if (!hovering && isNotSynced) {
      return <StyledNotSyncedIcon show="true"/>
    }
    if (!hovering && !isNotSynced) {
      return <StyledNotSyncedIcon show={undefined}/>
    }
    return <StyledNotSyncedIcon show={undefined}/>
  }

  render() {
    const { module, dirName, hasError, isNotSynced, ...props } = this.props

    return (
      <TabContainer
        onClick={this.setCurrentModule}
        onDoubleClick={this.props.markNotDirty}
        items={
          isNotSynced
            ? [
              {
                title: 'Discard Changes',
                action: () => {
                  this.props.discardModuleChanges(this.props.module.shortid)
                  return true
                },
              },
            ]
            : []
        }
        {...props}
      >
        {({ hovering, closeTab }) => (
          <>
            <EntryIcons
              isNotSynced={isNotSynced}
              type={getType(module.title)}
              error={hasError}
            />
            <TabTitle>{module.title}</TabTitle>
            {dirName && <TabDir>../{dirName}</TabDir>}

            {this.renderTabStatus(hovering, closeTab)}
          </>
        )}
      </TabContainer>
    )
  }
}
