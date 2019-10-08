import React, { Component } from 'react';
import { CodeSadbox } from './CodeSadbox';
import { ErrorInfo, IErrorBoundaryProps, IErrorBoundaryState } from './types';

export class ErrorBoundary extends Component<IErrorBoundaryProps,
  IErrorBoundaryState> {
  static defaultProps = {
    FallbackComponent: CodeSadbox,
  };
  state = {
    error: null,
    info: null,
    previousLocation: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  static getDerivedStateFromProps(
    props: IErrorBoundaryProps,
    state: IErrorBoundaryState,
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

  componentDidCatch(error: Error, info: ErrorInfo): void {
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
