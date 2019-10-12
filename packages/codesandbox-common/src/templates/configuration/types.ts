import { Sandbox } from '../../types';

export type ConfigurationFile = {
  title: string;
  type: string;
  description: string;
  moreInfoUrl: string;

  getDefaultCode?: (
    template: string,
    resolveModule: (path: string) => { code: string | null } | undefined
  ) => string;
  generateFileFromState?: (state: any) => string;
  generateFileFromSandbox?: (sandbox: Sandbox) => string;

  schema?: string;
  partialSupportDisclaimer?: string;
};

export type ParsedConfigurationFile<T> = {
  parsed?: T;
  code: string;
  generated: boolean;
  error?: Error;
  path: string;
};

export type ConfigurationUIProps = {
  file: string;
  updateFile: (code: string) => void;
  sandbox: Sandbox;
};
