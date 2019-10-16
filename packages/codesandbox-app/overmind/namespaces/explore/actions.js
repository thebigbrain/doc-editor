import { withLoadApp } from 'codesandbox-app/overmind/factories';
export const popularSandboxesMounted = withLoadApp(async ({ state, effects }, { date }) => {
    try {
        state.explore.popularSandboxes = await effects.api.getPopularSandboxes(date);
    }
    catch (error) {
        effects.notificationToast.error('There has been a problem getting the sandboxes');
    }
});
export const pickSandbox = async ({ state, effects }, { id, title, description }) => {
    try {
        const data = await effects.api.saveSandboxPick(id, title, description);
        const popularSandbox = state.explore.popularSandboxes.sandboxes.find(module => module.id === id);
        popularSandbox.picks = [
            {
                ...data,
                // Why are we doing this?
                id: Math.random().toString(),
            },
        ];
        effects.notificationToast.success('Sandbox picked');
        state.currentModal = null;
    }
    catch (error) {
        effects.notificationToast.error('There has been a problem picking the sandbox');
    }
};
export const pickSandboxModal = ({ state }, { details }) => {
    state.explore.pickedSandboxDetails = details;
    state.currentModal = 'pickSandbox';
};
export const getSandbox = async ({ state, effects }, id) => {
    try {
        state.explore.selectedSandbox = await effects.api.getSandbox(id);
    }
    catch (error) {
        effects.notificationToast.error('There has been a problem getting the sandbox');
    }
};
export const pickedSandboxesMounted = async ({ state, effects, }) => {
    state.explore.pickedSandboxesLoading = true;
    try {
        const pickedSandboxes = await effects.api.getPickedSandboxes();
        state.explore.pickedSandboxesIndexes = pickedSandboxes.sandboxes.map(a => a.id);
        state.explore.pickedSandboxes = pickedSandboxes;
    }
    catch (error) {
        effects.notificationToast.error('There has been a problem getting the sandboxes');
    }
    state.explore.pickedSandboxesLoading = false;
};
