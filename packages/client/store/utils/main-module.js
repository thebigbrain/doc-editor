// @flow
import type { Sandbox } from '@codesandbox/common/lib/types'
import getDefinition from '@codesandbox/common/lib/templates'

import { resolveModuleWrapped } from './resolve-module-wrapped'

export function mainModule(sandbox: Sandbox, parsedConfigurations: Object) {
  const templateDefinition = getDefinition(sandbox.template)

  const resolve = resolveModuleWrapped(sandbox)

  const module = templateDefinition
    .getEntries(parsedConfigurations)
    .map(p => resolve(p))
    .find(m => m)

  return module || sandbox.modules[0]
}

export function defaultOpenedModule(
  sandbox: Sandbox,
  parsedConfigurations: Object,
) {
  const templateDefinition = getDefinition(sandbox.template)

  const resolve = resolveModuleWrapped(sandbox)

  const module = templateDefinition
    .getDefaultOpenedFiles(parsedConfigurations)
    .map(p => resolve(p))
    .find(m => m)

  return module || sandbox.modules[0]
}
