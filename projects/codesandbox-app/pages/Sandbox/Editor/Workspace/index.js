import React from 'react';
//  Fix css prop types in styled-components (see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-463640878)
// import VERSION from '@csb/common/lib/version';
// import { SocialInfo } from '~/components/SocialInfo';
// import ConfigurationFiles from './items/ConfigurationFiles/index';
// import { Deployment } from './items/Deployment/index';
import Files from './items/Files/index';
// import { GitHub } from './items/GitHub/index';
// import Live from './items/Live/index';
// import { More } from './items/More/index';
import { NotOwnedSandboxInfo } from './items/NotOwnedSandboxInfo';
import { ProjectInfo } from './items/ProjectInfo/index';
// import { Server } from './items/Server';
// import { Advertisement } from './Advertisement/index';
import { Chat } from './Chat/index';
import { ConnectionNotice } from './ConnectionNotice/index';
import { SSEDownNotice } from './SSEDownNotice/index';
import { WorkspaceItem } from './WorkspaceItem/index';
import { ContactContainer, Container, ItemTitle, VersionContainer } from './elements';
import {useOvermind} from "@muggle/hooks"

const workspaceTabs = {
  project: ProjectInfo,
  'project-summary': NotOwnedSandboxInfo,
  files: Files,
  // github: GitHub,
  // deploy: Deployment,
  // config: ConfigurationFiles,
  // live: Live,
  // server: Server,
  // more: More,
};

export const Workspace = () => {
  const {state, actions} = useOvermind()

  const {
    editor: {
      currentSandbox: { owned },
    },
    isPatron,
    live: { isLive, roomInfo },
    preferences: {
      settings: { zenMode },
    },
    workspace: { openedWorkspaceItem: activeTab },
  } = state;

  if (!activeTab) {
    return null;
  }

  console.log(activeTab)

  const Component = workspaceTabs[activeTab];
  const item =
    actions.workspace.getWorkspaceItems().find(({ id }) => id === activeTab) ||
    actions.workspace.getDisabledItems().find(({ id }) => id === activeTab);

  return (
    <Container>
      {item && !item.hasCustomHeader && <ItemTitle>{item.name}</ItemTitle>}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {Component && <Component/>}
      </div>

      {isLive && roomInfo.chatEnabled && (
        <WorkspaceItem defaultOpen title="Chat">
          <Chat/>
        </WorkspaceItem>
      )}

      {!zenMode && (
        <>
          {/*{!(isPatron || owned) && <Advertisement/>}*/}

          {/*<ContactContainer>*/}
            {/*/!*<SocialInfo style={{ display: 'inline-block' }}/>*!/*/}

            {/*<VersionContainer className="codesandbox-version">*/}
              {/*{VERSION}*/}
            {/*</VersionContainer>*/}
          {/*</ContactContainer>*/}

          <SSEDownNotice/>

          <ConnectionNotice/>
        </>
      )}
    </Container>
  );
};
