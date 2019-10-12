import getDefinition from '@codesandbox/common/lib/templates';
// import parse from '@codesandbox/common/lib/templates/configuration/parse';
import { resolveModuleWrapped } from './resolve-module-wrapped';

export function parseConfigurations(sandbox) {
  const templateDefinition = getDefinition(sandbox.template);
  console.log(templateDefinition)
  return {}

  // return parse(
  //   sandbox.template,
  //   templateDefinition.configurationFiles,
  //   resolveModuleWrapped(sandbox),
  //   sandbox,
  // );
}
