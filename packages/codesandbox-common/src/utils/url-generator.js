"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.gitHubRepoPattern = /(https?:\/\/)?((www.)?)github.com(\/[\w-]+){2,}/;
var gitHubPrefix = /(https?:\/\/)?((www.)?)github.com/;
var dotGit = /(\.git)$/;
var sandboxHost = {
    'https://codesandbox.io': 'https://csb.app',
    'https://codesandbox.stream': 'https://codesandbox.dev'
};
var buildEncodedUri = function (strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return strings[0] +
        values
            .map(function (value, i) { return "" + encodeURIComponent(value) + strings[i + 1]; })
            .join('');
};
exports.host = function () {
    if (process.env.NODE_ENV === 'production') {
        return process.env.CODESANDBOX_HOST.split('//')[1];
    }
    if (process.env.LOCAL_SERVER) {
        return 'localhost:3000';
    }
    return 'codesandbox.test';
};
exports.protocolAndHost = function () { return location.protocol + "//" + exports.host(); };
exports.newSandboxWizard = function () { return "/s"; };
exports.newSandboxUrl = function () { return "/s/new"; };
exports.parcelSandboxUrl = function () { return "/s/vanilla"; };
exports.newReactTypeScriptSandboxUrl = function () { return "/s/react-ts"; };
exports.newDojoSandboxUrl = function () {
    return "/s/github/dojo/dojo-codesandbox-template";
};
exports.newPreactSandboxUrl = function () { return "/s/preact"; };
exports.newVueSandboxUrl = function () { return "/s/vue"; };
exports.importFromGitHubUrl = function () { return "/s/github"; };
exports.newSvelteSandboxUrl = function () { return "/s/svelte"; };
exports.newAngularSandboxUrl = function () { return "/s/angular"; };
exports.newCxJSSandboxUrl = function () {
    return "/s/github/codaxy/cxjs-codesandbox-template";
};
exports.uploadFromCliUrl = function () { return "/s/cli"; };
var sandboxGitUrl = function (git) {
    return buildEncodedUri(templateObject_1 || (templateObject_1 = __makeTemplateObject(["github/", "/", "/tree/", "/"], ["github/", "/", "/tree/", "/"])), git.username, git.repo, git.branch) +
        git.path;
};
exports.editorUrl = function () { return "/s/"; };
exports.sandboxUrl = function (sandboxDetails) {
    if (sandboxDetails.git) {
        var git = sandboxDetails.git;
        return "" + exports.editorUrl() + sandboxGitUrl(git);
    }
    if (sandboxDetails.alias) {
        return "" + exports.editorUrl() + sandboxDetails.alias;
    }
    return "" + exports.editorUrl() + sandboxDetails.id;
};
exports.embedUrl = function (sandbox) {
    if (sandbox.git) {
        var git = sandbox.git;
        return "/embed/" + sandboxGitUrl(git);
    }
    if (sandbox.alias) {
        return "/embed/" + sandbox.alias;
    }
    return "/embed/" + sandbox.id;
};
var stagingFrameUrl = function (shortid, path) {
    var stagingHost = (process.env.CODESANDBOX_HOST
        ? process.env.CODESANDBOX_HOST
        : '').split('//')[1];
    var segments = stagingHost.split('.');
    var first = segments.shift();
    return location.protocol + "//" + first + "-" + shortid + "." + segments.join('.') + "/" + path;
};
exports.frameUrl = function (sandbox, append, useFallbackDomain) {
    if (append === void 0) { append = ''; }
    if (useFallbackDomain === void 0) { useFallbackDomain = false; }
    var path = append.indexOf('/') === 0 ? append.substr(1) : append;
    if (process.env.LOCAL_SERVER) {
        return "http://localhost:3002/" + path;
    }
    if (process.env.STAGING) {
        return stagingFrameUrl(sandbox.id, path);
    }
    var sHost = exports.host();
    if ("https://" + sHost in sandboxHost && !useFallbackDomain) {
        sHost = sandboxHost["https://" + sHost].split('//')[1];
    }
    return location.protocol + "//" + sandbox.id + "." + sHost + "/" + path;
};
exports.forkSandboxUrl = function (sandbox) {
    return exports.sandboxUrl(sandbox) + "/fork";
};
exports.signInUrl = function (extraScopes) {
    if (extraScopes === void 0) { extraScopes = false; }
    return '/auth/github' + (extraScopes ? '?scope=user:email,public_repo' : '');
};
exports.signInZeitUrl = function () { return '/auth/zeit'; };
exports.profileUrl = function (username) { return "/u/" + username; };
exports.dashboardUrl = function () { return "/dashboard"; };
exports.exploreUrl = function () { return "/explore"; };
exports.teamOverviewUrl = function (teamId) { return "/dashboard/teams/" + teamId; };
exports.profileSandboxesUrl = function (username, page) {
    return exports.profileUrl(username) + "/sandboxes" + (page ? "/" + page : '');
};
exports.profileLikesUrl = function (username, page) {
    return exports.profileUrl(username) + "/likes" + (page ? "/" + page : '');
};
exports.githubRepoUrl = function (_a) {
    var repo = _a.repo, branch = _a.branch, username = _a.username, path = _a.path;
    return buildEncodedUri(templateObject_2 || (templateObject_2 = __makeTemplateObject(["https://github.com/", "/", "/tree/", "/"], ["https://github.com/", "/", "/tree/", "/"])), username, repo, branch) +
        path;
};
exports.optionsToParameterizedUrl = function (options) {
    var keyValues = Object.keys(options)
        .sort()
        .filter(function (a) { return options[a]; })
        .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(options[key]); })
        .join('&');
    return keyValues ? "?" + keyValues : '';
};
exports.gitHubToSandboxUrl = function (githubUrl) {
    return githubUrl.replace(gitHubPrefix, '/s/github').replace(dotGit, '');
};
exports.searchUrl = function (query) {
    return "/search" + (query ? "?query=" + query : '');
};
exports.patronUrl = function () { return "/patron"; };
exports.curatorUrl = function () { return "/curator"; };
exports.tosUrl = function () { return "/legal/terms"; };
exports.privacyUrl = function () { return "/legal/privacy"; };
function getSandboxId() {
    var csbHost = process.env.CODESANDBOX_HOST;
    if (process.env.LOCAL_SERVER) {
        return document.location.hash.replace('#', '');
    }
    if (process.env.STAGING) {
        var segments = csbHost.split('//')[1].split('.');
        var first = segments.shift();
        var re = RegExp(first + "-(.*)\\." + segments.join('\\.'));
        return document.location.host.match(re)[1];
    }
    var result;
    [csbHost, sandboxHost[csbHost]].filter(Boolean).forEach(function (tryHost) {
        var hostRegex = tryHost.replace(/https?:\/\//, '').replace(/\./g, '\\.');
        var sandboxRegex = new RegExp("(.*)\\." + hostRegex);
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
exports.getSandboxId = getSandboxId;
var templateObject_1, templateObject_2;
