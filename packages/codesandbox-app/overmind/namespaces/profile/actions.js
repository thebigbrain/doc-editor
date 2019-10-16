import { withLoadApp } from 'codesandbox-app/overmind/factories';
export const profileMounted = withLoadApp(async ({ state, effects }, { username }) => {
    state.profile.isLoadingProfile = true;
    state.profile.notFound = false;
    const profile = await effects.api.getProfile(username);
    state.profile.profiles[profile.id] = profile;
    state.profile.currentProfileId = profile.id;
    if (profile.showcasedSandboxShortid &&
        !state.editor.sandboxes[profile.showcasedSandboxShortid]) {
        state.editor.sandboxes[profile.showcasedSandboxShortid] = await effects.api.getSandbox(profile.showcasedSandboxShortid);
    }
    state.profile.isLoadingProfile = false;
});
export const sandboxesPageChanged = async ({ state, effects }, { page, force }) => {
    state.profile.isLoadingSandboxes = true;
    state.profile.currentSandboxesPage = page;
    const { username } = state.profile.current;
    if (!state.profile.sandboxes[username] ||
        !state.profile.sandboxes[username][page] ||
        force) {
        const data = await effects.api.getUserSandboxes(username, page);
        if (!state.profile.sandboxes[username]) {
            state.profile.sandboxes[username] = {};
        }
        state.profile.sandboxes[username][page] = data[page];
    }
    state.profile.isLoadingSandboxes = false;
};
export const likedSandboxesPageChanged = async ({ state, effects }, { page }) => {
    state.profile.isLoadingSandboxes = true;
    state.profile.currentLikedSandboxesPage = page;
    const { username } = state.profile.current;
    if (!state.profile.likedSandboxes[username] ||
        !state.profile.likedSandboxes[username][page]) {
        const data = await effects.api.getUserLikedSandboxes(username, page);
        const sandboxes = data[page];
        if (!state.profile.likedSandboxes[username]) {
            state.profile.likedSandboxes[username] = {};
        }
        state.profile.likedSandboxes[username][page] = sandboxes;
    }
    state.profile.isLoadingSandboxes = false;
};
export const selectSandboxClicked = async ({ state, effects }) => {
    state.currentModal = 'selectSandbox';
    if (!state.profile.userSandboxes.length) {
        state.profile.isLoadingSandboxes = true;
        state.profile.userSandboxes = await effects.api.getSandboxes();
        state.profile.isLoadingSandboxes = false;
    }
};
export const newSandboxShowcaseSelected = async ({ state, effects }, { id }) => {
    state.profile.showSelectSandboxModal = false;
    state.profile.profiles[state.profile.currentProfileId].showcasedSandboxShortid = id;
    state.profile.isLoadingProfile = true;
    const [sandbox] = await Promise.all([
        state.editor.sandboxes[id] ? null : effects.api.getSandbox(id),
        effects.api.updateShowcasedSandbox(state.user.username, id),
    ]);
    if (sandbox) {
        state.editor.sandboxes[id] = sandbox;
    }
    state.profile.isLoadingProfile = false;
};
export const deleteSandboxClicked = ({ state }, { id }) => {
    state.profile.sandboxToDeleteId = id;
    state.currentModal = 'deleteProfileSandbox';
};
export const sandboxDeleted = async ({ state, effects }) => {
    state.profile.isLoadingSandboxes = true;
    state.currentModal = null;
    const sandboxId = state.profile.sandboxToDeleteId;
    await effects.api.deleteSandbox(sandboxId);
    state.profile.current.sandboxCount--;
    const page = state.profile.currentSandboxesPage;
    const { username } = state.user;
    const data = await effects.api.getUserSandboxes(username, page);
    state.profile.sandboxes[username][page] = data[page];
    state.profile.isLoadingSandboxes = false;
};
