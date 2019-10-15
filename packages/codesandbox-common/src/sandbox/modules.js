"use strict";
exports.__esModule = true;
var memoize_1 = require("lodash/memoize");
var templates_1 = require("../templates");
var parse_1 = require("../templates/configuration/parse");
var compareTitle = function (original, test, ignoredExtensions) {
    if (original === test)
        return true;
    return ignoredExtensions.some(function (ext) { return original === test + "." + ext; });
};
var throwError = function (path) {
    throw new Error("Cannot find module in " + path);
};
function resolveDirectory(_path, modules, directories, _startdirectoryShortid) {
    if (_startdirectoryShortid === void 0) { _startdirectoryShortid = undefined; }
    if (!_path) {
        return throwError('');
    }
    var path = _path;
    var startdirectoryShortid = _startdirectoryShortid;
    // If paths start with {{sandboxRoot}} we see them as root paths
    if (path.startsWith('{{sandboxRoot}}')) {
        startdirectoryShortid = undefined;
        path = _path.replace('{{sandboxRoot}}/', './');
    }
    // Split path
    var splitPath = path
        .replace(/^.\//, '')
        .split('/')
        .filter(Boolean);
    var foundDirectoryShortid = splitPath.reduce(function (dirId, pathPart, i) {
        // Meaning this is the last argument, so the directory
        if (i === splitPath.length) {
            return dirId;
        }
        if (pathPart === '..') {
            // Find the parent
            var dir = directories.find(function (d) { return d.shortid === dirId; });
            if (dir == null)
                throwError(path);
            return dir.directoryShortid;
        }
        var directoriesInDirectory = directories.filter(
        // eslint-disable-next-line eqeqeq
        function (m) { return m.directoryShortid == dirId; });
        var nextDirectory = directoriesInDirectory.find(function (d) {
            return compareTitle(d.title, pathPart, []);
        });
        if (nextDirectory == null)
            throwError(path);
        return nextDirectory.shortid;
    }, startdirectoryShortid);
    return directories.find(function (d) { return d.shortid === foundDirectoryShortid; });
}
exports.resolveDirectory = resolveDirectory;
function getModulesInDirectory(_path, modules, directories, _startdirectoryShortid) {
    if (_startdirectoryShortid === void 0) { _startdirectoryShortid = undefined; }
    if (!_path)
        return throwError('');
    var path = _path;
    // If paths start with {{sandboxRoot}} we see them as root paths
    if (path.startsWith('{{sandboxRoot}}')) {
        path = _path.replace('{{sandboxRoot}}/', './');
    }
    // Split path
    var splitPath = path
        .replace(/^.\//, '')
        .split('/')
        .filter(Boolean);
    var dirPath = path
        .replace(/^.\//, '')
        .split('/')
        .filter(Boolean);
    dirPath.pop();
    var dir = resolveDirectory(dirPath.join('/') || '/', modules, directories, _startdirectoryShortid);
    var foundDirectoryShortid = dir ? dir.shortid : null;
    var lastPath = splitPath[splitPath.length - 1];
    var modulesInFoundDirectory = modules.filter(
    // eslint-disable-next-line eqeqeq
    function (m) { return m.directoryShortid == foundDirectoryShortid; });
    return {
        modules: modulesInFoundDirectory,
        foundDirectoryShortid: foundDirectoryShortid,
        lastPath: lastPath,
        splitPath: splitPath
    };
}
exports.getModulesInDirectory = getModulesInDirectory;
/**
 * Convert the module path to a module
 */
exports.resolveModule = function (path, modules, directories, startdirectoryShortid, ignoredExtensions) {
    if (startdirectoryShortid === void 0) { startdirectoryShortid = undefined; }
    if (ignoredExtensions === void 0) { ignoredExtensions = ['js', 'jsx', 'json']; }
    var _a = getModulesInDirectory(path, modules, directories, startdirectoryShortid), modulesInFoundDirectory = _a.modules, lastPath = _a.lastPath, splitPath = _a.splitPath, foundDirectoryShortid = _a.foundDirectoryShortid;
    // Find module with same name
    var foundModule = modulesInFoundDirectory.find(function (m) {
        return compareTitle(m.title, lastPath, ignoredExtensions);
    });
    if (foundModule)
        return foundModule;
    // Check all directories in said directory for same name
    var directoriesInFoundDirectory = directories.filter(
    // eslint-disable-next-line eqeqeq
    function (m) { return m.directoryShortid == foundDirectoryShortid; });
    var foundDirectory = directoriesInFoundDirectory.find(function (m) {
        return compareTitle(m.title, lastPath, ignoredExtensions);
    });
    // If it refers to a directory
    if (foundDirectory) {
        // Find module named index
        var indexModule = modules.find(function (m) {
            // eslint-disable-next-line eqeqeq
            return m.directoryShortid == foundDirectory.shortid &&
                compareTitle(m.title, 'index', ignoredExtensions);
        });
        if (indexModule == null)
            throwError(path);
        return indexModule;
    }
    if (splitPath[splitPath.length - 1] === '') {
        // Last resort, check if there is something in the same folder called index
        var indexModule = modulesInFoundDirectory.find(function (m) {
            return compareTitle(m.title, 'index', ignoredExtensions);
        });
        if (indexModule)
            return indexModule;
    }
    return throwError(path);
};
function findById(entities, id) {
    return entities.find(function (e) { return e.id === id; });
}
function findByShortid(entities, shortid) {
    return entities.find(function (e) { return e.shortid === shortid; });
}
var getPath = function (arrayToLookIn, modules, directories, id) {
    var module = findById(arrayToLookIn, id);
    if (!module)
        return '';
    var directory = findByShortid(directories, module.directoryShortid);
    var path = '/';
    if (directory == null && module.directoryShortid) {
        // Parent got deleted, return '';
        return '';
    }
    while (directory != null) {
        path = "/" + directory.title + path;
        var lastDirectoryShortid = directory.directoryShortid;
        directory = findByShortid(directories, directory.directoryShortid);
        // In this case it couldn't find the parent directory of this dir, so probably
        // deleted. we just return '' in that case
        if (!directory && lastDirectoryShortid) {
            return '';
        }
    }
    return "" + path + module.title;
};
var memoizeFunction = function (modules, directories, id) {
    return id +
        modules.map(function (m) { return m.id + m.title + m.directoryShortid; }).join(',') +
        directories.map(function (d) { return d.id + d.title + d.directoryShortid; }).join(',');
};
exports.getModulePath = memoize_1["default"](function (modules, directories, id) {
    return getPath(modules, modules, directories, id);
}, memoizeFunction);
exports.getDirectoryPath = memoize_1["default"](function (modules, directories, id) {
    return getPath(directories, modules, directories, id);
}, memoizeFunction);
exports.isMainModule = function (module, modules, directories, entry) {
    if (entry === void 0) { entry = 'index.js'; }
    var path = exports.getModulePath(modules, directories, module.id);
    return path.replace('/', '') === entry;
};
exports.findMainModule = function (sandbox) {
    var resolve = exports.resolveModuleWrapped(sandbox);
    // first attempt: try loading the entry file if it exists
    var entryModule = resolve(sandbox.entry);
    if (entryModule) {
        return entryModule;
    }
    // second attempt: try loading the first file that exists from
    // the list of possible defaults in the template defination
    var templateDefinition = templates_1["default"](sandbox.template);
    var parsedConfigs = parse_1["default"](sandbox.template, templateDefinition.configurationFiles, resolve, sandbox);
    var defaultOpenedFiles = templateDefinition.getDefaultOpenedFiles(parsedConfigs);
    var defaultOpenModule = defaultOpenedFiles
        .map(function (path) { return resolve(path); })
        .find(function (module) { return module; });
    if (defaultOpenModule) {
        return defaultOpenModule;
    }
    // third attempt: give up and load the first file in the list
    return sandbox.modules[0];
};
exports.findCurrentModule = function (modules, directories, modulePath, mainModule) {
    if (modulePath === void 0) { modulePath = ''; }
    // cleanPath, encode and replace first /
    var cleanPath = decodeURIComponent(modulePath).replace('/', '');
    var foundModule = null;
    try {
        foundModule = exports.resolveModule(cleanPath, modules, directories);
    }
    catch (e) {
        /* leave empty */
    }
    return (foundModule ||
        modules.find(function (m) { return m.id === modulePath; }) ||
        modules.find(function (m) { return m.shortid === modulePath; }) || // deep-links requires this
        mainModule);
};
exports.resolveModuleWrapped = function (sandbox) { return function (path) {
    try {
        return exports.resolveModule(path, sandbox.modules, sandbox.directories);
    }
    catch (e) {
        return undefined;
    }
}; };
exports.resolveDirectoryWrapped = function (sandbox) { return function (path) {
    try {
        return resolveDirectory(path, sandbox.modules, sandbox.directories);
    }
    catch (e) {
        return undefined;
    }
}; };
