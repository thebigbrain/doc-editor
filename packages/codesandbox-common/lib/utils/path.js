"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAbsolute = isAbsolute;
exports.normalize = normalize;
exports.join = join;
exports.dirname = dirname;
exports.basename = basename;
exports.absolute = absolute;
exports.extname = extname;
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;

function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
} // resolves . and .. elements in a path array with directory names there
// must be no slashes or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)


function normalizeArray(parts, allowAboveRoot) {
  var res = [];

  for (var i = 0; i < parts.length; i += 1) {
    var p = parts[i]; // ignore empty parts

    if (!p || p === '.') continue; // eslint-disable-line no-continue

    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

function isAbsolute(path) {
  return path.charAt(0) === '/';
}

function normalize(path) {
  var isAbs = isAbsolute(path);
  var trailingSlash = path && path[path.length - 1] === '/';
  var newPath = path; // Normalize the path

  newPath = normalizeArray(newPath.split('/'), !isAbs).join('/');

  if (!newPath && !isAbs) {
    newPath = '.';
  }

  if (newPath && trailingSlash) {
    newPath += '/';
  }

  return (isAbs ? '/' : '') + newPath;
}

function join() {
  var path = '';

  for (var i = 0; i < arguments.length; i += 1) {
    var segment = i < 0 || arguments.length <= i ? undefined : arguments[i];

    if (typeof segment !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }

    if (segment) {
      if (!path) {
        path += segment;
      } else {
        path += "/".concat(segment);
      }
    }
  }

  return normalize(path);
}

function dirname(path) {
  var result = splitPath(path);
  var root = result[0];
  var dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
}

function basename(p) {
  var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  // Special case: Normalize will modify this to '.'
  if (p === '') {
    return p;
  } // Normalize the string first to remove any weirdness.


  var path = normalize(p); // Get the last part of the string.

  var sections = path.split('/');
  var lastPart = sections[sections.length - 1]; // Special case: If it's empty, then we have a string like so: foo/
  // Meaning, 'foo' is guaranteed to be a directory.

  if (lastPart === '' && sections.length > 1) {
    return sections[sections.length - 2];
  } // Remove the extension, if need be.


  if (ext.length > 0) {
    var lastPartExt = lastPart.substr(lastPart.length - ext.length);

    if (lastPartExt === ext) {
      return lastPart.substr(0, lastPart.length - ext.length);
    }
  }

  return lastPart;
}

function absolute(path) {
  if (path.startsWith('/')) {
    return path;
  }

  if (path.startsWith('./')) {
    return path.replace('./', '/');
  }

  return '/' + path;
}

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

function extname(path) {
  assertPath(path);
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true; // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find

  var preDotState = 0;

  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);

    if (code === 47) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      } // eslint-disable-next-line


      continue;
    }

    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }

    if (code === 46
    /* . */
    ) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }

  return path.slice(startDot, end);
}