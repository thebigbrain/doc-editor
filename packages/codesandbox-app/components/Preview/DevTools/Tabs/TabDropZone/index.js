import * as React from 'react';
import styled, { css } from 'styled-components';
import { DropTarget } from 'react-dnd';
import { PREVIEW_TAB_ID } from '../Tab/index';
const DropZone = styled.div `
  width: 100%;
  height: 100%;

  cursor: grab;

  ${props => props.isOver
    ? css `
          background-color: ${props.theme['editorGroup.dropBackground'] ||
        'rgba(0, 0, 0, 0.3)'};
        `
    : ''};
`;
const TabDropZoneComponent = ({ connectDropTarget, isOver, }) => connectDropTarget(<div style={{
    flex: 'auto',
}}>
      <DropZone isOver={isOver}/>
    </div>);
const entryTarget = {
    drop: (props, monitor) => {
        if (monitor == null)
            return;
        const sourceItem = monitor.getItem();
        if (sourceItem == null) {
            return;
        }
        const previousPosition = {
            tabPosition: sourceItem.index,
            devToolIndex: sourceItem.devToolIndex,
        };
        const nextPosition = {
            tabPosition: props.index,
            devToolIndex: props.devToolIndex,
        };
        props.moveTab(previousPosition, nextPosition);
    },
    canDrop: (props, monitor) => {
        if (monitor == null)
            return false;
        const source = monitor.getItem();
        if (source == null)
            return false;
        return (props.index !== source.index || props.devToolIndex !== source.devToolIndex);
    },
};
const collectTarget = (connectMonitor, monitor) => ({
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connectMonitor.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
});
export const TabDropZone = DropTarget(PREVIEW_TAB_ID, entryTarget, collectTarget)(TabDropZoneComponent);
