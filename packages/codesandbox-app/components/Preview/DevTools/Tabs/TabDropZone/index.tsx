import * as React from 'react';
import styled, { css } from 'styled-components';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';

import { ITabPosition } from '../index';
import { PREVIEW_TAB_ID } from '../Tab/index';

const DropZone = styled.div<{ isOver: boolean }>`
  width: 100%;
  height: 100%;

  cursor: grab;

  ${props =>
  props.isOver
    ? css`
          background-color: ${props.theme['editorGroup.dropBackground'] ||
    'rgba(0, 0, 0, 0.3)'};
        `
    : ''};
`;

export interface TabDropZoneProps {
  moveTab: (currentPosition: ITabPosition, nextPosition: ITabPosition) => void;
  index: number;
  devToolIndex: number;
}

interface DragProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  itemType: string;
}

const TabDropZoneComponent = ({
                                connectDropTarget,
                                isOver,
                              }: TabDropZoneProps & DragProps) =>
  connectDropTarget(
    <div
      style={{
        flex: 'auto',
      }}
    >
      <DropZone isOver={isOver}/>
    </div>,
  );

const entryTarget = {
  drop: (props: TabDropZoneProps, monitor) => {
    if (monitor == null) return;

    const sourceItem = monitor.getItem();

    if (sourceItem == null) {
      return;
    }

    const previousPosition: ITabPosition = {
      tabPosition: sourceItem.index,
      devToolIndex: sourceItem.devToolIndex,
    };
    const nextPosition = {
      tabPosition: props.index,
      devToolIndex: props.devToolIndex,
    };

    props.moveTab(previousPosition, nextPosition);
  },

  canDrop: (props: TabDropZoneProps, monitor) => {
    if (monitor == null) return false;
    const source = monitor.getItem();
    if (source == null) return false;

    return (
      props.index !== source.index || props.devToolIndex !== source.devToolIndex
    );
  },
};

const collectTarget = (
  connectMonitor: DropTargetConnector,
  monitor: DropTargetMonitor,
) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connectMonitor.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
});

export const TabDropZone = DropTarget(
  PREVIEW_TAB_ID,
  entryTarget,
  collectTarget,
)(TabDropZoneComponent);
