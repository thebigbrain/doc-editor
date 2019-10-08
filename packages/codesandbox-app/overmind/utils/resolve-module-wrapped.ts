import { resolveDirectory, resolveModule } from '@codesandbox/common/lib/sandbox/modules';
import { Directory, Module, Sandbox } from '@codesandbox/common/lib/types';

export const resolveModuleWrapped = (sandbox: Sandbox) => (
  path: string,
): Module | undefined => {
  try {
    return resolveModule(path, sandbox.modules, sandbox.directories);
  } catch (e) {
    return undefined;
  }
};

export const resolveDirectoryWrapped = (sandbox: Sandbox) => (
  path: string,
): Directory | undefined => {
  try {
    return resolveDirectory(path, sandbox.modules, sandbox.directories);
  } catch (e) {
    return undefined;
  }
};
