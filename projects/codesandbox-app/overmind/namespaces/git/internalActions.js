export const fetchGitChanges = async ({ state, effects }) => {
    const id = state.editor.currentId;
    state.git.isFetching = true;
    state.git.originalGitChanges = await effects.api.getGitChanges(id);
    state.git.isFetching = false;
};
