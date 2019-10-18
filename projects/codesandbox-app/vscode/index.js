import { convertTypeToStatus, notificationState } from '@csb/common/lib/utils/notifications';
import { blocker } from '~/utils/blocker';
import { KeyCode, KeyMod } from './keyCodes';
import bootstrap from './dev-bootstrap';
import { MenuId } from './menus';
const context = window;
/**
 * Handles the VSCode instance for the whole app. The goal is to deprecate/remove this service at one point
 * and let the VSCode codebase handle the initialization of all elements. We are going for a gradual approach though,
 * that's why in the first phase we let the CodeSandbox application handle all the initialization of the VSCode
 * parts.
 */
class VSCodeManager {
    constructor() {
        this.statusbarPart = blocker();
        this.menubarPart = blocker();
        this.commandService = blocker();
        this.extensionService = blocker();
        this.extensionEnablementService = blocker();
    }
    acquireController(controller) {
        this.controller = controller;
        this.addWorkbenchActions();
    }
    loadScript(scripts, isVSCode = true, cb) {
        bootstrap(isVSCode, scripts)(cb);
    }
    addNotification(message, type, notification) {
        notificationState.addNotification({
            message,
            status: convertTypeToStatus(type),
            ...notification,
        });
    }
    /**
     * Initialize the base VSCode editor, this includes registering all the services in VSCode.
     */
    initializeEditor(container, customEditorAPI, cb) {
        if (this.serviceCache) {
            const [{ IConfigurationService }, { IInstantiationService }] = [
                context.require('vs/platform/configuration/common/configuration'),
                context.require('vs/platform/instantiation/common/instantiation'),
            ];
            const instantiationService = this.serviceCache.get(IInstantiationService);
            instantiationService.invokeFunction(accessor => {
                const workspaceService = accessor.get(IConfigurationService);
                workspaceService.initialize(context.monaco.editor.getDefaultWorkspace());
                cb(accessor);
            });
            return;
        }
        const [{ CodeSandboxService }, { CodeSandboxConfigurationUIService }, { ICodeSandboxEditorConnectorService }, { IStatusbarService }, { ICommandService }, { SyncDescriptor }, { IInstantiationService }, { IExtensionService }, { IExtensionEnablementService },] = [
            context.require('vs/codesandbox/services/codesandbox/browser/codesandboxService'),
            context.require('vs/codesandbox/services/codesandbox/configurationUIService'),
            context.require('vs/codesandbox/services/codesandbox/common/codesandboxEditorConnector'),
            context.require('vs/platform/statusbar/common/statusbar'),
            context.require('vs/platform/commands/common/commands'),
            context.require('vs/platform/instantiation/common/descriptors'),
            context.require('vs/platform/instantiation/common/instantiation'),
            context.require('vs/workbench/services/extensions/common/extensions'),
            context.require('vs/platform/extensionManagement/common/extensionManagement'),
        ];
        context.monaco.editor.create(container, {
            codesandboxService: i => new SyncDescriptor(CodeSandboxService, [this.controller, this]),
            codesandboxConfigurationUIService: i => new SyncDescriptor(CodeSandboxConfigurationUIService, [
                customEditorAPI,
            ]),
        }, ({ serviceCollection }) => {
            const instantiationService = serviceCollection.get(IInstantiationService);
            instantiationService.invokeFunction(accessor => {
                this.serviceCache = serviceCollection;
                // Initialize status bar
                const statusbarPart = accessor.get(IStatusbarService);
                this.statusbarPart.resolve(statusbarPart);
                // Initialize menu bar
                const menubarPart = accessor.get('menubar');
                this.menubarPart.resolve(menubarPart);
                // Initialize command service
                const commandService = accessor.get(ICommandService);
                this.commandService.resolve(commandService);
                const extensionService = accessor.get(IExtensionService);
                this.extensionService.resolve(extensionService);
                const extensionEnablementService = accessor.get(IExtensionEnablementService);
                this.extensionEnablementService.resolve(extensionEnablementService);
                // Initialize these services
                accessor.get(CodeSandboxConfigurationUIService);
                accessor.get(ICodeSandboxEditorConnectorService);
                cb(accessor);
            });
        });
    }
    async getStatusbarPart() {
        return this.statusbarPart.promise;
    }
    async getMenubarPart() {
        return this.menubarPart.promise;
    }
    async getCommandService() {
        return this.commandService.promise;
    }
    /**
     * Run a command registered in VSCode
     *
     * @param id VSCode ID of the command
     * @param args Extra arguments
     */
    async runCommand(id, ...args) {
        const commandService = await this.getCommandService();
        return commandService.executeCommand(id, ...args);
    }
    appendMenuItem(menubarId, item) {
        context.monaco.editor.appendMenuItem(menubarId, item);
    }
    addWorkbenchAction({ id, label, commandLabel = label, category = 'CodeSandbox', run, keybindings = { primary: 0 }, }) {
        context.monaco.editor.addWorkbenchActions({
            id,
            label,
            commandLabel,
            run,
            category,
            keybindings,
        });
    }
    async disableExtension(id) {
        const extensionService = await this.extensionService.promise;
        const extensionEnablementService = await this.extensionEnablementService
            .promise;
        const extensionDescription = await extensionService.getExtension(id);
        if (extensionDescription) {
            const { toExtension } = context.require('vs/workbench/services/extensions/common/extensions');
            const extension = toExtension(extensionDescription);
            extensionEnablementService.setEnablement([extension], 0);
        }
    }
    async enableExtension(id) {
        const extensionEnablementService = await this.extensionEnablementService
            .promise;
        const extensionIdentifier = (await extensionEnablementService.getDisabledExtensions()).find(ext => ext.id === id);
        if (extensionIdentifier) {
            // Sadly we have to call a private api for this. Might change this once we have extension management
            // built in.
            extensionEnablementService._enableExtension(extensionIdentifier);
        }
    }
    addWorkbenchActions() {
        this.addWorkbenchAction({
            id: 'workbench.action.toggleStatusbarVisibility',
            label: 'Toggle Status Bar Visibility',
            commandLabel: 'Toggle Status Bar Visibility',
            category: 'View',
            run: () => {
                this.controller.getSignal('editor.toggleStatusBar')();
            },
        });
        this.addWorkbenchAction({
            id: 'view.preview.flip',
            label: 'Flip Preview Layout',
            commandLabel: 'Toggle Vertical/Horizontal Preview Layout',
            category: 'View',
            run: () => {
                this.runCommand('workbench.action.toggleEditorGroupLayout');
                this.controller.getSignal('editor.toggleEditorPreviewLayout')();
            },
            keybindings: {
                primary: KeyMod.Shift | KeyMod.Alt | KeyCode.KEY_9,
                mac: {
                    primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_9,
                },
            },
        });
        this.addWorkbenchAction({
            id: 'codesandbox.sandbox.new',
            label: 'New Sandbox...',
            category: 'Sandbox',
            run: () => {
                this.controller.getSignal('modalOpened')({ modal: 'newSandbox' });
            },
        });
        this.addWorkbenchAction({
            id: 'codesandbox.sandbox.fork',
            label: 'Fork Sandbox',
            category: 'Sandbox',
            run: () => {
                this.controller.getSignal('editor.forkSandboxClicked')();
            },
        });
        this.addWorkbenchAction({
            id: 'codesandbox.sandbox.exportzip',
            label: 'Export To ZIP',
            category: 'Sandbox',
            run: () => {
                this.controller.getSignal('editor.createZipClicked')();
            },
        });
        this.addWorkbenchAction({
            id: 'codesandbox.preferences',
            label: 'Open CodeSandbox Settings',
            category: 'Preferences',
            run: () => {
                this.controller.getSignal('modalOpened')({ modal: 'preferences' });
            },
        });
        this.appendMenuItem(MenuId.MenubarFileMenu, {
            group: '1_new',
            order: 1,
            command: {
                id: 'codesandbox.sandbox.new',
                title: 'New Sandbox...',
            },
        });
        this.appendMenuItem(MenuId.MenubarFileMenu, {
            // Z to be the last item after vscode group 4
            group: '4_zsandbox',
            order: 1,
            command: {
                id: 'codesandbox.sandbox.fork',
                title: '&&Fork Sandbox',
            },
        });
        this.appendMenuItem(MenuId.MenubarFileMenu, {
            group: '4_zsandbox',
            order: 2,
            command: {
                id: 'codesandbox.sandbox.exportzip',
                title: 'Export to ZIP',
            },
        });
        this.appendMenuItem(MenuId.MenubarPreferencesMenu, {
            group: '1_settings',
            order: 1,
            command: {
                id: 'codesandbox.preferences',
                title: 'CodeSandbox Settings',
            },
        });
        this.appendMenuItem(MenuId.MenubarLayoutMenu, {
            group: 'z_flip',
            command: {
                id: 'view.preview.flip',
                title: 'Flip Full Layout',
            },
            order: 2,
        });
        const addBrowserNavigationCommand = (id, label, url) => {
            this.addWorkbenchAction({
                id,
                label,
                category: 'Help',
                run: () => {
                    window.open(url, '_blank');
                },
            });
        };
        addBrowserNavigationCommand('codesandbox.help.documentation', 'Documentation', 'https://codesandbox.io/docs');
        addBrowserNavigationCommand('codesandbox.explore', 'Explore Sandboxes', 'https://codesandbox.io/explore');
        addBrowserNavigationCommand('codesandbox.search', 'Search', 'https://codesandbox.io/search');
        addBrowserNavigationCommand('codesandbox.dashboard', 'Dashboard', 'https://codesandbox.io/dashboard');
        addBrowserNavigationCommand('codesandbox.help.open-issue', 'Open Issue on GitHub', 'https://github.com/codesandbox/codesandbox-client/issues');
        addBrowserNavigationCommand('codesandbox.help.github', 'Open Our GitHub Repository', 'https://github.com/codesandbox/codesandbox-client');
        addBrowserNavigationCommand('codesandbox.help.twitter', 'Follow Us on Twitter', 'https://twitter.com/codesandbox');
        addBrowserNavigationCommand('codesandbox.help.spectrum', 'Join Us on Spectrum', 'https://spectrum.chat/codesandbox');
        this.addWorkbenchAction({
            id: 'codesandbox.help.feedback',
            label: 'Submit Feedback...',
            category: 'Help',
            run: () => {
                this.controller.getSignal('modalOpened')({ modal: 'feedback' });
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '1_resources',
            order: 1,
            command: {
                id: 'codesandbox.help.documentation',
                title: '&&Documentation',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '1_resources',
            order: 2,
            command: {
                id: 'codesandbox.explore',
                title: '&&Explore Sandboxes',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '1_resources',
            order: 3,
            command: {
                id: 'codesandbox.search',
                title: '&&Search',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '1_resources',
            order: 4,
            command: {
                id: 'codesandbox.dashboard',
                title: 'D&&ashboard',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '2_help',
            order: 1,
            command: {
                id: 'codesandbox.help.open-issue',
                title: '&&Open Issue on GitHub',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '2_help',
            order: 2,
            command: {
                id: 'codesandbox.help.feedback',
                title: 'Submit &&Feedback...',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '3_social',
            order: 1,
            command: {
                id: 'codesandbox.help.github',
                title: '&&GitHub Repository',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '3_social',
            order: 2,
            command: {
                id: 'codesandbox.help.twitter',
                title: 'Follow Us on &&Twitter',
            },
        });
        this.appendMenuItem(MenuId.MenubarHelpMenu, {
            group: '3_social',
            order: 3,
            command: {
                id: 'codesandbox.help.spectrum',
                title: 'Join Us on S&&pectrum',
            },
        });
    }
}
export const vscode = new VSCodeManager();
