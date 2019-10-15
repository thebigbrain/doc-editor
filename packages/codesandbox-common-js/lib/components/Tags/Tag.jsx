import React from 'react';
import { Container, DeleteIcon } from './elements';
export default function Tag({ tag, removeTag }) {
    return (<Container canRemove={Boolean(removeTag)}>
      {tag}
      {removeTag && (<DeleteIcon onClick={() => {
        removeTag({ tag });
    }}/>)}
    </Container>);
}
