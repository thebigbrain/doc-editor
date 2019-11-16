import { createDirectoryWithFiles, createFile } from '..';
export default async function createZip(zip, sandbox, modules, directories, downloadBlobs) {
    await Promise.all(modules
        .filter(x => x.directoryShortid == null)
        .filter(x => x.title !== 'yarn.lock' && x.title !== 'package-lock.json')
        .map(x => createFile(x, zip, downloadBlobs)));
    await Promise.all(directories
        .filter(x => x.directoryShortid == null)
        .map(x => createDirectoryWithFiles(modules, directories, x, zip, downloadBlobs)));
    return zip;
}
