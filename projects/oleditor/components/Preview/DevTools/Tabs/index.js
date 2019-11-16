import React from 'react';
import Tooltip from '@csb/common/lib/components/Tooltip';
import { Actions, Container, Tabs } from './elements';
import { DraggableTab, PaneTab } from './Tab/index';
import { TabDropZone } from './TabDropZone/index';
export const DevToolTabs = ({ panes, views, hidden, currentPaneIndex, devToolIndex, owned, setPane, moveTab, closeTab, status, }) => {
    const currentPane = views[panes[currentPaneIndex].id];
    const actions = typeof currentPane.actions === 'function'
        ? currentPane.actions({ owned })
        : currentPane.actions;
    const TypedTabDropZone = TabDropZone;
    return (<Container>
      <Tabs>
        {panes.map((pane, i) => {
        const active = !hidden && i === currentPaneIndex;
        const view = views[pane.id];
        const TypedTab = (moveTab
            ? DraggableTab
            : PaneTab);
        /* eslint-disable react/no-array-index-key */
        return (<TypedTab canDrag={panes.length !== 1} pane={view} options={pane.options || {}} active={active} onMouseDown={e => {
            e.stopPropagation();
        }} onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setPane(i);
        }} devToolIndex={devToolIndex} moveTab={moveTab} closeTab={pane.closeable && panes.length !== 1 ? closeTab : undefined} index={i} key={i} status={status
            ? status[pane.id] || { unread: 0, type: 'info' }
            : undefined}/>);
    })}



        {moveTab && (<TypedTabDropZone index={panes.length} devToolIndex={devToolIndex} moveTab={moveTab}/>)}
      </Tabs>

      <Actions>
        {actions.map(({ title, onClick, Icon, disabled }) => (<Tooltip style={{
        pointerEvents: hidden ? 'none' : 'initial',
    }} content={title} key={title} delay={disabled ? [0, 0] : [500, 0]}>
            <Icon style={{
        // eslint-disable-next-line  no-nested-ternary
        opacity: hidden ? 0 : disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'initial',
    }} onClick={onClick} key={title}/>
          </Tooltip>))}
      </Actions>
    </Container>);
};
