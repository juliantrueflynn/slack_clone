import * as WorkspaceAPIUtil from '../util/workspace_api_util';

export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';

export const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

export const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace
});

export const fetchWorkspaces = userId => dispatch => (
  WorkspaceAPIUtil.fetchAll(userId).then(
    workspaces => dispatch(receiveWorkspaces(workspaces))
  )
);

export const fetchWorkspace = workspaceId => dispatch => (
  WorkspaceAPIUtil.fetch(workspaceId).then(
    workspace => dispatch(receiveWorkspace(workspace))
  )
);