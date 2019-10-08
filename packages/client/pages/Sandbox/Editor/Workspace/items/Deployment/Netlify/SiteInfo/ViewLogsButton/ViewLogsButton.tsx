import React from 'react';

import { hooksObserver, inject } from 'app/componentConnectors';

import { Button } from './elements';

export const ViewLogsButton = inject('signals')(
  hooksObserver(({ signals: { modalOpened } }) => (
    <Button onClick={() => modalOpened({ modal: 'netlifyLogs' })} small>
      View Logs
    </Button>
  )),
);
