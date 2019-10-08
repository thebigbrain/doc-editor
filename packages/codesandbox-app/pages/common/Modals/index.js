import React, { Component } from 'react'
import { inject, observer } from 'app/componentConnectors'
import { ThemeProvider } from 'styled-components'
import Modal from 'app/components/Modal'
import Loadable from 'app/utils/Loadable'
import { templateColor } from 'app/utils/template-color'
import getTemplateDefinition from '@codesandbox/common/lib/templates'
import codesandbox from '@codesandbox/common/lib/themes/codesandbox.json'
import getVSCodeTheme from 'app/src/app/pages/Sandbox/Editor/utils/get-vscode-theme'

import NewSandbox from './NewSandbox/index'
import PreferencesModal from './PreferencesModal/index'
import DeleteSandboxModal from './DeleteSandboxModal/index'
import DeleteDeploymentModal from './DeleteDeploymentModal/index'
import ShareModal from './ShareModal/index'
import DeploymentModal from './DeploymentModal/index'
import ExportGitHubModal from './ExportGitHubModal/index'
import CommitModal from './CommitModal/index'
import PRModal from './PRModal/index'
import SelectSandboxModal from './SelectSandboxModal/index'
import SearchDependenciesModal from './SearchDependenciesModal/index'
import DeleteProfileSandboxModal from './DeleteProfileSandboxModal/index'
import EmptyTrash from './EmptyTrash/index'
import LiveSessionEnded from './LiveSessionEnded/index'
import LiveSessionVersionMismatch from './LiveSessionVersionMismatch/index'
import UploadModal from './UploadModal/index'
import StorageManagementModal from './StorageManagementModal/index'
import ForkServerModal from './ForkServerModal/index'
import PrivacyServerWarning from './PrivacyServerWarning/index'
import PickSandboxModal from './PickSandboxModal/index'
import FeedbackModal from './FeedbackModal/index'
import NetlifyLogs from './NetlifyLogs/index'
// eslint-disable-next-line
import SignInForTemplates from './SignInForTemplates/index.ts'
import { SurveyModal } from './SurveyModal/index'

const MoveSandboxFolderModal = Loadable(() =>
  import('./MoveSandboxFolderModal/index'),
)

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
}

class Modals extends Component {
  state = {
    theme: {
      colors: {},
      vscodeTheme: codesandbox,
    },
    customVSCodeTheme: this.props.store.preferences.settings.customVSCodeTheme,
  }
  loadTheme = async () => {
    const { customVSCodeTheme } = this.props.store.preferences.settings

    try {
      const theme = await getVSCodeTheme('', customVSCodeTheme)
      this.setState({ theme, customVSCodeTheme })
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    this.loadTheme()
  }

  componentDidUpdate() {
    if (
      this.props.store.preferences.settings.customVSCodeTheme !==
      this.state.customVSCodeTheme
    ) {
      this.loadTheme()
    }
  }

  render() {
    const { signals, store } = this.props
    const sandbox = store.editor.currentSandbox
    const templateDef = sandbox && getTemplateDefinition(sandbox.template)

    const modal = store.currentModal && modals[store.currentModal]

    return (
      <ThemeProvider
        theme={{
          templateColor: templateColor(sandbox, templateDef),
          templateBackgroundColor: templateDef && templateDef.backgroundColor,
          ...this.state.theme,
        }}
      >
        <Modal
          isOpen={Boolean(modal)}
          width={modal && modal.width}
          onClose={isKeyDown => signals.modalClosed({ isKeyDown })}
        >
          {modal
            ? React.createElement(modal.Component, {
              closeModal: () => signals.modalClosed({ isKeyDown: false }),
            })
            : null}
        </Modal>
      </ThemeProvider>
    )
  }
}

export default inject('store', 'signals')(observer(Modals))
