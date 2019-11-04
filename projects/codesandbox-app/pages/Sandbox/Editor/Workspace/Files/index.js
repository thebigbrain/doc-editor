import * as React from 'react';
import { getModulePath } from '@csb/common/lib/sandbox/modules';

import DirectoryEntry from './DirectoryEntry';
import EditIcons from './DirectoryEntry/Entry/EditIcons';
import { useOvermind } from '@muggle/hooks';

export default function Files(props) {
  const { state, actions } = useOvermind();
  const sandbox = state.editor.currentSandbox;

  let createModule = null;
  let createDirectory = null;
  let uploadFile = null;

  const onDownload = () => {
    actions.editor.createZipClicked();
  };

  const _getModulePath = (moduleId) => {
    try {
      const sandbox = state.editor.currentSandbox;
      return getModulePath(sandbox.modules, sandbox.directories, moduleId);
    } catch (e) {
      return '';
    }
  };

  return (
    <DirectoryEntry
      root
      getModulePath={_getModulePath}
      title={sandbox.title || 'Project'}
      signals={
        actions /* TODO: Just pass what is needed by the DragDrop */
      }
      initializeProperties={({
                               onCreateModuleClick,
                               onCreateDirectoryClick,
                               onUploadFileClick,
                             }) => {
        createModule = onCreateModuleClick;
        createDirectory = onCreateDirectoryClick;
        uploadFile = onUploadFileClick;

        if (props.setEditActions) {
          props.setEditActions(
            <EditIcons
              hovering
              forceShow={window.__isTouch}
              onCreateFile={createModule}
              onCreateDirectory={createDirectory}
              onDownload={onDownload}
              onUploadFile={
                state.isLoggedIn && sandbox.privacy === 0
                  ? uploadFile
                  : undefined
              }
            />,
          );
        }
      }}
      depth={-1}
      id={null}
      shortid={null}
    />
  );
}
