import { hooksObserver, inject } from 'app/componentConnectors';
import React from 'react';
import { ButtonContainer } from '../../../elements';
import { SubTitle } from '../elements';
import { ClaimSiteButton } from './ClaimSiteButton/index';
import { VisitSiteButton } from './VisitSiteButton/index';
export const Actions = inject('store')(hooksObserver(({ store: { deployment: { netlifyClaimUrl } } }) => (<>
      <SubTitle>Actions</SubTitle>

      <ButtonContainer>
        <VisitSiteButton />

        {netlifyClaimUrl ? <ClaimSiteButton /> : null}
      </ButtonContainer>
    </>)));
