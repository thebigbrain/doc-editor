import { isIOS } from '@codesandbox/common/lib/utils/platform';
import { KEYBINDINGS } from '@codesandbox/common/lib/utils/keybindings';

export const state = {
  settings: {
    autoResize: true,
    enableEslint: true,
    forceRefresh: false,
    prettifyOnSaveEnabled: true,
    zenMode: false,
    autoCompleteEnabled: true,
    livePreviewEnabled: true,
    lintEnabled: true,
    instantPreviewEnabled: false,
    fontSize: 14,
    fontFamily: 'Dank Mono',
    lineHeight: 1.5,
    clearConsoleEnabled: true,
    autoDownloadTypes: true,
    codeMirror: isIOS,
    keybindings: [],
    newPackagerExperiment: false,
    prettierConfig: {
      fluid: false,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: false,
      trailingComma: 'none',
      bracketSpacing: true,
      jsxBracketSameLine: false,
    },
    jsxBracketSameLine: false,
    // TODO: Should these be her?
    printWidth: 80,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
    vimMode: false,
    // Windows has problems with calculating characters widths when ligatures
    // are disabled, however there is a weird character when you have 'fi' in
    // Menlo. So a temporary fix is to only enable this for Windows.
    enableLigatures: navigator.platform.indexOf('Win') > -1,

    customVSCodeTheme: null,
    manualCustomVSCodeTheme: null,
    experimentVSCode: !isIOS,
  },
  hideNavigation: false,
  showModal: false,
  isLoadingPaymentDetails: true,
  paymentDetailError: null,
  paymentDetails: null,
  itemId: 'appearance',
  showEditor: true,
  showPreview: true,
  showDevtools: false,
  runOnClick: false,
  keybindings: currentState => {
    const userBindings = currentState.settings.keybindings;
    const userBindingsMap = userBindings.reduce(
      (bindings, binding) => ({
        ...bindings,
        [binding.key]: binding.bindings,
      }),
      {},
    );

    return Object.keys(KEYBINDINGS).reduce(
      (currentBindings, key) => ({
        ...currentBindings,
        [key]: {
          ...KEYBINDINGS[key],
          ...(key in userBindingsMap ? { bindings: userBindingsMap[key] } : {}),
        },
      }),
      {},
    );
  },
};
