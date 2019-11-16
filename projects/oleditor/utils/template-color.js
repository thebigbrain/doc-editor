import { decorateSelector } from '@csb/common/lib/theme';

export const templateColor = (sandbox, templateDef) => {
  if (sandbox && sandbox.customTemplate) {
    return decorateSelector(() => sandbox.customTemplate.color);
  }

  if (sandbox && sandbox.forkedTemplate) {
    return decorateSelector(() => sandbox.forkedTemplate.color);
  }

  if (templateDef) {
    return templateDef.color;
  }
  return undefined;
};
