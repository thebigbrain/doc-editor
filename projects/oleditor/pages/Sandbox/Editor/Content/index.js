import React, {useEffect, useState, useRef} from 'react';
import { json } from 'overmind';
import { ThemeProvider } from 'styled-components';
import { Prompt } from 'react-router-dom';
import { TextOperation } from 'ot';
import getTemplateDefinition from '@csb/common/lib/templates';
import SplitPane from 'react-split-pane';

import { CodeEditor } from '~/components/CodeEditor';

import preventGestureScroll, { removeListener } from './prevent-gesture-scroll';
import Tabs from './Tabs';
import { useOvermind } from '@muggle/hooks';

const settings = state => ({
  fontFamily: state.preferences.settings.fontFamily,
  fontSize: state.preferences.settings.fontSize,
  lineHeight: state.preferences.settings.lineHeight,
  autoCompleteEnabled: state.preferences.settings.autoCompleteEnabled,
  autoDownloadTypes: state.preferences.settings.autoDownloadTypes,
  vimMode: state.preferences.settings.vimMode,
  lintEnabled: state.preferences.settings.lintEnabled,
  codeMirror: state.preferences.settings.codeMirror,
  tabWidth: state.preferences.settings.prettierConfig
    ? state.preferences.settings.prettierConfig.tabWidth || 2
    : 2,
  enableLigatures: state.preferences.settings.enableLigatures,
  experimentVSCode: state.preferences.settings.experimentVSCode,
  prettierConfig: state.preferences.settings.prettierConfig,
  forceRefresh: state.preferences.settings.forceRefresh,
});

export default function EditorPreview(props) {
  const { state, actions } = useOvermind();
  const [bounds, setBounds] = useState({ width: null, height: null });
  let contentNode = useRef(null);
  let currentRef = useRef(null);

  console.log(currentRef);

  const getBounds = el => {
    el = el || currentRef.current;
    if (el) {
      const { width, height } = el.getBoundingClientRect();
      console.log(width, height);
      if (width !== bounds.width || height !== bounds.height) {
        setBounds({ width, height });
      }
    }
  };

  const onInitialized = editor => {
    let isChangingSandbox = false;

    useEffect((newSandbox) => {
      isChangingSandbox = !!editor.changeSandbox;

      // Put in a timeout so we allow the actions after the fork to execute first as well.
      setTimeout(() => {
        if (editor.changeSandbox) {
          const { parsed } = state.editor.parsedConfigurations.package;
          editor
            .changeSandbox(
              newSandbox,
              state.editor.currentModule,
              // eslint-disable-next-line
              parsed
                ? parsed.dependencies
                : newSandbox.npmDependencies.toJS
                ? newSandbox.npmDependencies.toJS()
                : json(newSandbox.npmDependencies),
            )
            .then(() => {
              isChangingSandbox = false;
            });
        }
      });
    }, [state.editor.currentSandbox]);

    useEffect(errors => {
      if (editor.setErrors) {
        editor.setErrors(errors);
      }
    }, [state.editor.errors]);

    useEffect(corrections => {
      if (editor.setCorrections) {
        editor.setCorrections(corrections);
      }
    }, [state.editor.corrections]);

    useEffect(() => {
      if (isChangingSandbox) {
        return;
      }
      if (editor.updateModules) {
        editor.updateModules();
      }
    }, [detectStructureChange]);

    useEffect(newSettings => {
      if (editor.changeSettings) {
        editor.changeSettings(newSettings);
      }
    }, Object.values(settings(state)));

    useEffect(
      () => {
        getBounds();
      },
      [
        state.preferences.settings.zenMode,
        state.workspace.workspaceHidden,
        state.editor.previewWindowOrientation,
      ],
    );

    useEffect(
      () => {
        const { parsed } = state.editor.parsedConfigurations.package;
        if (parsed) {
          const { dependencies = {} } = parsed;

          if (editor.changeDependencies) {
            editor.changeDependencies(dependencies);
          }
        }
      },
      [state.editor.parsedConfigurations.package]
    );

    useEffect(
      () => {
        if (state.editor.parsedConfigurations.typescript) {
          const { parsed } = state.editor.parsedConfigurations.typescript;
          if (parsed) {
            if (editor.setTSConfig) {
              editor.setTSConfig(parsed);
            }
          }
        }
      },
      [state.editor.parsedConfigurations.typescript]
    );

    useEffect(
      () => {
        if (editor.setReceivingCode) {
          editor.setReceivingCode(state.live.receivingCode);
        }
      },
      [state.live.receivingCode]
    );

    useEffect(
      () => {
        if (editor.moduleSyncedChanged) {
          editor.moduleSyncedChanged();
        }
      },
      state.editor.changedModuleShortids
    );

    useEffect(
      () => {
        if (state.live.isLive) {
          if (state.editor.pendingOperations) {
            if (editor.setReceivingCode) {
              editor.setReceivingCode(true);
            }
            if (editor.applyOperations) {
              editor.applyOperations(state.editor.pendingOperations);
            } else {
              try {
                state.editor.pendingOperations.forEach(
                  (operationJSON, moduleShortid) => {
                    const operation = TextOperation.fromJSON(operationJSON);

                    const module = state.currentSandbox.modules.find(
                      m => m.shortid === moduleShortid,
                    );

                    if (!module) {
                      throw new Error(
                        'Cannot find module with shortid: ' + moduleShortid,
                      );
                    }

                    actions.editor.codeChanged({
                      code: operation.apply(module.code || ''),
                      moduleShortid: module.shortid,
                    });
                  },
                );
              } catch (e) {
                console.error(e);
              }
            }
            if (editor.setReceivingCode) {
              editor.setReceivingCode(false);
            }
            actions.live.onOperationApplied();
          }
        }
      },
      [state.editor.pendingOperations]
    );

    const updateUserSelections = () => {
      if (state.editor.pendingUserSelections) {
        if (editor.updateUserSelections) {
          if (state.live.isLive) {
            requestAnimationFrame(() => {
              editor.updateUserSelections(state.editor.pendingUserSelections);
              actions.live.onSelectionDecorationsApplied();
            });
          } else {
            actions.live.onSelectionDecorationsApplied();
          }
        }
      }
    };
    useEffect(updateUserSelections, state.editor.pendingUserSelections);

    useEffect(([newModule]) => {
      if (isChangingSandbox) {
        return;
      }

      const editorModule = editor.currentModule;
      const currentSandbox = editor.sandbox;
      const { changeModule } = editor;
      if (
        (!editorModule || newModule.id !== editorModule.id) &&
        changeModule
      ) {
        const errors = state.editor.errors.map(e => e);
        const corrections = state.editor.corrections.map(e => e);

        if (
          currentSandbox.id !== state.editor.currentSandbox.id &&
          editor.changeSandbox
        ) {
          // This means that the sandbox will be updated soon in the editor itself, which will
          // cause the module to change anyway. We don't want to continue here because the new sandbox
          // has not yet been initialized in the editor, but it's trying already to update the module.
          return;
        }

        changeModule(newModule, errors, corrections);
      } else if (editor.changeCode) {
        // Only code changed from outside the editor
        editor.changeCode(newModule.code || '', newModule.id);
      }
    },[state.editor.currentModule, state.editor.currentModule.code]);

    useEffect(() => {
      requestAnimationFrame(() => {
        getBounds();
      });
    }, [state.editor.previewWindowVisible]);
  };

  const detectStructureChange = ({ editor }) => {
    const sandbox = editor.currentSandbox;

    return String(
      sandbox.modules
        .map(module => module.id + module.directoryShortid + module.title)
        .concat(
          sandbox.directories.map(
            directory => directory.directoryShortid + directory.title,
          ),
        ),
    );
  };

  const sendTransforms = operation => {
    const { currentModuleShortid } = state.editor;

    actions.live.onTransformMade({
      moduleShortid: currentModuleShortid,
      operation: operation.toJSON(),
    });
  };

  const moveDevToolsTab = (prevPos, nextPos) => {
    actions.editor.onDevToolsTabMoved({ prevPos, nextPos });
  };

  const closeDevToolsTab = pos => {
    actions.editor.onDevToolsTabClosed({ pos });
  };

  useEffect(() => {}, [state.preferences.settings.codeMirror]);

  useEffect(() => {
    actions.editor.contentMounted();

    window.addEventListener('resize', getBounds);

    if (contentNode && contentNode.current) {
      preventGestureScroll(contentNode.current);
    }

    return () => {
      window.removeEventListener('resize', getBounds);

      if (contentNode && contentNode.current) {
        removeListener(contentNode.current);
      }
    };
  });

  const { currentModule } = state.editor;
  const notSynced = !state.editor.isAllModulesSynced;
  const sandbox = state.editor.currentSandbox;
  // const { preferences } = state;
  const { currentTab } = state.editor;

  const windowVisible = state.editor.previewWindowVisible;

  const { width: editorWidth, height: editorHeight } = bounds;

  const template = getTemplateDefinition(sandbox.template);

  const isReadOnly = () => {
    if (state.live.isLive) {
      if (
        !state.live.isCurrentEditor ||
        (state.live.roomInfo && state.live.roomInfo.ownerIds.length === 0)
      ) {
        return true;
      }
    }

    if (template.isServer) {
      if (!state.isLoggedIn || state.server.status !== 'connected') {
        return true;
      }
    }

    return false;
  };

  return (
    <ThemeProvider
      theme={{
        templateColor: template.color,
        templateBackgroundColor: template.backgroundColor,
      }}
    >
      <div
        id="workbench.main.container"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'visible', // For VSCode Context Menu
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={contentNode}
      >
        <Prompt
          when={notSynced && !state.editor.isForkingSandbox}
          message={() =>
            'You have not saved this sandbox, are you sure you want to navigate away?'
          }
        />
        <div
            ref={currentRef}
            style={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '100%',
              width: '100%',
              marginTop: 0,
            }}
          >
            {!state.preferences.settings.experimentVSCode && <Tabs/>}
            <CodeEditor
              style={{
                top: state.preferences.settings.experimentVSCode ? 0 : 35,
              }}
              onInitialized={onInitialized}
              sandbox={sandbox}
              currentTab={currentTab}
              currentModule={currentModule}
              isModuleSynced={shortId =>
                !state.editor.changedModuleShortids.includes(shortId)
              }
              width={editorWidth}
              height={editorHeight}
              settings={settings(state)}
              sendTransforms={sendTransforms}
              readOnly={isReadOnly()}
              isLive={state.live.isLive}
              onCodeReceived={actions.live.onCodeReceived}
              onSelectionChanged={actions.live.onSelectionChanged}
              onNpmDependencyAdded={name => {
                if (sandbox.owned) {
                  actions.editor.addNpmDependency({ name, isDev: true });
                }
              }}
              onChange={(code, moduleShortid) =>
                actions.editor.codeChanged({
                  code,
                  moduleShortid: moduleShortid || currentModule.shortid,
                  noLive: true,
                })
              }
              onModuleChange={moduleId =>
                actions.editor.moduleSelected({ id: moduleId })
              }
              onModuleStateMismatch={actions.live.onModuleStateMismatch}
              onSave={code =>
                actions.editor.codeSaved({
                  code,
                  moduleShortid: currentModule.shortid,
                })
              }
              tsconfig={
                state.editor.parsedConfigurations.typescript &&
                state.editor.parsedConfigurations.typescript.parsed
              }
            />
          </div>
      </div>
    </ThemeProvider>
  );
}
