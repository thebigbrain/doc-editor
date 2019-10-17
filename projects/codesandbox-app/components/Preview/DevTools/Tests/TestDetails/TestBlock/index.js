import * as React from 'react';
import FileIcon from 'react-icons/lib/md/insert-drive-file';
import Tooltip from '@csb/common/lib/components/Tooltip';
import { Actions, BlockHeader, Container } from './elements';
import { TestName } from './TestName/index';
import { ErrorDetails } from '../ErrorDetails/index';
export const TestBlock = ({ test, openFile }) => (<Container>
    <BlockHeader>
      <TestName test={test}/>
      <Actions>
        {openFile && (<Tooltip content="Open File">
            <FileIcon onClick={() => openFile(test.path)}/>
          </Tooltip>)}
        <div>{test.duration != null ? `${test.duration}ms` : ''}</div>
      </Actions>
    </BlockHeader>
    {test.errors &&
    test.errors.length !== 0 &&
    test.errors.map(error => (<ErrorDetails error={error} path={test.path} key={error.message}/>))}
  </Container>);
