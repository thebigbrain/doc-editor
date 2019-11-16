import React from 'react';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Action } from '../../../../elements';
export const AliasDeploymentButton = inject('signals')(hooksObserver(({ deploy: { alias: aliases, uid: id }, signals: { deployment: { aliasDeployment }, }, }) => (<Action disabled={aliases.length > 0} onClick={() => aliasDeployment({ id })}>
        {aliases.length > 0 ? 'Aliased' : 'Alias'}
      </Action>)));
