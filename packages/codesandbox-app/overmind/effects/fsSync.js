import { getAbsoluteDependencies } from '@codesandbox/common/lib/utils/dependencies';
import { protocolAndHost } from '@codesandbox/common/lib/utils/url-generator';

import { getGlobal } from '@codesandbox/common/lib/utils/global';

const global = getGlobal() as Window & { BrowserFS: any };

const fs = global.BrowserFS.BFSRequire('fs');
const SERVICE_URL = 'https://ata-fetcher.cloud/api/v5/typings';

let fileInterval;
let lastMTime = new Date(0);

function sendTypes() {
  global.postMessage(
    {
      $broadcast: true,
      $type: 'typings-sync',
      $data: types,
    },
    protocolAndHost(),
  );
}

let typeInfoPromise;
let types;

/**
 * Gets all entries of dependencies -> @types/ version
 */
function getTypesInfo() {
  if (typeInfoPromise) {
    return typeInfoPromise;
  }

  typeInfoPromise = fetch('https://unpkg.com/types-registry@latest/index.json')
    .then(x => x.json())
    .then(x => x.entries);

  return typeInfoPromise;
}

async function syncDependencyTypings(packageJSON, autoInstallTypes) {
  try {
    types = {};
    const { dependencies = {}, devDependencies = {} } = JSON.parse(packageJSON);

    const totalDependencies = {
      '@types/jest': 'latest',
      ...dependencies,
      ...devDependencies,
    };

    if (autoInstallTypes) {
      const typeInfo = await getTypesInfo();
      Object.keys(totalDependencies).forEach(async dep => {
        if (
          !dep.startsWith('@types/') &&
          !totalDependencies[`@types/${dep}`] &&
          typeInfo[dep]
        ) {
          totalDependencies[`@types/${dep}`] = typeInfo[dep].latest;
        }
      });
    }

    const absoluteDependencies = await getAbsoluteDependencies(
      totalDependencies,
    );

    return Promise.all(
      Object.keys(absoluteDependencies).map(async depName => {
        const depVersion = absoluteDependencies[depName];

        try {
          const fetchRequest = await fetch(
            `${SERVICE_URL}/${depName}@${depVersion}.json`,
          );

          if (!fetchRequest.ok) {
            throw new Error('Fetch error');
          }

          const { files } = await fetchRequest.json();
          types = { ...types, ...files };
          sendTypes();
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Trouble fetching types for ' + depName);
          }
        }
      }),
    );
  } catch (e) {
    /* ignore */
    return Promise.resolve({});
  }
}

let getCurrentSandboxId;
let getModulesByPath;

export default {
  initialize(options) {
    getCurrentSandboxId = options.getCurrentSandboxId; // eslint-disable-line prefer-destructuring
    getModulesByPath = options.getModulesByPath; // eslint-disable-line prefer-destructuring
  },
  syncCurrentSandbox() {
    if (fileInterval) {
      clearInterval(fileInterval);
    }

    const sendFiles = () => {
      if (getCurrentSandboxId()) {
        const modulesByPath = getModulesByPath();

        global.postMessage(
          {
            $broadcast: true,
            $type: 'file-sync',
            $data: modulesByPath,
          },
          protocolAndHost(),
        );
      }
    };

    fileInterval = setInterval(() => {
      sendFiles();

      try {
        fs.stat('/sandbox/package.json', (packageJsonError, stat) => {
          if (packageJsonError) {
            return;
          }

          if (stat.mtime.toString() !== lastMTime.toString()) {
            lastMTime = stat.mtime;

            fs.readFile(
              '/sandbox/package.json',
              async (packageJsonReadError, rv) => {
                if (packageJsonReadError) {
                  console.error(packageJsonReadError);
                  return;
                }

                fs.stat('/sandbox/tsconfig.json', (tsConfigError, result) => {
                  // If tsconfig exists we want to sync the types
                  syncDependencyTypings(
                    rv.toString(),
                    Boolean(tsConfigError) || !result,
                  );
                });
              },
            );
          }
        });
      } catch (e) {
        // Do nothing
      }
    }, 1000);

    // eslint-disable-next-line
    self.addEventListener('message', evt => {
      if (evt.data.$type === 'request-data') {
        sendTypes();
        sendFiles();
      }
    });
  },
};
