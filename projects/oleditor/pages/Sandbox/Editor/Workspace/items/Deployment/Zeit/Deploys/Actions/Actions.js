import React from 'react'

import {ButtonContainer} from '../../../elements'

import {AliasDeploymentButton} from './AliasDeploymentButton/index'
import {DeleteDeploymentButton} from './DeleteDeploymentButton/index'
import {VisitDeploymentButton} from './VisitDeploymentButton/index'
import {useOvermind} from "@muggle/hooks"


export const Actions = ({ deploy,  }) => {
  const {state: { deployment: { hasAlias } }} = useOvermind()
  return (
    <ButtonContainer>
      <VisitDeploymentButton url={deploy.url}/>

      <DeleteDeploymentButton id={deploy.uid}/>

      {hasAlias && deploy.state === 'READY' ? (
        <AliasDeploymentButton deploy={deploy}/>
      ) : null}
    </ButtonContainer>
  )
}
