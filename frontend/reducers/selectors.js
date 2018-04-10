import values from 'lodash/values';

export const selectWorkspaces = state => (
  values(state.entities.workspaces)
);