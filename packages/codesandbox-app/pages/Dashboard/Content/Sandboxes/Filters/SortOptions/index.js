import React from 'react'
import { inject, observer } from 'app/componentConnectors'
import { Overlay as OverlayComponent } from 'app/components/Overlay'
import Option from './Option'
import { Arrow, Container, OrderName, OverlayContainer } from './elements'

const FIELD_TO_NAME = {
  updatedAt: 'Last Modified',
  insertedAt: 'Last Created',
  title: 'Name',
}

class SortOptionsComponent extends React.Component {
  toggleSort = e => {
    e.preventDefault()
    const { orderBy } = this.props.store.dashboard
    const { orderByChanged } = this.props.signals.dashboard
    orderByChanged({
      orderBy: {
        order: orderBy.order === 'asc' ? 'desc' : 'asc',
        field: orderBy.field,
      },
    })
  }

  setField = (field: string) => {
    const { orderBy } = this.props.store.dashboard
    const { orderByChanged } = this.props.signals.dashboard
    orderByChanged({
      orderBy: {
        order: orderBy.order,
        field,
      },
    })
  }

  render() {
    const { field, order } = this.props.store.dashboard.orderBy
    const { hideOrder } = this.props

    const Overlay = () => (
      <OverlayContainer>
        <Option
          setField={this.setField}
          currentField={field}
          field="title"
          name={FIELD_TO_NAME.title}
        />
        <Option
          setField={this.setField}
          currentField={field}
          field="insertedAt"
          name={FIELD_TO_NAME.insertedAt}
        />
        <Option
          setField={this.setField}
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
              onClick={this.toggleSort}
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
}

export const SortOptions = inject('store', 'signals')(
  observer(SortOptionsComponent),
)
