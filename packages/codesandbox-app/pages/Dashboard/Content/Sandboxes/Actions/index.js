import React from 'react';
import { Container, VanillaButton } from './elements';
export function DashboardActions({ actions }) {
    return (<Container>
      {actions.map(action => (<VanillaButton key={action.name} onClick={() => action.run()}>
          {action.name} {action.Icon}
        </VanillaButton>))}
    </Container>);
}
