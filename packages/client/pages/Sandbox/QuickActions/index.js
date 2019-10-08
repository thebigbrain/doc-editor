import React from 'react'
import { inject, observer } from 'app/componentConnectors'
import Downshift from 'downshift'
import genie from 'geniejs'

import { ESC } from '@codesandbox/common/lib/utils/keycodes'

import Input from '@codesandbox/common/lib/components/Input'
import Keys from './Keys'

import { Container, Entry, InputContainer, Items, Keybindings, Title } from './elements'

class QuickActionsComponent extends React.Component {
  // we'll just keep track of what the user changes the inputValue to be
  // so when the user makes a wish we can provide that info to genie
  inputValue = ''

  updateGenie = () => {
    const { keybindings } = this.props.store.preferences
    const { signals } = this.props

    Object.keys(keybindings).forEach(bindingKey => {
      const quickAction = keybindings[bindingKey]

      genie({
        magicWords: `${quickAction.type}: ${quickAction.title}`,
        id: bindingKey,
        action: () => {
          const signalPath = quickAction.signal.split('.')
          const signal = signalPath.reduce(
            (currentSignal, key) => currentSignal[key],
            signals,
          )
          const payload =
            typeof quickAction.payload === 'function'
              ? quickAction.payload(this.props.store)
              : quickAction.payload || {}
          signal(payload)
        },
      })
    })
  }
  getItems = value => genie.getMatchingWishes(value)
  handleKeyUp = e => {
    if (e.keyCode === ESC) {
      this.closeQuickActions()
    }
  }
  closeQuickActions = () => {
    this.props.signals.editor.quickActionsClosed()
  }
  onChange = item => {
    genie.makeWish(item, this.inputValue)
    this.persistGenie()
    this.closeQuickActions()
  }
  itemToString = item => item && item.magicWords.join(', ')

  componentDidMount() {
    this.updateGenie()
    this.loadGenie()
  }

  componentDidUpdate() {
    this.updateGenie()
  }

  persistGenie() {
    const { enteredMagicWords } = genie.options()
    window.localStorage.setItem('genie', JSON.stringify({ enteredMagicWords }))
  }

  loadGenie() {
    try {
      const { enteredMagicWords } = JSON.parse(
        window.localStorage.getItem('genie'),
      )
      genie.options({ enteredMagicWords })
    } catch (error) {
      // it may not exist in localStorage yet, or the JSON was malformed somehow
      // so we'll persist it to update localStorage so it doesn't throw an error
      // next time the page is loaded.
      this.persistGenie()
    }
  }

  render() {
    if (!this.props.store.editor.quickActionsOpen) {
      return null
    }

    const { keybindings } = this.props.store.preferences

    return (
      <Container>
        <Downshift
          defaultHighlightedIndex={0}
          defaultIsOpen
          onChange={this.onChange}
          itemToString={this.itemToString}
        >
          {({
              getInputProps,
              getItemProps,
              selectedItem,
              inputValue,
              highlightedIndex,
            }) => {
            const inputProps = getInputProps({
              onChange: ev => {
                this.inputValue = ev.target.value
              },
              innerRef: el => el && el.focus(),
              onKeyUp: this.handleKeyUp,
              // Timeout so the fuzzy handler can still select the module
              onBlur: () => setTimeout(this.closeQuickActions, 100),
            })
            return (
              <div style={{ width: '100%' }}>
                <InputContainer>
                  <Input {...inputProps} value={inputProps.value || ''}/>
                </InputContainer>

                <Items>
                  {this.getItems(inputValue).map((item, index) => (
                    <Entry
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItem === item,
                      })}
                      key={item.id}
                    >
                      <Title>
                        {keybindings[item.id].type}:{' '}
                        {keybindings[item.id].title}
                      </Title>

                      {keybindings[item.id].bindings &&
                      keybindings[item.id].bindings[0] && (
                        <Keybindings>
                          <Keys bindings={keybindings[item.id].bindings[0]}/>
                          {keybindings[item.id].bindings.length === 2 &&
                          keybindings[item.id].bindings[1] &&
                          keybindings[item.id].bindings[1].length && (
                            <>
                              {' - '}
                              <Keys
                                bindings={keybindings[item.id].bindings[1]}
                              />
                            </>
                          )}
                        </Keybindings>
                      )}
                    </Entry>
                  ))}
                </Items>
              </div>
            )
          }}
        </Downshift>
      </Container>
    )
  }
}

export const QuickActions = inject('signals', 'store')(
  observer(QuickActionsComponent),
)
