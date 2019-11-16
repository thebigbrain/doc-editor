import React from 'react'
import Tags from '@csb/common/lib/components/Tags'
import getTemplateDefinition from '@csb/common/lib/templates'

import { EditableTags } from '~/components/EditableTags'
import { Item } from './elements'
import { useOvermind } from '@muggle/hooks'

export const Keywords = ({ editable }) => {
  const {
    state: { editor: { currentSandbox: { template, tags = [] } }, workspace: { tags: { tagName } } },
    actions: { notificationAdded, workspace: { tagAdded, tagChanged, tagRemoved } },
  } = useOvermind()

  const changeTags = (newTags, removedTags) => {
    if (tags.length > 5) {
      notificationAdded('You can have a maximum of 5 tags', 'error')
      return
    }
    const tagWasRemoved = newTags.length < tags.length && removedTags.length === 1
    if (tagWasRemoved) {
      removedTags.forEach(tag => {
        tagRemoved({ tag })
      })
    }
    else {
      tagAdded()
    }
  }
  if (tags.length === 0 && !editable) {
    return null
  }
  return (
    <Item>
      {
        editable
          ? (
            <EditableTags
              template={getTemplateDefinition(template)}
              value={clone(tags)}
              onChange={changeTags}
              onChangeInput={(value) => {
                tagChanged({ tagName: value })
              }}
              maxTags={5}
              inputValue={tagName}
              renderInput={
                ({ addTag, ...props }) => tags.length !== 5 ? <input type="text" {...props}/> : null} onlyUnique
            />
          )
          : (<Tags style={{ fontSize: 13 }} tags={tags}/>)
      }
    </Item>
  )
}
