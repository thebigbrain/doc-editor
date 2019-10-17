"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSandboxId = getSandboxId;
exports.privacyUrl = exports.tosUrl = exports.curatorUrl = exports.patronUrl = exports.searchUrl = exports.gitHubToSandboxUrl = exports.optionsToParameterizedUrl = exports.githubRepoUrl = exports.profileLikesUrl = exports.profileSandboxesUrl = exports.teamOverviewUrl = exports.exploreUrl = exports.dashboardUrl = exports.profileUrl = exports.signInZeitUrl = exports.signInUrl = exports.forkSandboxUrl = exports.frameUrl = exports.embedUrl = exports.sandboxUrl = exports.editorUrl = exports.uploadFromCliUrl = exports.newCxJSSandboxUrl = exports.newAngularSandboxUrl = exports.newSvelteSandboxUrl = exports.importFromGitHubUrl = exports.newVueSandboxUrl = exports.newPreactSandboxUrl = exports.newDojoSandboxUrl = exports.newReactTypeScriptSandboxUrl = exports.parcelSandboxUrl = exports.newSandboxUrl = exports.newSandboxWizard = exports.protocolAndHost = exports.host = exports.gitHubRepoPattern = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["https://github.com/", "/", "/tree/", "/"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["github/", "/", "/tree/", "/"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var gitHubRepoPattern = /(https?:\/\/)?((www.)?)github.com(\/[\w-]+){2,}/;
exports.gitHubRepoPattern = gitHubRepoPattern;
var gitHubPrefix = /(https?:\/\/)?((www.)?)github.com/;
var dotGit = /(\.git)$/;
var sandboxHost = {
  'https://codesandbox.io': 'https://csb.app',
  'https://codesandbox.stream': 'https://codesandbox.dev'
};

var buildEncodedUri = function buildEncodedUri(strings) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return strings[0] + values.map(function (value, i) {
    return "".concat(encodeURIComponent(value)).concat(strings[i + 1]);
  }).join('');
};

var host = function host() {
  if (process.env.NODE_ENV === 'production') {
    return process.env.CODESANDBOX_HOST.split('//')[1];
  }

  if (process.env.LOCAL_SERVER) {
    return 'localhost:3000';
  }

  return 'codesandbox.test';
};

exports.host = host;

var protocolAndHost = function protocolAndHost() {
  return "".concat(location.protocol, "//").concat(host());
};

exports.protocolAndHost = protocolAndHost;

var newSandboxWizard = function newSandboxWizard() {
  return "/s";
};

exports.newSandboxWizard = newSandboxWizard;

var newSandboxUrl = function newSandboxUrl() {
  return "/s/new";
};

exports.newSandboxUrl = newSandboxUrl;

var parcelSandboxUrl = function parcelSandboxUrl() {
  return "/s/vanilla";
};

exports.parcelSandboxUrl = parcelSandboxUrl;

var newReactTypeScriptSandboxUrl = function newReactTypeScriptSandboxUrl() {
  return "/s/react-ts";
};

exports.newReactTypeScriptSandboxUrl = newReactTypeScriptSandboxUrl;

var newDojoSandboxUrl = function newDojoSandboxUrl() {
  return "/s/github/dojo/dojo-codesandbox-template";
};

exports.newDojoSandboxUrl = newDojoSandboxUrl;

var newPreactSandboxUrl = function newPreactSandboxUrl() {
  return "/s/preact";
};

exports.newPreactSandboxUrl = newPreactSandboxUrl;

var newVueSandboxUrl = function newVueSandboxUrl() {
  return "/s/vue";
};

exports.newVueSandboxUrl = newVueSandboxUrl;

var importFromGitHubUrl = function importFromGitHubUrl() {
  return "/s/github";
};

exports.importFromGitHubUrl = importFromGitHubUrl;

var newSvelteSandboxUrl = function newSvelteSandboxUrl() {
  return "/s/svelte";
};

exports.newSvelteSandboxUrl = newSvelteSandboxUrl;

var newAngularSandboxUrl = function newAngularSandboxUrl() {
  return "/s/angular";
};

exports.newAngularSandboxUrl = newAngularSandboxUrl;

var newCxJSSandboxUrl = function newCxJSSandboxUrl() {
  return "/s/github/codaxy/cxjs-codesandbox-template";
};

exports.newCxJSSandboxUrl = newCxJSSandboxUrl;

var uploadFromCliUrl = function uploadFromCliUrl() {
  return "/s/cli";
};

exports.uploadFromCliUrl = uploadFromCliUrl;

var sandboxGitUrl = function sandboxGitUrl(git) {
  return buildEncodedUri(_templateObject(), git.username, git.repo, git.branch) + git.path;
};

var editorUrl = function editorUrl() {
  return "/s/";
};

exports.editorUrl = editorUrl;

var sandboxUrl = function sandboxUrl(sandboxDetails) {
  if (sandboxDetails.git) {
    var git = sandboxDetails.git;
    return "".concat(editorUrl()).concat(sandboxGitUrl(git));
  }

  if (sandboxDetails.alias) {
    return "".concat(editorUrl()).concat(sandboxDetails.alias);
  }

  return "".concat(editorUrl()).concat(sandboxDetails.id);
};

exports.sandboxUrl = sandboxUrl;

var embedUrl = function embedUrl(sandbox) {
  if (sandbox.git) {
    var git = sandbox.git;
    return "/embed/".concat(sandboxGitUrl(git));
  }

  if (sandbox.alias) {
    return "/embed/".concat(sandbox.alias);
  }

  return "/embed/".concat(sandbox.id);
};

exports.embedUrl = embedUrl;

var stagingFrameUrl = function stagingFrameUrl(shortid, path) {
  var stagingHost = (process.env.CODESANDBOX_HOST ? process.env.CODESANDBOX_HOST : '').split('//')[1];
  var segments = stagingHost.split('.');
  var first = segments.shift();
  return "".concat(location.protocol, "//").concat(first, "-").concat(shortid, ".").concat(segments.join('.'), "/").concat(path);
};

var frameUrl = function frameUrl(sandbox) {
  var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var useFallbackDomain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var path = append.indexOf('/') === 0 ? append.substr(1) : append;

  if (process.env.LOCAL_SERVER) {
    return "http://localhost:3002/".concat(path);
  }

  if (process.env.STAGING) {
    return stagingFrameUrl(sandbox.id, path);
  }

  var sHost = host();

  if ("https://".concat(sHost) in sandboxHost && !useFallbackDomain) {
    sHost = sandboxHost["https://".concat(sHost)].split('//')[1];
  }

  return "".concat(location.protocol, "//").concat(sandbox.id, ".").concat(sHost, "/").concat(path);
};

exports.frameUrl = frameUrl;

var forkSandboxUrl = function forkSandboxUrl(sandbox) {
  return "".concat(sandboxUrl(sandbox), "/fork");
};

exports.forkSandboxUrl = forkSandboxUrl;

var signInUrl = function signInUrl() {
  var extraScopes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return '/auth/github' + (extraScopes ? '?scope=user:email,public_repo' : '');
};

exports.signInUrl = signInUrl;

var signInZeitUrl = function signInZeitUrl() {
  return '/auth/zeit';
};

exports.signInZeitUrl = signInZeitUrl;

var profileUrl = function profileUrl(username) {
  return "/u/".concat(username);
};

exports.profileUrl = profileUrl;

var dashboardUrl = function dashboardUrl() {
  return "/dashboard";
};

exports.dashboardUrl = dashboardUrl;

var exploreUrl = function exploreUrl() {
  return "/explore";
};

exports.exploreUrl = exploreUrl;

var teamOverviewUrl = function teamOverviewUrl(teamId) {
  return "/dashboard/teams/".concat(teamId);
};

exports.teamOverviewUrl = teamOverviewUrl;

var profileSandboxesUrl = function profileSandboxesUrl(username, page) {
  return "".concat(profileUrl(username), "/sandboxes").concat(page ? "/".concat(page) : '');
};

exports.profileSandboxesUrl = profileSandboxesUrl;

var profileLikesUrl = function profileLikesUrl(username, page) {
  return "".concat(profileUrl(username), "/likes").concat(page ? "/".concat(page) : '');
};

exports.profileLikesUrl = profileLikesUrl;

var githubRepoUrl = function githubRepoUrl(_ref) {
  var repo = _ref.repo,
      branch = _ref.branch,
      username = _ref.username,
      path = _ref.path;
  return buildEncodedUri(_templateObject2(), username, repo, branch) + path;
};

exports.githubRepoUrl = githubRepoUrl;

var optionsToParameterizedUrl = function optionsToParameterizedUrl(options) {
  var keyValues = Object.keys(options).sort().filter(function (a) {
    return options[a];
  }).map(function (key) {
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(options[key]));
  }).join('&');
  return keyValues ? "?".concat(keyValues) : '';
};

exports.optionsToParameterizedUrl = optionsToParameterizedUrl;

var gitHubToSandboxUrl = function gitHubToSandboxUrl(githubUrl) {
  return githubUrl.replace(gitHubPrefix, '/s/github').replace(dotGit, '');
};

exports.gitHubToSandboxUrl = gitHubToSandboxUrl;

var searchUrl = function searchUrl(query) {
  return "/search".concat(query ? "?query=".concat(query) : '');
};

exports.searchUrl = searchUrl;

var patronUrl = function patronUrl() {
  return "/patron";
};

exports.patronUrl = patronUrl;

var curatorUrl = function curatorUrl() {
  return "/curator";
};

exports.curatorUrl = curatorUrl;

var tosUrl = function tosUrl() {
  return "/legal/terms";
};

exports.tosUrl = tosUrl;

var privacyUrl = function privacyUrl() {
  return "/legal/privacy";
};

exports.privacyUrl = privacyUrl;

function getSandboxId() {
  var csbHost = process.env.CODESANDBOX_HOST;

  if (process.env.LOCAL_SERVER) {
    return document.location.hash.replace('#', '');
  }

  if (process.env.STAGING) {
    var segments = csbHost.split('//')[1].split('.');
    var first = segments.shift();
    var re = RegExp("".concat(first, "-(.*)\\.").concat(segments.join('\\.')));
    return document.location.host.match(re)[1];
  }

  var result;
  [csbHost, sandboxHost[csbHost]].filter(Boolean).forEach(function (tryHost) {
    var hostRegex = tryHost.replace(/https?:\/\//, '').replace(/\./g, '\\.');
    var sandboxRegex = new RegExp("(.*)\\.".concat(hostRegex));
    var matches = document.location.host.match(sandboxRegex);

    if (matches) {
      result = matches[1];
    }
  });

  if (!result) {
    throw new Error("Can't detect sandbox ID from the current URL");
  }

  return result;
}