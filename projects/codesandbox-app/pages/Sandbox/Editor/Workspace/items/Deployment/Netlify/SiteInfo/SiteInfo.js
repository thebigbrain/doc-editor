import React from 'react';
import { hooksObserver, inject } from 'app/componentConnectors';
import getNetlifyConfig from 'app/utils/getNetlifyConfig';
import { resolveDirectory } from '@csb/common/lib/sandbox/modules';
import { WorkspaceInputContainer, WorkspaceSubtitle } from '../../../../elements';
import { Deploy, Deploys, Name } from '../../elements';
import { Actions } from './Actions/index';
import { SiteInfoWrapper } from './elements';
import { Functions } from './Functions/index';
import { ViewLogsButton } from './ViewLogsButton/index';
const getFunctionDir = sandbox => {
    try {
        return resolveDirectory(getNetlifyConfig(sandbox).functions, sandbox.modules, sandbox.directories);
    }
    catch {
        return undefined;
    }
};
export const SiteInfo = inject('store')(hooksObserver(({ store: { deployment: { building, netlifyLogs, netlifySite }, editor: { currentSandbox }, }, }) => {
    const functionDirectory = getFunctionDir(currentSandbox);
    const functions = functionDirectory
        ? currentSandbox.modules.filter(({ directoryShortid }) => directoryShortid === functionDirectory.shortid)
        : [];
    return (<SiteInfoWrapper>
          <WorkspaceSubtitle>Sandbox Site</WorkspaceSubtitle>

          <WorkspaceInputContainer>
            <Deploys>
              <Deploy key={netlifySite.uid}>
                <Name light>{netlifySite.name}</Name>

                {!building && <div>Building</div>}

                {functions.length ? <Functions functions={functions}/> : null}

                <Actions />

                {netlifyLogs ? <ViewLogsButton /> : null}
              </Deploy>
            </Deploys>
          </WorkspaceInputContainer>
        </SiteInfoWrapper>);
}));
