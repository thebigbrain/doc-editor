import * as React from 'react'
import {Spring} from 'react-spring/renderprops'
import Portal from '@codesandbox/common/lib/components/Portal'

import {ENTER} from '@codesandbox/common/lib/utils/keycodes'

import {Container, Item, ItemContainer} from './elements'


export class ContextMenu extends React.PureComponent {
  unmounted
  el

  state = {
    x: 0,
    y: 0,
    show: false,
    down: true,
    left: false,
  }

  keydownHandler = (keydownEvent) => {
    const {show} = this.state
    if (keydownEvent.keyCode === 27 && show) {
      // Escape
      this.close()
    }
  }

  mousedownHandler = (mousedownEvent) => {
    const {show} = this.state

    if (show && this.el) {
      // @ts-ignore
      if (!this.el.contains(mousedownEvent.target)) {
        this.close()
      }
    }
  }

  onContextMenu = event => {
    if (!this.unmounted) {
      const {body} = document
      const html = document.documentElement

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      )

      const width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth,
      )

      event.preventDefault()
      window.addEventListener('mousedown', this.mousedownHandler)
      window.addEventListener('keydown', this.keydownHandler)

      const isDown = height - event.clientY > 150
      const isLeft = width - event.clientX > 200
      this.setState({
        show: true,
        x: event.clientX + 10,
        y: event.clientY + (isDown ? 10 : -10),
        down: isDown,
        left: isLeft,
      })

      if (this.props.onContextMenu) {
        this.props.onContextMenu(event)
      }
    }
  }
  unregisterListeners = () => {
    window.removeEventListener('keydown', this.keydownHandler)
    window.removeEventListener('mousedown', this.mousedownHandler)
  }
  close = () => {
    if (!this.unmounted) {
      this.unregisterListeners()
      this.setState({
        show: false,
      })
    }
  }

  componentWillUnmount() {
    this.unregisterListeners()
    this.unmounted = true
  }

  render() {
    if (this.unmounted) {
      return null
    }

    // remove isDraggingItem from the list of props as it's generating warnings.
    const {
      children,
      childFunction,
      items,
      isDraggingItem,
      ...props
    } = this.props

    const {show, x, y, down, left} = this.state

    const mapFunction = (item, i) => {
      if (Array.isArray(item)) {
        if (item.length === 0) {
          return null
        }
        return <ItemContainer key={i}>{item.map(mapFunction)}</ItemContainer>
      }

      const handlePress = (e) => {
        if (item.action()) {
          e.preventDefault()
          this.close()
        }
      }

      return (
        <Item
          tabIndex={0}
          key={item.title}
          color={item.color}
          onMouseDown={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onMouseUp={e => {
            handlePress(e)
          }}
          onKeyUp={e => {
            if (e.keyCode === ENTER) {
              handlePress(e)
            }
          }}
        >
          {item.icon && <item.icon/>}
          {item.title}
        </Item>
      )
    }

    const innerChildren =
      childFunction === true && typeof children === 'function'
        ? children(this.onContextMenu)
        : children

    return (
      <div
        {...props}
        onContextMenu={childFunction ? undefined : this.onContextMenu}
      >
        {innerChildren}
        {show && (
          <Portal>
            <div
              ref={el => {
                if (el && this.el !== el) {
                  // First time mounting
                  el.focus()
                }
                this.el = el
              }}
              tabIndex={-1}
            >
              <Spring
                // @ts-ignore
                from={{opacity: 0.6, height: 0, width: 'auto'}}
                to={{opacity: 1, height: 'auto', width: 'auto'}}
              >
                {({opacity, height, width}) => (
                  <Container
                    style={{
                      left: left
                        ? x
                        : x - (typeof width === 'string' ? 0 : width),
                      top: down
                        ? y
                        : y - (typeof height === 'string' ? 0 : height),
                      opacity,
                      height,
                    }}
                  >
                    {items.map(mapFunction)}
                  </Container>
                )}
              </Spring>
            </div>
          </Portal>
        )}
      </div>
    )
  }
}
