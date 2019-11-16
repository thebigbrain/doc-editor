import React from 'react'
import { memoize } from 'lodash-es'
import { useOvermind } from '@muggle/hooks'

import AnimatedSandboxItem from './AnimatedSandboxItem'

function SelectedSandboxItems(props) {
  const { state } = useOvermind()
  const getSelectedIds = memoize((id, sandboxes) => [
    id,
    ...sandboxes.filter(x => x !== props.id),
  ])

  const { x, y, left, top, isOverPossibleTargets } = props
  const { selectedSandboxes } = state.dashboard
  const selectedIds = getSelectedIds(props.id, selectedSandboxes)

  const scale = isOverPossibleTargets ? 0.4 : 0.8

  return selectedIds.map((id, i) => (
    <AnimatedSandboxItem
      key={id}
      id={id}
      i={i}
      isLast={i === selectedIds.length - 1}
      x={x}
      y={y}
      left={left}
      top={top}
      scale={scale}
      selectedSandboxes={selectedIds}
    />
  ))

}

export default SelectedSandboxItems
