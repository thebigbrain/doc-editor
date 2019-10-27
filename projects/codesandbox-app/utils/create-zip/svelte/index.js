import files from './files.zip'; // eslint-disable-line import/no-webpack-loader-syntax
import { createFile, createDirectoryWithFiles } from '..';

export default function createZip(
  zip,
  sandbox,
  modules,
  directories
) {
  return zip.loadAsync(files).then(async src => {
    await Promise.all(
      modules
        .filter(x => x.directoryShortid == null)
        .filter(x => x.title !== 'index.html') // This will be included in the body
        .map(x => createFile(x, src))
    );

    await Promise.all(
      directories
        .filter(x => x.directoryShortid == null)
        .map(x => createDirectoryWithFiles(modules, directories, x, src))
    );
  });
}
