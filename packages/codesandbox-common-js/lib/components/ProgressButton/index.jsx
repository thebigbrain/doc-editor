import React from 'react';
import { Loader, RelativeButton } from './elements';
function ProgressButton({ loading = false, disabled = false, ...props }) {
    return (<RelativeButton disabled={disabled || loading} {...props}>
      {props.children}
      {loading && <Loader />}
    </RelativeButton>);
}
export default ProgressButton;
