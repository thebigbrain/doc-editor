/* @flow */
import React from 'react';
import Margin from '../spacing/Margin';
import { TagContainer } from './elements';
import Tag from './Tag';
function Tags({ tags, align, ...props }) {
    return (<TagContainer align={align || 'left'} {...props}>
      {tags
        .slice()
        .sort()
        .map(tag => (<Margin key={tag} vertical={0.5} horizontal={0.2}>
            <Tag tag={tag}/>
          </Margin>))}
    </TagContainer>);
}
export default Tags;
