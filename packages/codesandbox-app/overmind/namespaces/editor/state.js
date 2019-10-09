import {
  Module,
  WindowOrientation,
} from '@codesandbox/common/lib/types';
import { generateFileFromSandbox } from '@codesandbox/common/lib/templates/configuration/package-json';
import { dirname } from 'path';
import { getPreviewTabs } from '@codesandbox/common/lib/templates/devtools';
import immer from 'immer';
import { getSandboxOptions } from '@codesandbox/common/lib/url';
import { getDirectoryPath, getModulePath } from '@codesandbox/common/lib/sandbox/modules';
import getTemplate from '@codesandbox/common/lib/templates';
import { Derive } from '~/overmind';
import { parseConfigurations } from '../../utils/parse-configurations';
import { mainModule as getMainModule } from '../../utils/main-module';

export const state = {
  sandboxes: {},
  currentId: null,
  isForkingSandbox: false,
  currentModuleShortid: null,
  mainModuleShortid: null,
  isLoading: true,
  notFound: false,
  error: null,
  isResizing: false,
  changedModuleShortids: [],
  currentTabId: null,
  tabs: [],
  errors: [],
  sessionFrozen: true,
  corrections: [],
  pendingOperations: {},
  pendingUserSelections: [],
  isInProjectView: false,
  forceRender: 0,
  initialPath: '/',
  highlightedLines: [],
  isUpdatingPrivacy: false,
  quickActionsOpen: false,
  previewWindowVisible: true,
  statusBar: true,
  previewWindowOrientation:
    window.innerHeight / window.innerWidth > 0.9
      ? WindowOrientation.HORIZONTAL
      : WindowOrientation.VERTICAL,

  /**
   * Normally we save this code in a file (.codesandbox/workspace.json), however, when someone
   * doesn't own a sandbox and changes the UI we don't want to fork the sandbox (yet). That's
   * why we introduce this field until we have datasources. When we have datasources we can store
   * the actual content in the localStorage.
   */
  workspaceConfigCode: '',
  currentDevToolsPosition: {
    devToolIndex: 0,
    tabPosition: 0,
  },
  currentSandbox: ({ sandboxes, currentId }) => sandboxes[currentId],
  isAllModulesSynced: ({ changedModuleShortids }) =>
    !changedModuleShortids.length,
  currentModule: ({ currentSandbox, currentModuleShortid }) =>
    (currentSandbox &&
      currentSandbox.modules.find(
        module => module.shortid === currentModuleShortid,
      )) ||
    ({} as Module),
  modulesByPath: ({ currentSandbox }) => {
    const modulesObject = {};

    if (!currentSandbox) {
      return modulesObject;
    }

    currentSandbox.modules.forEach(m => {
      const path = getModulePath(
        currentSandbox.modules,
        currentSandbox.directories,
        m.id,
      );
      if (path) {
        modulesObject[path] = { ...m, type: 'file' };
      }
    });

    currentSandbox.directories.forEach(d => {
      const path = getDirectoryPath(
        currentSandbox.modules,
        currentSandbox.directories,
        d.id,
      );

      // If this is a single directory with no children
      if (!Object.keys(modulesObject).some(p => dirname(p) === path)) {
        modulesObject[path] = { ...d, type: 'directory' };
      }
    });

    return modulesObject;
  },
  currentTab: ({ currentTabId, currentModuleShortid, tabs }) => {
    if (currentTabId) {
      const foundTab = tabs.find(tab => 'id' in tab && tab.id === currentTabId);

      if (foundTab) {
        return foundTab;
      }
    }

    return tabs.find(
      tab =>
        'moduleShortid' in tab && tab.moduleShortid === currentModuleShortid,
    );
  },
  /**
   * We have two types of editors in CodeSandbox: an editor focused on smaller projects and
   * an editor that works with bigger projects that run on a container. The advanced editor
   * only has added features, so it's a subset on top of the existing editor.
   */
  isAdvancedEditor: ({ currentSandbox }) => {
    if (!currentSandbox) {
      return false;
    }

    const { isServer } = getTemplate(currentSandbox.template);

    return isServer && currentSandbox.owned;
  },
  parsedConfigurations: ({ currentSandbox }) =>
    currentSandbox ? parseConfigurations(currentSandbox) : null,
  mainModule: ({ currentSandbox, parsedConfigurations }) =>
    currentSandbox ? getMainModule(currentSandbox, parsedConfigurations) : null,
  currentPackageJSON: ({ currentSandbox }) => {
    if (!currentSandbox) {
      return null;
    }

    const module = currentSandbox.modules.find(
      m => m.directoryShortid == null && m.title === 'package.json',
    );

    return module;
  },
  currentPackageJSONCode: ({ currentSandbox, currentPackageJSON }) => {
    if (!currentPackageJSON) {
      return null;
    }

    return currentPackageJSON.code
      ? currentPackageJSON.code
      : generateFileFromSandbox(currentSandbox);
  },
  shouldDirectoryBeOpen: ({
                            currentSandbox,
                            currentModule,
                          }) => directoryShortid => {
    const { modules, directories } = currentSandbox;
    const currentModuleId = currentModule.id;
    const currentModuleParents = getModuleParents(
      modules,
      directories,
      currentModuleId,
    );
    const isParentOfModule = currentModuleParents.includes(directoryShortid);

    return isParentOfModule;
  },
  devToolTabs: ({
                  currentSandbox: sandbox,
                  parsedConfigurations,
                  workspaceConfigCode: intermediatePreviewCode,
                }) => {
    if (!sandbox) {
      return [];
    }

    const views = getPreviewTabs(
      sandbox,
      parsedConfigurations,
      intermediatePreviewCode,
    );

    // Do it in an immutable manner, prevents changing the original object
    return immer(views, draft => {
      const sandboxConfig = sandbox.modules.find(
        x => x.directoryShortid == null && x.title === 'sandbox.config.json',
      );
      let view = 'browser';
      if (sandboxConfig) {
        try {
          view = JSON.parse(sandboxConfig.code || '').view || 'browser';
        } catch (e) {
          /* swallow */
        }
      }

      const sandboxOptions = getSandboxOptions(location.href);
      if (
        sandboxOptions.previewWindow &&
        (sandboxOptions.previewWindow === 'tests' ||
          sandboxOptions.previewWindow === 'console')
      ) {
        // Backwards compatibility for ?previewwindow=

        view = sandboxOptions.previewWindow;
      }

      if (view !== 'browser') {
        // Backwards compatibility for sandbox.config.json
        if (view === 'console') {
          draft[0].views = draft[0].views.filter(
            t => t.id !== 'codesandbox.console',
          );
          draft[0].views.unshift({ id: 'codesandbox.console' });
        } else if (view === 'tests') {
          draft[0].views = draft[0].views.filter(
            t => t.id !== 'codesandbox.tests',
          );
          draft[0].views.unshift({ id: 'codesandbox.tests' });
        }
      }
    });
  },
};

// This should be moved somewhere else
function getModuleParents(modules, directories, id) {
  const module = modules.find(moduleEntry => moduleEntry.id === id);

  if (!module) return [];

  let directory = directories.find(
    directoryEntry => directoryEntry.shortid === module.directoryShortid,
  );
  let directoryIds = [];
  while (directory != null) {
    directoryIds = [...directoryIds, directory.id];
    directory = directories.find(
      directoryEntry => directoryEntry.shortid === directory.directoryShortid, // eslint-disable-line
    );
  }

  return directoryIds;
}
