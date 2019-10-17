"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatronBadge = exports.StripeErrorCode = exports.LiveMessageEvent = exports.TabType = exports.ZeitDeploymentType = exports.ZeitDeploymentState = exports.ServerContainerStatus = exports.ServerStatus = exports.WindowOrientation = void 0;
var WindowOrientation;
exports.WindowOrientation = WindowOrientation;

(function (WindowOrientation) {
  WindowOrientation["VERTICAL"] = "vertical";
  WindowOrientation["HORIZONTAL"] = "horizontal";
})(WindowOrientation || (exports.WindowOrientation = WindowOrientation = {}));

var ServerStatus;
exports.ServerStatus = ServerStatus;

(function (ServerStatus) {
  ServerStatus["INITIALIZING"] = "initializing";
  ServerStatus["CONNECTED"] = "connected";
  ServerStatus["DISCONNECTED"] = "disconnected";
})(ServerStatus || (exports.ServerStatus = ServerStatus = {}));

var ServerContainerStatus;
exports.ServerContainerStatus = ServerContainerStatus;

(function (ServerContainerStatus) {
  ServerContainerStatus["INITIALIZING"] = "initializing";
  ServerContainerStatus["CONTAINER_STARTED"] = "container-started";
  ServerContainerStatus["SANDBOX_STARTED"] = "sandbox-started";
  ServerContainerStatus["STOPPED"] = "stopped";
  ServerContainerStatus["HIBERNATED"] = "hibernated";
  ServerContainerStatus["ERROR"] = "error";
})(ServerContainerStatus || (exports.ServerContainerStatus = ServerContainerStatus = {}));

var ZeitDeploymentState;
exports.ZeitDeploymentState = ZeitDeploymentState;

(function (ZeitDeploymentState) {
  ZeitDeploymentState[ZeitDeploymentState["DEPLOYING"] = 0] = "DEPLOYING";
  ZeitDeploymentState[ZeitDeploymentState["INITIALIZING"] = 1] = "INITIALIZING";
  ZeitDeploymentState[ZeitDeploymentState["DEPLOYMENT_ERROR"] = 2] = "DEPLOYMENT_ERROR";
  ZeitDeploymentState[ZeitDeploymentState["BOOTED"] = 3] = "BOOTED";
  ZeitDeploymentState[ZeitDeploymentState["BUILDING"] = 4] = "BUILDING";
  ZeitDeploymentState[ZeitDeploymentState["READY"] = 5] = "READY";
  ZeitDeploymentState[ZeitDeploymentState["BUILD_ERROR"] = 6] = "BUILD_ERROR";
  ZeitDeploymentState[ZeitDeploymentState["FROZEN"] = 7] = "FROZEN";
  ZeitDeploymentState[ZeitDeploymentState["ERROR"] = 8] = "ERROR";
})(ZeitDeploymentState || (exports.ZeitDeploymentState = ZeitDeploymentState = {}));

var ZeitDeploymentType;
exports.ZeitDeploymentType = ZeitDeploymentType;

(function (ZeitDeploymentType) {
  ZeitDeploymentType[ZeitDeploymentType["NPM"] = 0] = "NPM";
  ZeitDeploymentType[ZeitDeploymentType["DOCKER"] = 1] = "DOCKER";
  ZeitDeploymentType[ZeitDeploymentType["STATIC"] = 2] = "STATIC";
  ZeitDeploymentType[ZeitDeploymentType["LAMBDAS"] = 3] = "LAMBDAS";
})(ZeitDeploymentType || (exports.ZeitDeploymentType = ZeitDeploymentType = {}));

var TabType;
exports.TabType = TabType;

(function (TabType) {
  TabType["MODULE"] = "MODULE";
  TabType["DIFF"] = "DIFF";
})(TabType || (exports.TabType = TabType = {}));

var LiveMessageEvent;
exports.LiveMessageEvent = LiveMessageEvent;

(function (LiveMessageEvent) {
  LiveMessageEvent["JOIN"] = "join";
  LiveMessageEvent["MODULE_STATE"] = "module_state";
  LiveMessageEvent["USER_ENTERED"] = "user:entered";
  LiveMessageEvent["USER_LEFT"] = "user:left";
  LiveMessageEvent["MODULE_SAVED"] = "module:saved";
  LiveMessageEvent["MODULE_CREATED"] = "module:created";
  LiveMessageEvent["MODULE_MASS_CREATED"] = "module:mass-created";
  LiveMessageEvent["MODULE_UPDATED"] = "module:updated";
  LiveMessageEvent["MODULE_DELETED"] = "module:deleted";
  LiveMessageEvent["DIRECTORY_CREATED"] = "directory:created";
  LiveMessageEvent["DIRECTORY_UPDATED"] = "directory:updated";
  LiveMessageEvent["DIRECTORY_DELETED"] = "directory:deleted";
  LiveMessageEvent["USER_SELECTION"] = "user:selection";
  LiveMessageEvent["USER_CURRENT_MODULE"] = "user:current-module";
  LiveMessageEvent["LIVE_MODE"] = "live:mode";
  LiveMessageEvent["LIVE_CHAT_ENABLED"] = "live:chat_enabled";
  LiveMessageEvent["LIVE_ADD_EDITOR"] = "live:add-editor";
  LiveMessageEvent["LIVE_REMOVE_EDITOR"] = "live:remove-editor";
  LiveMessageEvent["OPERATION"] = "operation";
  LiveMessageEvent["CONNECTION_LOSS"] = "connection-loss";
  LiveMessageEvent["DISCONNECT"] = "disconnect";
  LiveMessageEvent["OWNER_LEFT"] = "owner_left";
  LiveMessageEvent["CHAT"] = "chat";
  LiveMessageEvent["NOTIFICATION"] = "notification";
})(LiveMessageEvent || (exports.LiveMessageEvent = LiveMessageEvent = {}));

var StripeErrorCode;
exports.StripeErrorCode = StripeErrorCode;

(function (StripeErrorCode) {
  StripeErrorCode["REQUIRES_ACTION"] = "requires_action";
})(StripeErrorCode || (exports.StripeErrorCode = StripeErrorCode = {}));

var PatronBadge;
exports.PatronBadge = PatronBadge;

(function (PatronBadge) {
  PatronBadge["ONE"] = "patron-1";
  PatronBadge["TWO"] = "patron-2";
  PatronBadge["THREE"] = "patron-3";
  PatronBadge["FOURTH"] = "patron-4";
})(PatronBadge || (exports.PatronBadge = PatronBadge = {}));