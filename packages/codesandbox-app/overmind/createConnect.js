/* eslint-disable */

/*
  This file is temporary for the transition to Overmind
*/

import { EventType} from 'overmind'
import { Component, createElement } from 'react'
import { context } from './Provider'

let nextComponentId = 0
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

function createReaction(overmind) {
  return (reactionCb, updateCb) => {
    const tree = overmind.proxyStateTree.getTrackStateTree()
    const updateReaction = () => {
      tree.trackScope(
        () => reactionCb(tree.state),
        () => {
          updateCb(reactionCb(tree.state))
          updateReaction()
        },
      )
    }

    updateReaction()

    return () => {
      overmind.proxyStateTree.disposeTree(tree)
    }
  }
}

export const createConnect = (
  overmindInstance,
) => (
  component,
) => {
  let componentInstanceId = 0
  const name = component.name
  const populatedComponent = component as any
  populatedComponent.__componentId =
    typeof populatedComponent.__componentId === 'undefined'
      ? nextComponentId++
      : populatedComponent.__componentId
  const isClassComponent =
    component.prototype && typeof component.prototype.render === 'function'

  if (isClassComponent) {
    const originalRender = component.prototype.render
    component.prototype.render = function() {
      if (this.props.overmind) {
        return this.props.overmind.tree.trackScope(
          () => originalRender.call(this),
          this.props.overmind.onUpdate,
        )
      }

      return originalRender.call(this)
    }
  }

  if (IS_PRODUCTION) {
    class HOC extends Component {
      static contextType = context
      tree
      overmind
      state = {
        overmind: null,
      }
      wrappedComponent
      reaction
      isUnmounting
      onUpdate = () => {
        if (this.isUnmounting) {
          return
        }
        this.setState({
          overmind: {
            state: this.tree.state,
            effects: this.overmind.effects,
            actions: this.overmind.actions,
            addMutationListener: this.overmind.addMutationListener,
            onUpdate: this.onUpdate,
            tree: this.tree,
          },
        })
      }

      constructor(props, context) {
        super(props)
        this.overmind = overmindInstance || context
        this.tree = this.overmind.proxyStateTree.getTrackStateTree()
        this.isUnmounting = false
        this.state = {
          overmind: {
            state: this.tree.state,
            effects: this.overmind.effects,
            actions: this.overmind.actions,
            addMutationListener: this.overmind.addMutationListener,
            onUpdate: this.onUpdate,
            tree: this.tree,
          },
        }
        this.wrappedComponent = (...args) =>
          this.tree.trackScope(
            () => (component as any)(...args),
            this.onUpdate,
          )
        this.reaction = createReaction(this.overmind)
      }

      componentWillUnmount() {
        this.isUnmounting = true
        this.overmind.proxyStateTree.disposeTree(this.tree)
      }

      render() {
        if (isClassComponent) {
          return createElement(component, {
            ...this.props,
            overmind: this.state.overmind,
            store: this.state.overmind.state,
            signals: this.state.overmind.actions,
            reaction: this.reaction,
          } as any)
        }

        return createElement(this.wrappedComponent, {
          ...this.props,
          overmind: this.state.overmind,
          store: this.state.overmind.state,
          signals: this.state.overmind.actions,
          reaction: this.reaction,
        } as any)
      }
    }

    return HOC as any
  }

  class HOC extends Component {
    static contextType = context
    tree
    overmind
    componentInstanceId = componentInstanceId++
    currentFlushId = 0
    state = {
      overmind: null,
    }
    isUpdating
    wrappedComponent
    isUnmounting
    reaction
    onUpdate = (mutatons, paths, flushId) => {
      if (this.isUnmounting) {
        return
      }
      this.currentFlushId = flushId
      this.isUpdating = true
      this.setState({
        overmind: {
          state: this.tree.state,
          effects: this.overmind.effects,
          actions: this.overmind.actions,
          addMutationListener: this.overmind.addMutationListener,
          onUpdate: this.onUpdate,
          tree: this.tree,
        },
      })
    }

    constructor(props, context) {
      super(props)
      this.overmind = overmindInstance || context
      this.tree = this.overmind.proxyStateTree.getTrackStateTree()
      this.isUnmounting = false
      this.state = {
        overmind: {
          state: this.tree.state,
          effects: this.overmind.effects,
          actions: this.overmind.actions,
          addMutationListener: this.overmind.addMutationListener,
          onUpdate: this.onUpdate,
          tree: this.tree,
        },
      }
      this.wrappedComponent = (...args) =>
        this.tree.trackScope(() => (component as any)(...args), this.onUpdate)
      this.reaction = createReaction(this.overmind)
    }

    componentDidMount() {
      this.overmind.eventHub.emitAsync(EventType.COMPONENT_ADD, {
        componentId: populatedComponent.__componentId,
        componentInstanceId: this.componentInstanceId,
        name,
        paths: Array.from(this.tree.pathDependencies) as any,
      })
    }

    componentDidUpdate() {
      if (this.isUpdating) {
        this.overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
          componentId: populatedComponent.__componentId,
          componentInstanceId: this.componentInstanceId,
          name,
          flushId: this.currentFlushId,
          paths: Array.from(this.tree.pathDependencies),
        })
        this.isUpdating = false
      }
    }

    componentWillUnmount() {
      this.isUnmounting = true
      this.overmind.proxyStateTree.disposeTree(this.tree)
      this.overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId: populatedComponent.__componentId,
        componentInstanceId: this.componentInstanceId,
        name,
      })
    }

    render() {
      if (isClassComponent) {
        return createElement(component, {
          ...this.props,
          overmind: this.state.overmind,
          store: this.state.overmind.state,
          signals: this.state.overmind.actions,
          reaction: this.reaction,
        } as any)
      }

      return createElement(this.wrappedComponent, {
        ...this.props,
        overmind: this.state.overmind,
        store: this.state.overmind.state,
        signals: this.state.overmind.actions,
        reaction: this.reaction,
      } as any)
    }
  }

  Object.defineProperties(HOC, {
    name: {
      value: 'Connect' + (component.displayName || component.name || ''),
    },
  })

  return HOC as any
}
