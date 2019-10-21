import React from 'react'
import { useOvermind } from '@muggle/hooks'

import { Overlay as OverlayComponent } from '~/components/Overlay'
import Option from './Option'
import { Arrow, Container, OrderName, OverlayContainer } from './elements'

const FIELD_TO_NAME = {
  updatedAt: 'Last Modified',
  insertedAt: 'Last Created',
  title: 'Name',
}

function SortOptionsComponent(props) {
  const { state, actions } = useOvermind()

  const toggleSort = e => {
    e.preventDefault()
    const { orderBy } = state.dashboard
    const { orderByChanged } = actions.dashboard
    orderByChanged({
      orderBy: {
        order: orderBy.order === 'asc' ? 'desc' : 'asc',
        field: orderBy.field,
      },
    })
  }

  const setField = (field) => {
    const { orderBy } = state.dashboard
    const { orderByChanged } = actions.dashboard
    orderByChanged({
      orderBy: {
        order: orderBy.order,
        field,
      },
    })
  }


  const { field, order } = state.dashboard.orderBy
  const { hideOrder } = props

  const Overlay = () => (
    <OverlayContainer>
      <Option
        setField={setField}
        currentField={field}
        field="title"
        name={FIELD_TO_NAME.title}
      />
      <Option
        setField={setField}
        currentField={field}
        field="insertedAt"
        name={FIELD_TO_NAME.insertedAt}
      />
      <Option
        setField={setField}
        currentField={field}
        field="updatedAt"
        name={FIELD_TO_NAME.updatedAt}
      />
    </OverlayContainer>
  )

  return (
    <OverlayComponent event="Dashboard - Order By" content={Overlay}>
      {open => (
        <Container hideOrder={hideOrder}>
          Sort by{' '}
          <OrderName onClick={open}>{FIELD_TO_NAME[field]} </OrderName>
          <Arrow
            onClick={toggleSort}
            style={{
              transform: `rotate(${order === 'asc' ? -180 : 0}deg)`,
              fontSize: '.875rem',
              marginLeft: 4,
            }}
          />
        </Container>
      )}
    </OverlayComponent>
  )

}

export const SortOptions = SortOptionsComponent
