import React from 'react';
import { clone, hooksObserver, inject } from 'app/componentConnectors';
import Tags from '@codesandbox/common/lib/components/Tags';
import getTemplateDefinition from '@codesandbox/common/lib/templates';
import { EditableTags } from 'app/components/EditableTags';
import { Item } from './elements';
export const Keywords = inject('store', 'signals')(hooksObserver(({ editable, store: { editor: { currentSandbox: { template, tags }, }, workspace: { tags: { tagName }, }, }, signals: { notificationAdded, workspace: { tagAdded, tagChanged, tagRemoved }, }, }) => {
    const changeTags = (newTags, removedTags) => {
        if (tags.length > 5) {
            notificationAdded('You can have a maximum of 5 tags', 'error');
            return;
        }
        const tagWasRemoved = newTags.length < tags.length && removedTags.length === 1;
        if (tagWasRemoved) {
            removedTags.forEach(tag => {
                tagRemoved({ tag });
            });
        }
        else {
            tagAdded();
        }
    };
    if (tags.length === 0 && !editable) {
        return null;
    }
    return (<Item>
          {editable ? (<EditableTags template={getTemplateDefinition(template)} value={clone(tags)} onChange={changeTags} onChangeInput={(value) => {
        tagChanged({ tagName: value });
    }} maxTags={5} inputValue={tagName} renderInput={({ addTag, ...props }) => tags.length !== 5 ? <input type="text" {...props}/> : null} onlyUnique/>) : (<Tags style={{ fontSize: 13 }} tags={tags}/>)}
        </Item>);
}));
