import {
  resolveModule,
  resolveDirectory,
} from '@codesandbox/common/lib/sandbox/modules';

export const resolveModuleWrapped = sandbox => (path) => {
  try {
    return resolveModule(path, sandbox.modules, sandbox.directories);
  } catch (e) {
    return undefined;
  }
};

export const resolveDirectoryWrapped = sandbox => (path) => {
  try {
    return resolveDirectory(path, sandbox.modules, sandbox.directories);
  } catch (e) {
    return undefined;
  }
};
