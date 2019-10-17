import * as React from 'react';
import { DeleteSandboxButtonContainer } from './elements';
export const DeleteSandboxButton = ({ id, onDelete }) => {
    const deleteSandbox = () => {
        onDelete(id);
    };
    return <DeleteSandboxButtonContainer onClick={deleteSandbox}/>;
};
