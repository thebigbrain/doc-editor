import React from 'react';
import Centered from '@csb/common/lib/components/flex/Centered';
import Margin from '@csb/common/lib/components/spacing/Margin';
import Relative from '@csb/common/lib/components/Relative';
import { Container, DisabledOverlay, Division, Header, PoweredBy, Title } from './elements';
export const IntegrationModal = ({ title, subtitle, Integration, signedIn, name, children, }) => (<Container>
    <Header>
      <Title>{title}</Title>
      <PoweredBy>{subtitle}</PoweredBy>
    </Header>
    <div>
      <Centered horizontal>
        <Margin margin={2}>
          <Integration />
        </Margin>
      </Centered>
      <Division />
      <Relative>
        {!signedIn && (<DisabledOverlay>Sign in to {name} to continue</DisabledOverlay>)}
        {children}
      </Relative>
    </div>
  </Container>);
