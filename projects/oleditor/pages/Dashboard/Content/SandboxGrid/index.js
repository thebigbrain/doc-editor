import React from 'react'

import { formatDistanceToNow } from 'date-fns'
import { uniq } from 'lodash-es'
import { basename } from 'path'
import { camelizeKeys } from 'humps'

import track from '@csb/common/lib/utils/analytics'
import { protocolAndHost } from '@csb/common/lib/utils/url-generator'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import Column from 'react-virtualized/dist/commonjs/Table/Column'
import Table from 'react-virtualized/dist/commonjs/Table'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import { getSandboxName } from '@csb/common/lib/utils/get-sandbox-name'
import 'react-virtualized/styles.css'
import { useOvermind } from '@muggle/hooks'

import downloadZip from '~/utils/create-zip'
import { SandboxItem } from '../SandboxCard/index'
import { PADDING } from '../SandboxCard/elements'
import { getBounds, Selection } from '../Selection/index'
import { Content, StyledRow } from './elements'
import { DragLayer } from '../DragLayer/index'


const BASE_WIDTH = 300
const BASE_HEIGHT = 242
const IS_TABLE = false

const diff = (a, b) => (a > b ? a - b : b - a)

function SandboxGridComponent(props) {
  const { state, actions } = useOvermind()
  const [selection, setSelection] = React.useState(null)

  const loadedSandboxes = {}

  const setSandboxesSelected = (ids, { additive = false, range = false } = {}) => {
    const { state, sandboxes, actions } = props
    const { selectedSandboxes } = state.dashboard
    if (range === true) {
      track('Dashboard - Sandbox Shift Selection')
      const indexedSandboxes = sandboxes.map((sandbox, i) => ({ sandbox, i }))

      // We need to select a range
      const firstIndexInfo = indexedSandboxes.find(({ sandbox }) =>
        selectedSandboxes.includes(sandbox.id),
      )

      const [id] = ids

      const lastIndexInfo = indexedSandboxes.find(
        ({ sandbox }) => sandbox.id === id,
      )

      if (firstIndexInfo && lastIndexInfo) {
        const indexes = [firstIndexInfo.i, lastIndexInfo.i].sort()
        const sandboxIds = indexedSandboxes
          .map(({ sandbox }) => sandbox.id)
          .slice(indexes[0], indexes[1] + 1)

        actions.dashboard.sandboxesSelected({
          sandboxIds,
        })
        return
      }
    }

    let sandboxIds = ids

    if (additive) {
      track('Dashboard - Sandbox Additive Selection')
      sandboxIds = state.dashboard.selectedSandboxes.filter(
        id => !ids.includes(id),
      )
      const additiveIds = ids.filter(
        id => !state.dashboard.selectedSandboxes.includes(id),
      )

      sandboxIds = uniq([...sandboxIds, ...additiveIds])
    }

    actions.dashboard.sandboxesSelected({
      sandboxIds,
    })
  }

  const makeTemplates = (teamId) => {
    const collections = uniq(
      props.sandboxes
        .filter(sandbox => selectedSandboxesObject[sandbox.id])
        .map(s => s.collection),
    )


    makeTemplates(
      state.dashboard.selectedSandboxes,
      teamId,
      collections,
    )
  }

  const deleteSandboxes = () => {
    const collections = uniq(
      props.sandboxes
        .filter(sandbox => selectedSandboxesObject[sandbox.id])
        .map(s => s.collection),
    )
    deleteSandboxes(state.dashboard.selectedSandboxes, collections)
  }

  const undeleteSandboxes = () => {
    undeleteSandboxes(state.dashboard.selectedSandboxes)
  }

  const permanentlyDeleteSandboxes = () => {
    permanentlyDeleteSandboxes(state.dashboard.selectedSandboxes)
  }

  const setSandboxesPrivacy = (privacy) => {
    setSandboxesPrivacy(state.dashboard.selectedSandboxes, privacy)
  }

  const getSandbox = async sandboxId => {
    if (loadedSandboxes[sandboxId]) {
      return Promise.resolve(loadedSandboxes[sandboxId])
    }

    return fetch(`${protocolAndHost()}/api/v1/sandboxes/${sandboxId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
      },
    })
      .then(x => x.json())
      .then(x => {
        const data = camelizeKeys(x.data)
        loadedSandboxes[data.id] = data
        return data
      })
  }

  const exportSandboxes = async () => {
    const sandboxIds = uniq(
      props.sandboxes
        .filter(sandbox => selectedSandboxesObject[sandbox.id])
        .map(s => s.id),
    )
    const sandboxes = await Promise.all(
      sandboxIds.map(s => getSandbox(s)),
    )
    return Promise.all(
      sandboxes.map(s => downloadZip(s, s.modules, s.directories)),
    )
  }

  const onMouseDown = (event) => {
    setSelection({
      startX: event.clientX,
      startY: event.clientY,
      endX: event.clientX,
      endY: event.clientY,
    })


    if (!event.metaKey) {
      setSandboxesSelected([])
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseUp = () => {
    if (
      selection &&
      (diff(selection.startX, selection.endX) > 50 ||
        diff(selection.startY, selection.endY) > 50)
    ) {
      track('Dashboard - Sandbox Selection Done')
    }

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    setSelection(null)
  }

  const onMouseMove = event => {
    if (selection) {
      const newSelection = {
        ...selection,
        endX: event.clientX,
        endY: event.clientY,
      }

      setSelection(newSelection)

      const sandboxes = document.querySelectorAll('.sandbox-item')
      const selectedSandboxes = []
      const s = getBounds(
        newSelection.startX,
        newSelection.startY,
        newSelection.endX,
        newSelection.endY,
      )

      // eslint-disable-next-line no-restricted-syntax
      for (const sandbox of sandboxes) {
        const { top, height, left, width } = sandbox.getBoundingClientRect()
        const padding = IS_TABLE ? 0 : PADDING
        const boxWidth = width - padding
        const boxHeight = height - padding

        if (
          (left >= s.left || left + boxWidth >= s.left) &&
          left <= s.left + s.width &&
          (top >= s.top || top + boxHeight >= s.top) &&
          top <= s.top + s.height
        ) {
          selectedSandboxes.push(sandbox)
        }
      }

      setSandboxesSelected(selectedSandboxes.map(el => el.id), {
        additive: event.metaKey,
      })
    }
  }

  const isScrolling = () => scrolling

  const cellRenderer = ({ rowIndex, columnIndex, key, style, isScrolling }) => {
    scrolling = isScrolling

    let index = rowIndex * columnCount + columnIndex
    const { sandboxes, actions } = props

    if (props.ExtraElement) {
      if (index === 0) {
        return <props.ExtraElement key="extra" style={style}/>
      }

      index--
    }

    if (index > sandboxes.length - 1) {
      return null
    }

    const item = sandboxes[index]

    const getOrder = () => {
      if (item.removedAt) {
        return `Deleted ${formatDistanceToNow(item.removedAt)} ago`
      }

      const orderField = state.dashboard.orderBy.field
      if (orderField === 'insertedAt') {
        return `Created ${formatDistanceToNow(item.insertedAt)} ago`
      }

      return `Edited ${formatDistanceToNow(item.updatedAt)} ago`
    }

    let editedSince = getOrder()

    if (props.page === 'search' || props.page === 'recent') {
      const dir =
        basename(item.collection.path) ||
        (item.collection.teamId ? 'Team Sandboxes' : 'My Sandboxes')

      if (dir) {
        editedSince += ` in ${dir}`
      }
    }

    return (
      <SandboxItem
        isScrolling={isScrolling}
        id={item.id}
        title={getSandboxName(item)}
        alias={item.alias}
        color={item.forkedTemplate ? item.forkedTemplate.color : undefined}
        details={editedSince}
        style={style}
        key={key}
        sandbox={item}
        template={item.source.template}
        removedAt={item.removedAt}
        selected={selectedSandboxesObject[item.id]}
        selectedCount={state.dashboard.selectedSandboxes.length}
        setSandboxesSelected={setSandboxesSelected}
        setDragging={actions.dashboard.dragChanged}
        isDraggingItem={
          isDragging && selectedSandboxesObject[item.id]
        }
        collectionPath={item.collection.path}
        collectionTeamId={item.collection.teamId}
        deleteSandboxes={deleteSandboxes}
        undeleteSandboxes={undeleteSandboxes}
        permanentlyDeleteSandboxes={permanentlyDeleteSandboxes}
        exportSandboxes={exportSandboxes}
        setSandboxesPrivacy={setSandboxesPrivacy}
        makeTemplates={makeTemplates}
        page={props.page}
        privacy={item.privacy}
        isPatron={state.isPatron}
        screenshotUrl={item.screenshotUrl}
      />
    )
  }

  const rowRenderer = props => {
    const selected = selectedSandboxesObject[props.rowData.id]
    return (
      <StyledRow
        {...props}
        selected={selected}
        className={`sandbox-item ${props.className}`}
        id={props.rowData.id}
        selectSandboxes={setSandboxesSelected}
      />
    )
  }


  const { sandboxes } = props

  const { selectedSandboxes } = state.dashboard
  let sandboxCount = sandboxes.length

  let isDragging = state.dashboard.isDragging
  let selectedSandboxesObject = {}
  // Create an object to make it O(1)
  selectedSandboxes.forEach(id => {
    selectedSandboxesObject[id] = true
  })

  return (
    <Content style={{ overflowX: 'hidden' }} onMouseDown={onMouseDown}>
      <DragLayer/>
      <AutoSizer>
        {({ width, height }) => {
          if (props.ExtraElement) {
            sandboxCount += 1
          }

          let columnCount = Math.max(
            1,
            Math.floor(width / (BASE_WIDTH + PADDING)),
          )
          let rowCount = Math.ceil(sandboxCount / columnCount)
          let columnWidth = width / columnCount
          columnCount = columnCount

          if (IS_TABLE) {
            return (
              <Table
                style={{ outline: 'none' }}
                gridStyle={{ outline: 'none' }}
                width={width - 32}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={sandboxCount}
                rowRenderer={rowRenderer}
                rowGetter={({ index }) => sandboxes[index]}
                headerStyle={{
                  color: 'white',
                }}
                rowStyle={{
                  fontSize: '.875rem',
                }}
              >
                <Column
                  label="Title"
                  dataKey="title"
                  cellDataGetter={({ rowData }) =>
                    rowData.title || rowData.id
                  }
                  width={200}
                />
                <Column
                  label="Description"
                  dataKey="description"
                  width={300}
                />
                <Column
                  label="Last Updated"
                  dataKey="updatedAt"
                  cellDataGetter={({ rowData }) =>
                    formatDistanceToNow(rowData.updatedAt) + ' ago'
                  }
                  width={150}
                />
                <Column
                  label="Created"
                  dataKey="insertedAt"
                  cellDataGetter={({ rowData }) =>
                    formatDistanceToNow(rowData.insertedAt) + ' ago'
                  }
                  width={150}
                />
                <Column
                  label="Template"
                  dataKey="source.template"
                  cellDataGetter={({ rowData }) => rowData.source.template}
                  width={150}
                />
              </Table>
            )
          }

          return (
            <Grid
              style={{ outline: 'none', overflowX: 'hidden' }}
              cellCount={sandboxCount}
              cellRenderer={cellRenderer}
              width={width}
              height={height}
              rowCount={rowCount}
              columnCount={columnCount}
              columnWidth={columnWidth}
              rowHeight={BASE_HEIGHT}
            />
          )
        }}
      </AutoSizer>

      {selection && <Selection {...selection} />}
    </Content>
  )

}

export const SandboxGrid = SandboxGridComponent
