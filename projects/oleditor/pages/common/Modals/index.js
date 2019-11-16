import React from 'react';
import { ThemeProvider } from 'styled-components';
import Modal from '~/components/Modal';
import Loadable from '~/utils/Loadable';
import { templateColor } from '~/utils/template-color';
import getTemplateDefinition from '@csb/common/lib/templates';
import codesandbox from '@csb/common/lib/themes/codesandbox.json';
import getVSCodeTheme from '~/pages/Sandbox/Editor/utils/get-vscode-theme';

import NewSandbox from './NewSandbox';
import PreferencesModal from './PreferencesModal';
import DeleteSandboxModal from './DeleteSandboxModal';
import DeleteDeploymentModal from './DeleteDeploymentModal';
import ShareModal from './ShareModal';
import DeploymentModal from './DeploymentModal';
import ExportGitHubModal from './ExportGitHubModal';
import CommitModal from './CommitModal';
import PRModal from './PRModal';
import SelectSandboxModal from './SelectSandboxModal';
import SearchDependenciesModal from './SearchDependenciesModal';
import DeleteProfileSandboxModal from './DeleteProfileSandboxModal';
import EmptyTrash from './EmptyTrash';
import LiveSessionEnded from './LiveSessionEnded';
import LiveSessionVersionMismatch from './LiveSessionVersionMismatch';
import UploadModal from './UploadModal';
import StorageManagementModal from './StorageManagementModal';
import ForkServerModal from './ForkServerModal';
import PrivacyServerWarning from './PrivacyServerWarning';
import PickSandboxModal from './PickSandboxModal';
import FeedbackModal from './FeedbackModal';
import NetlifyLogs from './NetlifyLogs';

import { SignInForTemplates } from './SignInForTemplates';
import { SurveyModal } from './SurveyModal';
import { useOvermind } from '@muggle/hooks';

const MoveSandboxFolderModal = Loadable(() =>
  import('./MoveSandboxFolderModal'),
);

const modals = {
  preferences: {
    Component: PreferencesModal,
    width: 900,
  },
  newSandbox: {
    Component: NewSandbox,
    width: 925,
  },
  share: {
    Component: ShareModal,
    width: 1200,
  },
  deployment: {
    Component: DeploymentModal,
    width: 750,
  },
  exportGithub: {
    Component: ExportGitHubModal,
    width: 400,
  },
  commit: {
    Component: CommitModal,
    width: 400,
  },
  signInForTemplates: {
    Component: SignInForTemplates,
    width: 400,
  },
  pr: {
    Component: PRModal,
    width: 400,
  },
  netlifyLogs: {
    Component: NetlifyLogs,
    width: 750,
  },
  deleteDeployment: {
    Component: DeleteDeploymentModal,
    width: 400,
  },
  deleteSandbox: {
    Component: DeleteSandboxModal,
    width: 400,
  },
  pickSandbox: {
    Component: PickSandboxModal,
    width: 600,
  },
  deleteProfileSandbox: {
    Component: DeleteProfileSandboxModal,
    width: 400,
  },
  emptyTrash: {
    Component: EmptyTrash,
    width: 400,
  },
  selectSandbox: {
    Component: SelectSandboxModal,
    width: 600,
  },
  searchDependencies: {
    Component: SearchDependenciesModal,
    width: 600,
  },
  liveSessionEnded: {
    Component: LiveSessionEnded,
    width: 600,
  },
  liveVersionMismatch: {
    Component: LiveSessionVersionMismatch,
    width: 600,
  },
  uploading: {
    Component: UploadModal,
    width: 600,
  },
  storageManagement: {
    Component: StorageManagementModal,
    width: 800,
  },
  forkServerModal: {
    Component: ForkServerModal,
    width: 500,
  },
  privacyServerWarning: {
    Component: PrivacyServerWarning,
    width: 400,
  },
  moveSandbox: {
    Component: MoveSandboxFolderModal,
    width: 350,
  },
  feedback: {
    Component: FeedbackModal,
    width: 450,
  },
  userSurvey: {
    Component: SurveyModal,
    width: 850,
  },
};

export default function() {
  const { state, actions } = useOvermind();
  const [theme, setTheme] = React.useState({ colors: {}, vscodeTheme: codesandbox });

  const customVSCodeTheme = state.preferences.settings.customVSCodeTheme;
  const sandbox = state.editor.currentSandbox;
  const templateDef = sandbox && getTemplateDefinition(sandbox.template);
  const modal = state.currentModal && modals[state.currentModal];

  React.useEffect(() => {
    let aborted = false;
    getVSCodeTheme('', customVSCodeTheme)
      .then(theme => {
        if (aborted) return null;
        setTheme(theme);
      })
      .catch(console.error);

    return () => {
      aborted = true;
    };
  }, [customVSCodeTheme]);

  return (
    <ThemeProvider
      theme={{
        templateColor: templateColor(sandbox, templateDef),
        templateBackgroundColor: templateDef && templateDef.backgroundColor,
        ...theme,
      }}
    >
      <Modal
        isOpen={Boolean(modal)}
        width={modal && modal.width}
        onClose={isKeyDown => actions.modalClosed({ isKeyDown })}
      >
        {modal
          ? React.createElement(modal.Component, {
            closeModal: () => actions.modalClosed({ isKeyDown: false }),
          })
          : null}
      </Modal>
    </ThemeProvider>
  );
}
