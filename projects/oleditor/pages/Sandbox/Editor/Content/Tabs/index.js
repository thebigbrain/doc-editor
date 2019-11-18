import React, { useEffect, useRef } from 'react';

import { canPrettify } from '~/utils/prettify';
import Tooltip from '@csb/common/lib/components/Tooltip';

import TabContainer from './TabContainer/index';
import PreviewIcon from './PreviewIcon';

import { Container, IconContainer, IconWrapper, Line, StyledPrettierIcon, TabsContainer } from './elements';

import ModuleTab from './ModuleTab';
import { useOvermind } from '@muggle/hooks';


export default function EditorTabs(props) {
  const { state, actions } = useOvermind();
  let containerRef = useRef(null);

  const closeTab = tabIndex => {
    actions.editor.tabClosed({ tabIndex });
  };
  const moveTab = (prevIndex, nextIndex) => {
    actions.editor.tabMoved({ prevIndex, nextIndex });
  };
  /**
   * Mark all tabs not dirty (not cursive)
   */
  const markNotDirty = () => {
    actions.editor.moduleDoubleClicked();
  };
  const setCurrentModule = moduleId => {
    actions.editor.moduleSelected({ id: moduleId });
  };
  const discardModuleChanges = moduleShortid => {
    actions.editor.discardModuleChanges({ moduleShortid });
  };
  const prettifyModule = () => {
    actions.editor.prettifyClicked({
      moduleShortid: state.editor.currentModuleShortid,
    });
  };
  const wrappedCanPrettify = module => {
    if (!module) {
      return false;
    }

    return canPrettify(module.title);
  };

  let container = containerRef.current;
  let tabEls = {};

  useEffect(() => {
    const currentTab = tabEls[props.currentModuleId];

    // We need to scroll to the tab
    if (currentTab && container) {
      const { width } = container.getBoundingClientRect();
      const scroll = container.scrollLeft;
      const { left } = currentTab.getBoundingClientRect();

      if (left > scroll && left < scroll + width) {
        // if it's already in view
        return;
      }

      currentTab.scrollIntoView(false);
    }

  }, [props.currentModuleId]);

  const sandbox = state.editor.currentSandbox;
  const moduleObject = {};
  // We keep this object to keep track if there are duplicate titles.
  // In that case we need to show which directory the module is in.
  const tabNamesObject = {};

  sandbox.modules.forEach(m => {
    moduleObject[m.shortid] = m;
  });

  state.editor.tabs
    .filter(tab => tab.type === 'MODULE')
    .filter(tab => moduleObject[tab.moduleShortid])
    .forEach(tab => {
      const module = moduleObject[tab.moduleShortid];

      tabNamesObject[module.title] = tabNamesObject[module.title] || [];
      tabNamesObject[module.title].push(module.shortid);
    });

  const { currentTab } = state.editor;
  const { currentModule } = state.editor;

  const previewVisible = state.editor.previewWindowVisible;

  return (
    <Container>
      <TabsContainer
        ref={containerRef}
      >
        {state.editor.tabs
          .map(tab => ({ ...tab, module: moduleObject[tab.moduleShortid] }))
          .map((tab, i) => {
            if (tab.type === 'MODULE') {
              if (tab.module == null) {
                return null;
              }

              const { module } = tab;
              const modulesWithName = tabNamesObject[module.title];
              const { id } = tab.module;
              let dirName = null;

              if (
                modulesWithName.length > 1 &&
                module.directoryShortid != null
              ) {
                const dir = sandbox.directories.find(
                  d =>
                    d.shortid === module.directoryShortid &&
                    d.sourceId === module.sourceId,
                );

                if (dir) {
                  dirName = dir.title;
                }
              }

              return (
                <ModuleTab
                  setCurrentModule={setCurrentModule}
                  discardModuleChanges={discardModuleChanges}
                  active={
                    currentTab &&
                    currentTab.moduleShortid === tab.moduleShortid
                  }
                  key={id}
                  module={tab.module}
                  hasError={Boolean(
                    state.editor.errors.filter(error => error.moduleId === id)
                      .length,
                  )}
                  closeTab={closeTab}
                  moveTab={moveTab}
                  markNotDirty={markNotDirty}
                  dirName={dirName}
                  tabCount={state.editor.tabs.length}
                  position={i}
                  dirty={tab.dirty}
                  isNotSynced={Boolean(
                    state.editor.changedModuleShortids.includes(
                      tab.module.shortid,
                    ),
                  )}
                  ref={el => {
                    tabEls[id] = el;
                  }}
                />
              );
            }
            if (tab.type === 'DIFF') {
              return (
                <TabContainer
                  active={currentTab && currentTab.id === tab.id}
                  key={tab.id}
                  onClick={() =>
                    actions.editor.currentTabChanged({ tabId: tab.id })
                  }
                  closeTab={closeTab}
                  moveTab={moveTab}
                  tabCount={state.editor.tabs.length}
                  position={i}
                  dirty={tab.dirty}
                  ref={el => {
                    tabEls[tab.id] = el;
                  }}
                  title={`Diff: ${tab.titleA} - ${tab.titleB}`}
                />
              );
            }

            return null;
          })}
      </TabsContainer>

      <IconContainer>
        <Tooltip
          style={{ display: 'inline-flex', alignItems: 'center' }}
          content="Prettify"
        >
          <StyledPrettierIcon
            disabled={!wrappedCanPrettify(currentModule)}
            onClick={prettifyModule}
          />
        </Tooltip>
        <Line/>

        <Tooltip content={previewVisible ? 'Hide Browser' : 'Show Browser'}>
          <IconWrapper active={previewVisible}>
            <PreviewIcon
              onClick={() =>
                actions.editor.togglePreviewContent({})
              }
            />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
    </Container>
  );
}
