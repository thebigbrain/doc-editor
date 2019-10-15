import getDefinition from '..'
import parse from './parse'
import {resolveModuleWrapped} from './resolve-module-wrapped'

export function parseSandboxConfigurations(sandbox) {
  const templateDefinition = getDefinition(sandbox.template)
  return parse(sandbox.template, templateDefinition.configurationFiles, resolveModuleWrapped(sandbox), sandbox)
}
