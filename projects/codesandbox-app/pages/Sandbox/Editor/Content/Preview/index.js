import React, {Component} from 'react'

import BasePreview from '@csb/common/lib/components/Preview'
import RunOnClick from '@csb/common/lib/components/RunOnClick'
import getTemplate from '@csb/common/lib/templates'
import {withOvermind} from "@muggle/hooks"


class PreviewComponent extends Component {
  state = {
    running: !this.props.runOnClick,
  };

  onPreviewInitialized = preview => {
    const disposeHandleProjectViewChange = this.props.reaction(
      ({ editor }) => editor.isInProjectView,
      this.handleProjectView.bind(this, preview),
    );
    const disposeHandleForcedRenders = this.props.reaction(
      ({ editor }) => editor.forceRender,
      this.handleExecuteCode.bind(this, preview),
    );
    const disposeHandleExternalResources = this.props.reaction(
      ({ editor }) => editor.currentSandbox.externalResources.length,
      this.handleExecuteCode.bind(this, preview),
    );
    const disposeHandleModuleSyncedChange = this.props.reaction(
      ({ editor }) => editor.isAllModulesSynced,
      this.handleModuleSyncedChange.bind(this, preview),
    );
    const disposeHandleCodeChange = this.props.reaction(
      ({ editor }) => String(editor.currentSandbox.modules.map(m => m.code)),
      () => {
        this.handleCodeChange(preview);
      },
    );
    const disposeHandleModuleChange = this.props.reaction(
      ({ editor }) => editor.currentModule,
      () => {
        if (!this.props.overmind.state.editor.isInProjectView) {
          this.handleCodeChange(preview);
        }
      },
    );
    const disposeHandleStructureChange = this.props.reaction(
      this.detectStructureChange,
      this.handleStructureChange.bind(this, preview),
    );
    const disposeDependenciesHandler = this.props.reaction(
      ({ editor }) =>
        editor.currentSandbox.npmDependencies.keys
          ? editor.currentSandbox.npmDependencies.keys().length
          : Object.keys(editor.currentSandbox.npmDependencies),
      this.handleDependenciesChange.bind(this, preview),
    );

    return () => {
      disposeHandleModuleChange();
      disposeHandleProjectViewChange();
      disposeHandleForcedRenders();
      disposeHandleExternalResources();
      disposeHandleModuleSyncedChange();
      disposeHandleCodeChange();
      disposeHandleStructureChange();
      disposeDependenciesHandler();
    };
  };

  detectStructureChange = ({ editor }) => {
    const sandbox = editor.currentSandbox;

    return String(
      sandbox.modules
        .map(module => module.directoryShortid + module.title)
        .concat(
          sandbox.directories.map(
            directory => directory.directoryShortid + directory.title,
          ),
        ),
    );
  };

  handleDependenciesChange = preview => {
    preview.handleDependenciesChange();
  };

  handleCodeChange = preview => {
    const {settings} = this.props.overmind.state.preferences
    const { isServer } = getTemplate(
      this.props.overmind.state.editor.currentSandbox.template,
    );
    if (!isServer && settings.livePreviewEnabled) {
      if (settings.instantPreviewEnabled) {
        preview.executeCodeImmediately();
      } else {
        preview.executeCode();
      }
    }
  };

  handleStructureChange = preview => {
    const {settings} = this.props.overmind.state.preferences
    if (settings.livePreviewEnabled) {
      if (settings.instantPreviewEnabled) {
        preview.executeCodeImmediately();
      } else {
        preview.executeCode();
      }
    }
  };

  handleModuleSyncedChange = (preview, change) => {
    const {settings} = this.props.overmind.state.preferences

    if (
      change &&
      (this.props.overmind.state.editor.currentSandbox.template === 'static' ||
        !settings.livePreviewEnabled)
    ) {
      preview.handleRefresh();
    }
  };

  handleExecuteCode = preview => {
    preview.executeCodeImmediately();
  };

  handleProjectView = preview => {
    this.forceUpdate(() => {
      preview.executeCodeImmediately();
    });
  };

  /**
   * Responsible for showing a message when something is happening with SSE. Only used
   * for server sandboxes right now, but we can extend it in the future. It would require
   * a better design if we want to use it for more though.
   */
  getOverlayMessage = () => {
    const {
      containerStatus,
      error,
      hasUnrecoverableError,
    } = this.props.overmind.state.server;

    if (containerStatus === 'hibernated') {
      return 'The container has been hibernated because of inactivity, you can start it by refreshing the browser.';
    }

    if (containerStatus === 'stopped') {
      return 'Restarting the sandbox...';
    }

    if (error && hasUnrecoverableError) {
      return 'A sandbox error occurred, you can refresh the page to restart the container.';
    }

    return undefined;
  };

  render() {
    const {options} = this.props
    const {state: store, actions: signals} = this.props.overmind

    const completelyHidden = !store.editor.previewWindowVisible;

    return this.state.running ? (
      <BasePreview
        onInitialized={this.onPreviewInitialized}
        sandbox={store.editor.currentSandbox}
        currentModule={store.editor.currentModule}
        settings={store.preferences.settings}
        initialPath={store.editor.initialPath}
        url={options.url}
        isInProjectView={store.editor.isInProjectView}
        onClearErrors={() => signals.editor.errorsCleared()}
        onAction={action => signals.editor.previewActionReceived({ action })}
        hide={this.props.hidden}
        noPreview={completelyHidden}
        onToggleProjectView={() => signals.editor.projectViewToggled()}
        isResizing={store.editor.isResizing}
        overlayMessage={this.getOverlayMessage()}
      />
    ) : (
      <RunOnClick
        onClick={() => {
          this.setState({ running: true });
        }}
      />
    );
  }
}

export const Preview = PreviewComponent
