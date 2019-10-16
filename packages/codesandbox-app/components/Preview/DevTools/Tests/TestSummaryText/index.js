import * as React from 'react';
import { FailedTests, PassedTests, RightSide, TestDetails, TotalTests } from './elements';
export const TestSummaryText = ({ failedCount, passedCount, totalCount, totalDuration, }) => (<TestDetails>
    {failedCount !== 0 && <FailedTests>{failedCount} failed</FailedTests>}
    {passedCount !== 0 && <PassedTests>{passedCount} passed</PassedTests>}
    {totalCount !== 0 && <TotalTests>{totalCount} total</TotalTests>}
    {totalDuration != null && (<RightSide>
        <TotalTests>{totalDuration}ms</TotalTests>
      </RightSide>)}
  </TestDetails>);
