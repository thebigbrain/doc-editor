import React from 'react';
import Margin from '@csb/common/lib/components/spacing/Margin';
import { Button } from '@csb/common/lib/components/Button';
import { Details, Info } from './elements';

export const DetailInfo = ({ bgColor, light = false, children, loading = false, onDeploy, }) => (<Details bgColor={bgColor}>
    <Margin right={2}>
      <Info light={light}>{children}</Info>
    </Margin>
    <Button small disabled={loading} onClick={onDeploy}>
      Deploy
    </Button>
  </Details>);
