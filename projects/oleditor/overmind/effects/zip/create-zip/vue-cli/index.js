// @ts-ignore
import files from 'buffer-loader!./files.zip'; // eslint-disable-line import/no-webpack-loader-syntax
import { createDirectoryWithFiles, createFile } from '..';
export default function createZip(zip, sandbox, modules, directories) {
    return zip.loadAsync(files).then(async (src) => {
        await Promise.all(modules
            .filter(x => x.directoryShortid == null)
            .filter(x => x.title !== 'yarn.lock' && x.title !== 'package-lock.json')
            .map(x => createFile(x, src)));
        await Promise.all(directories
            .filter(x => x.directoryShortid == null)
            .map(x => createDirectoryWithFiles(modules, directories, x, src)));
    });
}
