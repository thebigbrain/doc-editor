import { hooksObserver, inject } from 'app/componentConnectors';
import React from 'react';

import { ButtonContainer } from '../../../elements';

import { AliasDeploymentButton } from './AliasDeploymentButton/index';
import { DeleteDeploymentButton } from './DeleteDeploymentButton/index';
import { VisitDeploymentButton } from './VisitDeploymentButton/index';
import { Deploy } from './types';

type Props = {
  deploy: Deploy;
  store: any;
};
export const Actions = inject('store')(
  hooksObserver(({ deploy, store: { deployment: { hasAlias } } }: Props) => (
    <ButtonContainer>
      <VisitDeploymentButton url={deploy.url}/>

      <DeleteDeploymentButton id={deploy.uid}/>

      {hasAlias && deploy.state === 'READY' ? (
        <AliasDeploymentButton deploy={deploy}/>
      ) : null}
    </ButtonContainer>
  )),
);
