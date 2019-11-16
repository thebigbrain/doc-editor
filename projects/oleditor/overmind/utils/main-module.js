import getDefinition from '@csb/common/lib/templates';

import { resolveModuleWrapped } from './resolve-module-wrapped';

export function mainModule(sandbox, parsedConfigurations) {
  const templateDefinition = getDefinition(sandbox.template);

  const resolve = resolveModuleWrapped(sandbox);

  const module = templateDefinition
    .getEntries(parsedConfigurations)
    .map(p => resolve(p))
    .find(m => m);

  return module || sandbox.modules[0];
}

export function defaultOpenedModule(sandbox, parsedConfigurations) {
  const templateDefinition = getDefinition(sandbox.template);

  const resolve = resolveModuleWrapped(sandbox);

  const module = templateDefinition
    .getDefaultOpenedFiles(parsedConfigurations)
    .map(p => resolve(p))
    .find(m => m);

  return module || sandbox.modules[0];
}
