import getTemplateDefinition from '..';
import { resolveModule } from '../../sandbox/modules';
export const getPreviewTabs = (sandbox, configurations, intermediatePreviewCode = '') => {
    const template = getTemplateDefinition(sandbox.template);
    let views = template.getViews(configurations);
    try {
        const workspaceConfig = intermediatePreviewCode
            ? { code: intermediatePreviewCode }
            : resolveModule('/.codesandbox/workspace.json', sandbox.modules, sandbox.directories);
        const { preview } = JSON.parse(workspaceConfig.code);
        if (preview && Array.isArray(preview)) {
            views = preview;
        }
    }
    catch (e) {
        /* Ignore */
    }
    return views;
};
