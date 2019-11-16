import React from 'react'
import { Route } from 'react-router-dom'
import { Animate } from 'react-show'
import { ContextMenu } from '~/components/ContextMenu'
import { AnimatedChevron, Container, IconContainer, ItemName } from './elements'

const getContainer = contextItems => {
  if (contextItems) {
    return props => (
      <ContextMenu items={contextItems}>
        {React.createElement(Container, props)}
      </ContextMenu>
    )
  }

  return Container
}

export function Item(props) {
  const [open, setOpen] = React.useState(props.openByDefault)

  const toggleOpen = e => {
    e.preventDefault()
    setOpen(!open)
  }

  React.useEffect(() => {
    setOpen(props.openByDefault)
  }, [props.openByDefault])


  const {
    name,
    contextItems,
    Icon,
    path,
    children,
    style,
    active,
    openByDefault,
    ...rest
  } = props

  const UsedContainer = getContainer(contextItems)

  return (
    <Route path={path}>
      {res => {
        const isActive = (res.match && res.match.isExact) || active
        const isOpen = open === undefined ? isActive : open

        if (
          (res.match || isActive) &&
          open === undefined &&
          children
        ) {
          setOpen(true)
        }
        return (
          <>
            <UsedContainer
              style={style}
              to={path}
              exact
              active={isActive ? 'active' : ''}
              {...rest}
            >
              {children ? (
                <AnimatedChevron onClick={toggleOpen} open={isOpen}/>
              ) : (
                <div
                  style={{ width: 16, height: 16, marginRight: '0.25rem' }}
                />
              )}
              <IconContainer>
                <Icon/>
              </IconContainer>
              <ItemName>{name}</ItemName>
            </UsedContainer>

            {children && (
              <Animate
                transitionOnMount
                style={{
                  height: 'auto',
                  overflow: 'hidden',
                }}
                start={{
                  height: 0, // The starting style for the component.
                  // If the 'leave' prop isn't defined, 'start' is reused!
                }}
                show={isOpen}
                duration={250}
                stayMounted={false}
              >
                {children}
              </Animate>
            )}
          </>
        )
      }}
    </Route>
  )

}
