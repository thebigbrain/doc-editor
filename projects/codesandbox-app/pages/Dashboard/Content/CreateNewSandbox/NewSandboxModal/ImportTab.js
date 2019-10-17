import React from 'react';
import {
  GoTerminal as TerminalIcon,
  GoCloudUpload as UploadIcon,
} from 'react-icons/go';
import { ImportChoice, ImportChoices, ImportWizardContainer } from './elements';

import { GitHubImport, StackbitImport } from './Imports';

export const ImportTab = ({ username }) => (
  <>
    <ImportWizardContainer>
      <GitHubImport/>
      {username && <StackbitImport username={username}/>}
    </ImportWizardContainer>
    <ImportChoices>
      <ImportChoice href="/docs/importing#export-with-cli">
        <TerminalIcon/> CLI Documentation
      </ImportChoice>
      <ImportChoice href="/docs/importing#define-api">
        <UploadIcon/> API Documentation
      </ImportChoice>
    </ImportChoices>
  </>
);
