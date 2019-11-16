import React from 'react';
//  Fix css prop types in styled-components (see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-463640878)
// import VERSION from '@csb/common/lib/version';
// import { SocialInfo } from '~/components/SocialInfo';
// import ConfigurationFiles from './items/ConfigurationFiles';
// import { Deployment } from './items/Deployment';
import Files from './items/Files';
// import { GitHub } from './items/GitHub';
// import Live from './items/Live';
// import { More } from './items/More';
import { NotOwnedSandboxInfo } from './items/NotOwnedSandboxInfo';
import { ProjectInfo } from './items/ProjectInfo';
// import { Server } from './items/Server';
// import { Advertisement } from './Advertisement';
import { Chat } from './Chat';
import { ConnectionNotice } from './ConnectionNotice';
import { SSEDownNotice } from './SSEDownNotice';
import { WorkspaceItem } from './WorkspaceItem';
import { Container, ItemTitle } from './elements';
import { useOvermind } from '@muggle/hooks';

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
  const { state, actions } = useOvermind();

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

  console.log(activeTab);

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
