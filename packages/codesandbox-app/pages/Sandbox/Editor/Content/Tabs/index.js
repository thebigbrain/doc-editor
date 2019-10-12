import React from 'react'

import { canPrettify } from '~/utils/prettify'
import Tooltip from '@codesandbox/common/lib/components/Tooltip'

import TabContainer from './TabContainer/index'
import PreviewIcon from './PreviewIcon'

import { Container, IconContainer, IconWrapper, Line, StyledPrettierIcon, TabsContainer } from './elements'

import ModuleTab from './ModuleTab'
import {withOvermind} from '~/overmind'


class EditorTabs extends React.Component {
  closeTab = tabIndex => {
    this.props.signals.editor.tabClosed({ tabIndex })
  }
  moveTab = (prevIndex, nextIndex) => {
    this.props.signals.editor.tabMoved({ prevIndex, nextIndex })
  }
  /**
   * Mark all tabs not dirty (not cursive)
   */
  markNotDirty = () => {
    this.props.signals.editor.moduleDoubleClicked()
  }
  setCurrentModule = moduleId => {
    this.props.signals.editor.moduleSelected({ id: moduleId })
  }
  discardModuleChanges = moduleShortid => {
    this.props.signals.editor.discardModuleChanges({ moduleShortid })
  }
  prettifyModule = () => {
    this.props.signals.editor.prettifyClicked({
      moduleShortid: this.props.store.editor.currentModuleShortid,
    })
  }
  canPrettify = module => {
    if (!module) {
      return false
    }

    return canPrettify(module.title)
  }
  container
  tabEls = {}

  componentDidUpdate(prevProps) {
    if (this.props.currentModuleId !== prevProps.currentModuleId) {
      const currentTab = this.tabEls[this.props.currentModuleId]

      // We need to scroll to the tab
      if (currentTab && this.container) {
        const { width } = this.container.getBoundingClientRect()
        const scroll = this.container.scrollLeft
        const { left } = currentTab.getBoundingClientRect()

        if (left > scroll && left < scroll + width) {
          // if it's already in view
          return
        }

        currentTab.scrollIntoView(false)
      }
    }
  }

  render() {
    const { state: store, actions: signals } = this.props.overmind
    const sandbox = store.editor.currentSandbox
    const moduleObject = {}
    // We keep this object to keep track if there are duplicate titles.
    // In that case we need to show which directory the module is in.
    const tabNamesObject = {}

    sandbox.modules.forEach(m => {
      moduleObject[m.shortid] = m
    })

    store.editor.tabs
      .filter(tab => tab.type === 'MODULE')
      .filter(tab => moduleObject[tab.moduleShortid])
      .forEach(tab => {
        const module = moduleObject[tab.moduleShortid]

        tabNamesObject[module.title] = tabNamesObject[module.title] || []
        tabNamesObject[module.title].push(module.shortid)
      })

    const { currentTab } = store.editor
    const { currentModule } = store.editor

    const previewVisible = store.editor.previewWindowVisible

    return (
      <Container>
        <TabsContainer
          ref={el => {
            this.container = el
          }}
        >
          {store.editor.tabs
            .map(tab => ({ ...tab, module: moduleObject[tab.moduleShortid] }))
            .map((tab, i) => {
              if (tab.type === 'MODULE') {
                if (tab.module == null) {
                  return null
                }

                const { module } = tab
                const modulesWithName = tabNamesObject[module.title]
                const { id } = tab.module
                let dirName = null

                if (
                  modulesWithName.length > 1 &&
                  module.directoryShortid != null
                ) {
                  const dir = sandbox.directories.find(
                    d =>
                      d.shortid === module.directoryShortid &&
                      d.sourceId === module.sourceId,
                  )

                  if (dir) {
                    dirName = dir.title
                  }
                }

                return (
                  <ModuleTab
                    setCurrentModule={this.setCurrentModule}
                    discardModuleChanges={this.discardModuleChanges}
                    active={
                      currentTab &&
                      currentTab.moduleShortid === tab.moduleShortid
                    }
                    key={id}
                    module={tab.module}
                    hasError={Boolean(
                      store.editor.errors.filter(error => error.moduleId === id)
                        .length,
                    )}
                    closeTab={this.closeTab}
                    moveTab={this.moveTab}
                    markNotDirty={this.markNotDirty}
                    dirName={dirName}
                    tabCount={store.editor.tabs.length}
                    position={i}
                    dirty={tab.dirty}
                    isNotSynced={Boolean(
                      store.editor.changedModuleShortids.includes(
                        tab.module.shortid,
                      ),
                    )}
                    ref={el => {
                      this.tabEls[id] = el
                    }}
                  />
                )
              }
              if (tab.type === 'DIFF') {
                return (
                  <TabContainer
                    active={currentTab && currentTab.id === tab.id}
                    key={tab.id}
                    onClick={() =>
                      signals.editor.currentTabChanged({ tabId: tab.id })
                    }
                    closeTab={this.closeTab}
                    moveTab={this.moveTab}
                    tabCount={store.editor.tabs.length}
                    position={i}
                    dirty={tab.dirty}
                    ref={el => {
                      this.tabEls[tab.id] = el
                    }}
                    title={`Diff: ${tab.titleA} - ${tab.titleB}`}
                  />
                )
              }

              return null
            })}
        </TabsContainer>

        <IconContainer>
          <Tooltip
            style={{ display: 'inline-flex', alignItems: 'center' }}
            content="Prettify"
          >
            <StyledPrettierIcon
              disabled={!this.canPrettify(currentModule)}
              onClick={this.prettifyModule}
            />
          </Tooltip>
          <Line/>

          <Tooltip content={previewVisible ? 'Hide Browser' : 'Show Browser'}>
            <IconWrapper active={previewVisible}>
              <PreviewIcon
                onClick={() =>
                  this.props.signals.editor.togglePreviewContent({})
                }
              />
            </IconWrapper>
          </Tooltip>
        </IconContainer>
      </Container>
    )
  }
}

export default withOvermind(EditorTabs)
