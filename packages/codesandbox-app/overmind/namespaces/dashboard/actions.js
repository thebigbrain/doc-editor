import { withLoadApp } from '~/overmind/factories';

export const dashboardMounted = withLoadApp();

export const sandboxesSelected = ({ state }, { sandboxIds }) => {
  state.dashboard.selectedSandboxes = sandboxIds;
};

export const setTrashSandboxes = ({ state }, { sandboxIds }) => {
  state.dashboard.trashSandboxIds = sandboxIds;
};

export const dragChanged = (
  { state },
  { isDragging },
) => {
  state.dashboard.isDragging = isDragging;
};

export const orderByChanged = (
  { state },
  { orderBy },
) => {
  state.dashboard.orderBy = orderBy;
};

export const blacklistedTemplateAdded = (
  { state },
  { template },
) => {
  state.dashboard.filters.blacklistedTemplates.push(template);
};

export const blacklistedTemplateRemoved = (
  { state },
  { template },
) => {
  state.dashboard.filters.blacklistedTemplates = state.dashboard.filters.blacklistedTemplates.filter(
    currentTemplate => currentTemplate !== template,
  );
};

export const blacklistedTemplatesCleared = ({ state }) => {
  state.dashboard.filters.blacklistedTemplates = [];
};

export const blacklistedTemplatesChanged = (
  { state },
  { templates },
) => {
  state.dashboard.filters.blacklistedTemplates = templates;
};

export const searchChanged = (
  { state },
  { search },
) => {
  state.dashboard.filters.search = search;
};

export const createSandboxClicked = ({ actions }, { sandboxId, body }) =>
  actions.editor.internal.forkSandbox({ sandboxId, body });
