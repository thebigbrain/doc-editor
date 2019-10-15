import React from 'react';
import Input, { TextArea } from '../Input';
export default class PreferenceText extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            const { value } = e.target;
            this.props.setValue(value);
        };
    }
    render() {
        const { value, placeholder, isTextArea, ...props } = this.props;
        return React.createElement(isTextArea ? TextArea : Input, {
            style: { width: '9rem' },
            value,
            placeholder,
            onChange: this.handleChange,
            ...props,
        });
    }
}
