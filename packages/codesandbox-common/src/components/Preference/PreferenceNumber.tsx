import React from 'react';
import { StyledInput } from './elements';

export type Props = {
  setValue: (value: number) => void;
  value: number;
  step?: number;
  style?: React.CSSProperties;
};

export default class PreferenceInput extends React.PureComponent<Props> {
  handleChange = e => {
    const { value } = e.target;

    if (!Number.isNaN(+value)) {
      this.props.setValue(+value);
    }
  };

  render() {
    const { value, style, step } = this.props;

    return (
      <StyledInput
        step={step}
        style={{ width: '3rem', ...style }}
        type="number"
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
