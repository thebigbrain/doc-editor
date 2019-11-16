import React from 'react';
import { CheckBox, Option as Container, OptionName } from './elements';
export const Option = ({ color, id, style, niceName, selected, toggleTemplate, }) => {
    const checkBoxName = `${id}-checkbox`;
    return (<Container selected={selected} onClick={e => {
        e.preventDefault();
        toggleTemplate(id, !selected);
    }} onMouseDown={e => {
        e.preventDefault();
    }} style={style}>
      <label htmlFor={checkBoxName} style={{ display: 'none' }}>
        {checkBoxName}
      </label>
      <CheckBox id={checkBoxName} color={color} selected={selected}/>
      <OptionName style={{ fontWeight: 500 }}>{niceName}</OptionName>
    </Container>);
};
