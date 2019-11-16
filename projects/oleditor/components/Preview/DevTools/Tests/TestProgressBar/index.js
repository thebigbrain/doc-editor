import * as React from 'react';
import { FailedBar, IdleBar, ProgressBar, SuccessBar } from './elements';
export const TestProgressBar = ({ failedCount, passedCount, idleCount, }) => (<ProgressBar>
    <FailedBar count={failedCount}/>
    <SuccessBar count={passedCount}/>
    <IdleBar count={idleCount}/>
  </ProgressBar>);
