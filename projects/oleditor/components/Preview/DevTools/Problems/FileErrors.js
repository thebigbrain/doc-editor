import Tooltip from '@csb/common/lib/components/Tooltip';
import { actions, dispatch } from 'codesandbox-api';
import { sortBy } from 'lodash';
import React from 'react';
import {FileIcon} from '@muggle/icons';
import { Animate } from 'react-show';
import { Actions, AnimatedChevron, File, FileName, Path } from './elements';
import { ProblemMessage } from './Message';
const severityToNumber = {
    error: 1,
    warning: 2,
    notice: 3,
};
export function FileErrors({ file, corrections }) {
    const [show, setShow] = React.useState(true);
    const splittedPath = file.split('/');
    const fileName = splittedPath.pop();
    const sortedCorrections = React.useMemo(() => sortBy(corrections, s => severityToNumber[s.severity]), [corrections]);
    return (<div key={file}>
      <File onClick={() => setShow(!show)}>
        <AnimatedChevron show={show}/>

        <Path>{splittedPath.join('/')}/</Path>
        <FileName>{fileName}</FileName>
        <Actions>
          <Tooltip content="Open File">
            <FileIcon onClick={e => {
        e.stopPropagation();
        dispatch(actions.editor.openModule(file));
    }}/>
          </Tooltip>
        </Actions>
      </File>

      <Animate style={{
        height: 'auto',
        overflow: 'hidden',
    }} start={{
        height: 0,
    }} show={show}>
        {sortedCorrections.map(message => (<ProblemMessage key={message.message + (message.line || 0) + (message.column || 0)} message={message}/>))}
      </Animate>
    </div>);
}
