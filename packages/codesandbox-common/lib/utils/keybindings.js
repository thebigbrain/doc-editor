"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeKey = normalizeKey;
exports.formatKey = formatKey;
exports.KEYBINDINGS = void 0;

var _platform = require("./platform");

var metaKey = _platform.isMac ? _platform.isIOS ? 'Alt' : 'Meta' : 'Alt';
var metaOrCtrlKey = _platform.isMac ? _platform.isIOS ? 'Alt' : 'Meta' : 'Control';
var ctrlOrAltKey = _platform.isIOS ? 'Alt' : 'Control'; // String.fromCharCode receives UTF-16 code units, but the keyCode represents the actual
// "physical" key on the keyboard. For this reason it's sketchy (some do match) to
// String.fromCharCode(e.keyCode) so we have this table with the correct mapping.
// KeyCode is a weird spec (it is a key event api after all) but it's defined in a way that
// it's i18n safe: In the US keyboard "," and "<" are on the same physical key so they
// both have keyCode 188. One might expect this will break in non-US keyboards since
// these characters are in different physical keys, however, the spec is defined in a way
// that no matter which physical key the "," and the "<" are in, they'll always be keyCode 188.
// http://www.javascripter.net/faq/keycodes.htm

var keyCodeMapping = {
  '188': ','
};

function normalizeKey(e) {
  if (e.key) {
    if (e.key.split('').length === 1) {
      var key;

      if (Object.prototype.hasOwnProperty.call(keyCodeMapping, e.keyCode)) {
        key = keyCodeMapping[e.keyCode];
      } else {
        key = String.fromCharCode(e.keyCode).toUpperCase();
      }

      if (key === ' ') {
        return 'Space';
      }

      return key;
    }

    return e.key;
  }

  return undefined;
}

function formatKey(key) {
  switch (key) {
    case 'Meta':
      {
        if (_platform.isMac) {
          return '⌘';
        }

        return 'Win';
      }

    case 'Control':
      return 'Ctrl';

    case ' ':
      return 'Space';

    case 'Shift':
      return '⇧';

    default:
      if (key.split('').length === 1) {
        return key.toUpperCase();
      }

      return key;
  }
}

var KEYBINDINGS = {
  'editor.open-quick-actions': {
    title: 'Open Quick Actions',
    type: 'View',
    bindings: [[metaOrCtrlKey, 'Shift', 'P']],
    signal: 'editor.quickActionsOpened'
  },
  workspace: {
    title: 'Toggle Sidebar',
    type: 'View',
    bindings: [[metaOrCtrlKey, 'B']],
    signal: 'workspace.toggleCurrentWorkspaceItem'
  },
  'editor.close-tab': {
    title: 'Close Current Tab',
    type: 'View',
    bindings: [[ctrlOrAltKey, 'W']],
    signal: 'editor.tabClosed',
    payload: function payload(state) {
      return {
        tabIndex: state.editor.tabs.filter(function (x) {
          return x;
        }).findIndex(function (t) {
          return t.moduleId === state.currentModuleId;
        })
      };
    }
  },
  'editor.zen-mode': {
    title: 'Toggle Zen Mode',
    type: 'View',
    bindings: [[metaKey, 'K', 'Z']],
    signal: 'preferences.settingChanged',
    payload: function payload(state) {
      return {
        name: 'zenMode',
        value: !state.preferences.settings.zenMode
      };
    }
  },
  'editor.toggle-console': {
    title: 'Toggle Dev Tools',
    type: 'View',
    bindings: [[metaKey, 'K', 'D']],
    signal: 'preferences.devtoolsToggled'
  },
  'editor.open-preferences': {
    title: 'Open Preferences',
    type: 'View',
    bindings: [[metaOrCtrlKey, ',']],
    signal: 'modalOpened',
    payload: {
      modal: 'preferences'
    }
  },
  'source.dependencies.open': {
    title: 'Add Dependency',
    type: 'Source',
    bindings: [],
    signal: 'modalOpened',
    payload: {
      modal: 'searchDependencies'
    }
  },
  'source.modules.prettify': {
    title: 'Prettify Current File',
    type: 'Source',
    bindings: [],
    signal: 'editor.prettifyClicked',
    payload: function payload(state) {
      return {
        moduleShortid: state.editor.currentModule.shortid
      };
    }
  },
  'source.modules.save': {
    title: 'Save Current File',
    type: 'Source',
    bindings: [[metaOrCtrlKey, 'S']],
    signal: 'editor.codeSaved',
    payload: function payload(state) {
      return {
        moduleShortid: state.editor.currentModule.shortid
      };
    }
  },
  'source.modules.save-all': {
    title: 'Save All Modified Files',
    type: 'Source',
    bindings: [[metaOrCtrlKey, 'Shift', 'S']],
    signal: 'editor.saveClicked'
  }
};
exports.KEYBINDINGS = KEYBINDINGS;