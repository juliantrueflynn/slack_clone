import values from 'lodash/values';

export const getWorkspaces = state => (
  values(state.entities.workspaces)
);

export const getWorkspacesWithKeys = state => (
  state.entities.workspaces
);

export const getWorkspacePageId = state => (
  state.ui.displayWorkspaceId
);

export const getChannels = state => (
  values(state.entities.channels)
);

export const getChannelPageId = state => (
  state.ui.displayChannelId
);

export const getCurrentUser = state => (
  state.session.currentUser
);