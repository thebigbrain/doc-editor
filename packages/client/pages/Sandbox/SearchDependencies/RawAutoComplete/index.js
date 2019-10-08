import React from 'react'
import Downshift from 'downshift'

import { Pagination } from 'react-instantsearch/dom'

import { ARROW_RIGHT, ENTER } from '@codesandbox/common/lib/utils/keycodes'

import DependencyHit from '../DependencyHit'
import { AutoCompleteInput, SuggestionInput } from './elements'

/* eslint-disable no-param-reassign */
function getName(value: string) {
  const scope = value[0] === '@' ? '@' : ''
  value = scope ? value.substr(1) : value

  return scope + value.split('@')[0]
}

function isExplicitVersion(value: string) {
  const scope = value[0] === '@' ? '@' : ''
  value = scope ? value.substr(1) : value

  return value.includes('@')
}

function getVersion(value: string, hit) {
  if (value.indexOf('@') > 0) {
    return value.split('@')[1]
  }
  if (hit) {
    return hit.version
  }

  return null
}

function getIsValid(value: string, hit, version: string) {
  return Boolean(
    hit &&
    hit.tags &&
    hit.versions &&
    hit.name.startsWith(getName(value)) &&
    (version in hit.tags || version in hit.versions),
  )
}

function getHit(value: string, hits) {
  return value && hits.find(hit => hit.name.startsWith(value))
}

class RawAutoComplete extends React.Component {
  state = {
    value: '',
  }

  render() {
    const {
      onSelect,
      onManualSelect,
      onHitVersionChange,
      hits,
      refine,
      currentRefinement,
    } = this.props

    const hit = getHit(currentRefinement, hits)
    const version = getVersion(this.state.value, hit)
    const isValid = getIsValid(this.state.value, hit, version)

    const autoCompletedQuery = noName => {
      if (isExplicitVersion(this.state.value)) return null

      if (hit && isValid)
        return noName ? '@' + hit.version : hit.name + '@' + hit.version

      return null
    }

    const getRefinement = () => {
      if (isExplicitVersion(this.state.value)) return this.state.value

      if (hit) return hit.name

      return currentRefinement
    }

    return (
      <Downshift itemToString={h => (h ? h.name : h)} onSelect={onSelect}>
        {({ getInputProps, getItemProps, highlightedIndex }) => (
          <div>
            {highlightedIndex == null && (
              <SuggestionInput as="div">
                {getRefinement()}
                <span
                  css={{
                    color: 'var(--color-white-3)',
                  }}
                >
                  {autoCompletedQuery(true)}
                </span>
              </SuggestionInput>
            )}
            <AutoCompleteInput
              autoFocus
              {...getInputProps({
                innerRef(ref) {
                  if (ref) {
                    if (
                      document.activeElement &&
                      document.activeElement.tagName !== 'SELECT'
                    ) {
                      ref.focus()
                    }
                  }
                },
                value: this.state.value,
                placeholder: 'Search or enter npm dependency',

                onChange: e => {
                  const name = e.target.value

                  this.setState({ value: name }, () => {
                    if (name.indexOf('@') === 0) {
                      const parts = name.split('@')

                      refine(`@${parts[1]}`)
                      return
                    }

                    const parts = name.split('@')

                    requestAnimationFrame(() => {
                      refine(`${parts[0]}`)
                    })
                  })
                },

                onKeyUp: e => {
                  // If enter with no selection
                  if (e.keyCode === ENTER) {
                    onManualSelect(autoCompletedQuery() || e.target.value)
                  } else if (
                    autoCompletedQuery() &&
                    e.keyCode === ARROW_RIGHT
                  ) {
                    this.setState({ value: autoCompletedQuery() })
                  }
                },
              })}
            />
            <Pagination/>

            <div>
              {hits.map((h, index) => (
                <DependencyHit
                  key={h.name}
                  {...getItemProps({
                    item: h,
                    index,
                    highlighted: highlightedIndex === index,
                    hit: h,
                    // Downshift supplies onClick
                    onVersionChange(v) {
                      onHitVersionChange(h, v)
                    },
                  })}
                />
              ))}
            </div>
          </div>
        )}
      </Downshift>
    )
  }
}

export default RawAutoComplete
