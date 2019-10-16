export const state = {
    profiles: {},
    currentProfileId: null,
    showSelectSandboxModal: false,
    notFound: false,
    isLoadingProfile: true,
    sandboxes: {},
    likedSandboxes: {},
    userSandboxes: [],
    currentSandboxesPage: 1,
    currentLikedSandboxesPage: 1,
    isLoadingSandboxes: false,
    sandboxToDeleteId: null,
    isProfileCurrentUser: (currentState, rootState) => rootState.user && rootState.user.id === currentState.currentProfileId,
    current: currentState => currentState.profiles[currentState.currentProfileId],
    showcasedSandbox: (currentState, rootState) => currentState.current &&
        currentState.current.showcasedSandboxShortid &&
        rootState.editor.sandboxes[currentState.current.showcasedSandboxShortid],
    currentLikedSandboxes: currentState => currentState.current &&
        currentState.likedSandboxes[currentState.current.username],
    currentSandboxes: currentState => currentState.current &&
        currentState.sandboxes[currentState.current.username],
};
