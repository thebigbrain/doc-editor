import { hooksObserver, inject } from 'app/componentConnectors';
import React from 'react';
import TrashIcon from 'react-icons/lib/fa/trash';
import { Action } from '../../../../elements';
export const DeleteDeploymentButton = inject('store', 'signals')(hooksObserver(({ id, signals: { deployment: { setDeploymentToDelete }, modalOpened, }, store: { deployment }, }) => (<Action disabled={deployment.deploysBeingDeleted
    ? deployment.deploysBeingDeleted.includes(id)
    : deployment[`${id}Deleting`]} onClick={() => {
    setDeploymentToDelete({ id });
    modalOpened({ modal: 'deleteDeployment' });
}}>
        {deployment[`${id}Deleting`] ? ('Deleting') : (<>
            <TrashIcon /> <span>Delete</span>
          </>)}
      </Action>)));
