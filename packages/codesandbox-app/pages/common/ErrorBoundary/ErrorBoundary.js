import React, { Component } from 'react';
import { CodeSadbox } from './CodeSadbox';

export class ErrorBoundary extends Component {
  static defaultProps = {
    FallbackComponent: CodeSadbox,
  };
  state = {
    error: null,
    info: null,
    previousLocation: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  static getDerivedStateFromProps(
    props,
    state,
  ) {
    if (props.location !== state.previousLocation) {
      return {
        error: null,
        info: null,
        previousLocation: props.location,
      };
    }

    return null;
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      } catch {
      } // eslint-disable-line
    }

    this.setState({ info });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    return error !== null ? (
      <FallbackComponent
        error={error}
        trace={info ? info.componentStack : ''}
      />
    ) : (
      children || null
    );
  }
}
