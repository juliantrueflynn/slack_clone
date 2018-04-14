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