import React from 'react'
import Downshift from 'downshift'
import genie from 'geniejs'

import {ESC} from '@csb/common/lib/utils/keycodes'

import Input from '@csb/common/lib/components/Input'
import Keys from './Keys'
import {useOvermind} from '@muggle/hooks'

import {Container, Entry, InputContainer, Items, Keybindings, Title} from './elements'


function QuickActionsComponent() {
  const {state, actions} = useOvermind()
  // we'll just keep track of what the user changes the inputValue to be
  // so when the user makes a wish we can provide that info to genie
  let inputValue = ''

  const updateGenie = () => {
    const {keybindings} = state.preferences

    Object.keys(keybindings).forEach(bindingKey => {
      const quickAction = keybindings[bindingKey]

      genie({
        magicWords: `${quickAction.type}: ${quickAction.title}`,
        id: bindingKey,
        action: () => {
          const signalPath = quickAction.signal.split('.')
          const signal = signalPath.reduce(
            (currentSignal, key) => currentSignal[key],
            actions,
          )
          const payload =
            typeof quickAction.payload === 'function'
              ? quickAction.payload(state)
              : quickAction.payload || {}
          signal(payload)
        },
      })
    })
  }
  const getItems = value => genie.getMatchingWishes(value)
  const handleKeyUp = e => {
    if (e.keyCode === ESC) {
      closeQuickActions()
    }
  }
  const closeQuickActions = () => {
    actions.editor.quickActionsClosed()
  }
  const onChange = item => {
    genie.makeWish(item, inputValue)
    persistGenie()
    closeQuickActions()
  }
  const itemToString = item => item && item.magicWords.join(', ')

  function persistGenie() {
    const {enteredMagicWords} = genie.options()
    window.localStorage.setItem('genie', JSON.stringify({enteredMagicWords}))
  }

  function loadGenie() {
    try {
      const {enteredMagicWords} = JSON.parse(
        window.localStorage.getItem('genie'),
      )
      genie.options({enteredMagicWords})
    } catch (error) {
      // it may not exist in localStorage yet, or the JSON was malformed somehow
      // so we'll persist it to update localStorage so it doesn't throw an error
      // next time the page is loaded.
      persistGenie()
    }
  }

  React.useEffect(() => {
    updateGenie()
    loadGenie()
  }, [])

  React.useEffect(() => {
    updateGenie()
  })

  if (!state.editor.quickActionsOpen) {
    return null
  }

  const {keybindings} = state.preferences

  return (
    <Container>
      <Downshift
        defaultHighlightedIndex={0}
        defaultIsOpen
        onChange={onChange}
        itemToString={itemToString}
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
              inputValue = ev.target.value
            },
            innerRef: el => el && el.focus(),
            onKeyUp: handleKeyUp,
            // Timeout so the fuzzy handler can still select the module
            onBlur: () => setTimeout(closeQuickActions, 100),
          })
          return (
            <div style={{width: '100%'}}>
              <InputContainer>
                <Input {...inputProps} value={inputProps.value || ''}/>
              </InputContainer>

              <Items>
                {getItems(inputValue).map((item, index) => (
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

export const QuickActions = QuickActionsComponent
