import * as React from 'react';
import { StatusElements } from '../../../elements';
import { Block, TestName as Name } from './elements';
export const TestName = ({ test }) => {
    const StatusElement = StatusElements[test.status];
    const testParts = [...test.testName];
    const testName = testParts.pop();
    return (<div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <StatusElement />
      {testParts.map((part, i) => (<Block last={i === testParts.length - 1} key={part}>
          <span style={{ zIndex: 10 }}>{part}</span>
        </Block>))}
      <Name>{testName}</Name>
    </div>);
};
