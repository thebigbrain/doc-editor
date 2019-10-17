"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDirectory = resolveDirectory;
exports.getModulesInDirectory = getModulesInDirectory;
exports.resolveDirectoryWrapped = exports.resolveModuleWrapped = exports.findCurrentModule = exports.findMainModule = exports.isMainModule = exports.getDirectoryPath = exports.getModulePath = exports.resolveModule = void 0;

var _memoize = _interopRequireDefault(require("lodash/memoize"));

var _templates = _interopRequireDefault(require("../templates"));

var _parse = _interopRequireDefault(require("../templates/configuration/parse"));

var compareTitle = function compareTitle(original, test, ignoredExtensions) {
  if (original === test) return true;
  return ignoredExtensions.some(function (ext) {
    return original === "".concat(test, ".").concat(ext);
  });
};

var throwError = function throwError(path) {
  throw new Error("Cannot find module in ".concat(path));
};

function resolveDirectory(_path, modules, directories) {
  var _startdirectoryShortid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  if (!_path) {
    return throwError('');
  }

  var path = _path;
  var startdirectoryShortid = _startdirectoryShortid; // If paths start with {{sandboxRoot}} we see them as root paths

  if (path.startsWith('{{sandboxRoot}}')) {
    startdirectoryShortid = undefined;
    path = _path.replace('{{sandboxRoot}}/', './');
  } // Split path


  var splitPath = path.replace(/^.\//, '').split('/').filter(Boolean);
  var foundDirectoryShortid = splitPath.reduce(function (dirId, pathPart, i) {
    // Meaning this is the last argument, so the directory
    if (i === splitPath.length) {
      return dirId;
    }

    if (pathPart === '..') {
      // Find the parent
      var dir = directories.find(function (d) {
        return d.shortid === dirId;
      });
      if (dir == null) throwError(path);
      return dir.directoryShortid;
    }

    var directoriesInDirectory = directories.filter( // eslint-disable-next-line eqeqeq
    function (m) {
      return m.directoryShortid == dirId;
    });
    var nextDirectory = directoriesInDirectory.find(function (d) {
      return compareTitle(d.title, pathPart, []);
    });
    if (nextDirectory == null) throwError(path);
    return nextDirectory.shortid;
  }, startdirectoryShortid);
  return directories.find(function (d) {
    return d.shortid === foundDirectoryShortid;
  });
}

function getModulesInDirectory(_path, modules, directories) {
  var _startdirectoryShortid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  if (!_path) return throwError('');
  var path = _path; // If paths start with {{sandboxRoot}} we see them as root paths

  if (path.startsWith('{{sandboxRoot}}')) {
    path = _path.replace('{{sandboxRoot}}/', './');
  } // Split path


  var splitPath = path.replace(/^.\//, '').split('/').filter(Boolean);
  var dirPath = path.replace(/^.\//, '').split('/').filter(Boolean);
  dirPath.pop();
  var dir = resolveDirectory(dirPath.join('/') || '/', modules, directories, _startdirectoryShortid);
  var foundDirectoryShortid = dir ? dir.shortid : null;
  var lastPath = splitPath[splitPath.length - 1];
  var modulesInFoundDirectory = modules.filter( // eslint-disable-next-line eqeqeq
  function (m) {
    return m.directoryShortid == foundDirectoryShortid;
  });
  return {
    modules: modulesInFoundDirectory,
    foundDirectoryShortid: foundDirectoryShortid,
    lastPath: lastPath,
    splitPath: splitPath
  };
}
/**
 * Convert the module path to a module
 */


var resolveModule = function resolveModule(path, modules, directories) {
  var startdirectoryShortid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var ignoredExtensions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ['js', 'jsx', 'json'];

  var _getModulesInDirector = getModulesInDirectory(path, modules, directories, startdirectoryShortid),
      modulesInFoundDirectory = _getModulesInDirector.modules,
      lastPath = _getModulesInDirector.lastPath,
      splitPath = _getModulesInDirector.splitPath,
      foundDirectoryShortid = _getModulesInDirector.foundDirectoryShortid; // Find module with same name


  var foundModule = modulesInFoundDirectory.find(function (m) {
    return compareTitle(m.title, lastPath, ignoredExtensions);
  });
  if (foundModule) return foundModule; // Check all directories in said directory for same name

  var directoriesInFoundDirectory = directories.filter( // eslint-disable-next-line eqeqeq
  function (m) {
    return m.directoryShortid == foundDirectoryShortid;
  });
  var foundDirectory = directoriesInFoundDirectory.find(function (m) {
    return compareTitle(m.title, lastPath, ignoredExtensions);
  }); // If it refers to a directory

  if (foundDirectory) {
    // Find module named index
    var indexModule = modules.find(function (m) {
      return (// eslint-disable-next-line eqeqeq
        m.directoryShortid == foundDirectory.shortid && compareTitle(m.title, 'index', ignoredExtensions)
      );
    });
    if (indexModule == null) throwError(path);
    return indexModule;
  }

  if (splitPath[splitPath.length - 1] === '') {
    // Last resort, check if there is something in the same folder called index
    var _indexModule = modulesInFoundDirectory.find(function (m) {
      return compareTitle(m.title, 'index', ignoredExtensions);
    });

    if (_indexModule) return _indexModule;
  }

  return throwError(path);
};

exports.resolveModule = resolveModule;

function findById(entities, id) {
  return entities.find(function (e) {
    return e.id === id;
  });
}

function findByShortid(entities, shortid) {
  return entities.find(function (e) {
    return e.shortid === shortid;
  });
}

var getPath = function getPath(arrayToLookIn, modules, directories, id) {
  var module = findById(arrayToLookIn, id);
  if (!module) return '';
  var directory = findByShortid(directories, module.directoryShortid);
  var path = '/';

  if (directory == null && module.directoryShortid) {
    // Parent got deleted, return '';
    return '';
  }

  while (directory != null) {
    path = "/".concat(directory.title).concat(path);
    var lastDirectoryShortid = directory.directoryShortid;
    directory = findByShortid(directories, directory.directoryShortid); // In this case it couldn't find the parent directory of this dir, so probably
    // deleted. we just return '' in that case

    if (!directory && lastDirectoryShortid) {
      return '';
    }
  }

  return "".concat(path).concat(module.title);
};

var memoizeFunction = function memoizeFunction(modules, directories, id) {
  return id + modules.map(function (m) {
    return m.id + m.title + m.directoryShortid;
  }).join(',') + directories.map(function (d) {
    return d.id + d.title + d.directoryShortid;
  }).join(',');
};

var getModulePath = (0, _memoize["default"])(function (modules, directories, id) {
  return getPath(modules, modules, directories, id);
}, memoizeFunction);
exports.getModulePath = getModulePath;
var getDirectoryPath = (0, _memoize["default"])(function (modules, directories, id) {
  return getPath(directories, modules, directories, id);
}, memoizeFunction);
exports.getDirectoryPath = getDirectoryPath;

var isMainModule = function isMainModule(module, modules, directories) {
  var entry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'index.js';
  var path = getModulePath(modules, directories, module.id);
  return path.replace('/', '') === entry;
};

exports.isMainModule = isMainModule;

var findMainModule = function findMainModule(sandbox) {
  var resolve = resolveModuleWrapped(sandbox); // first attempt: try loading the entry file if it exists

  var entryModule = resolve(sandbox.entry);

  if (entryModule) {
    return entryModule;
  } // second attempt: try loading the first file that exists from
  // the list of possible defaults in the template defination


  var templateDefinition = (0, _templates["default"])(sandbox.template);
  var parsedConfigs = (0, _parse["default"])(sandbox.template, templateDefinition.configurationFiles, resolve, sandbox);
  var defaultOpenedFiles = templateDefinition.getDefaultOpenedFiles(parsedConfigs);
  var defaultOpenModule = defaultOpenedFiles.map(function (path) {
    return resolve(path);
  }).find(function (module) {
    return module;
  });

  if (defaultOpenModule) {
    return defaultOpenModule;
  } // third attempt: give up and load the first file in the list


  return sandbox.modules[0];
};

exports.findMainModule = findMainModule;

var findCurrentModule = function findCurrentModule(modules, directories) {
  var modulePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var mainModule = arguments.length > 3 ? arguments[3] : undefined;
  // cleanPath, encode and replace first /
  var cleanPath = decodeURIComponent(modulePath).replace('/', '');
  var foundModule = null;

  try {
    foundModule = resolveModule(cleanPath, modules, directories);
  } catch (e) {
    /* leave empty */
  }

  return foundModule || modules.find(function (m) {
    return m.id === modulePath;
  }) || modules.find(function (m) {
    return m.shortid === modulePath;
  }) || // deep-links requires this
  mainModule;
};

exports.findCurrentModule = findCurrentModule;

var resolveModuleWrapped = function resolveModuleWrapped(sandbox) {
  return function (path) {
    try {
      return resolveModule(path, sandbox.modules, sandbox.directories);
    } catch (e) {
      return undefined;
    }
  };
};

exports.resolveModuleWrapped = resolveModuleWrapped;

var resolveDirectoryWrapped = function resolveDirectoryWrapped(sandbox) {
  return function (path) {
    try {
      return resolveDirectory(path, sandbox.modules, sandbox.directories);
    } catch (e) {
      return undefined;
    }
  };
};

exports.resolveDirectoryWrapped = resolveDirectoryWrapped;