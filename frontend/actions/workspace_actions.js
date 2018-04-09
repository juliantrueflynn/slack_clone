import * as WorkspaceAPIUtil from '../util/workspace_api_util';

export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const RECEIVE_WORKSPACE_ERRORS = 'RECEIVE_WORKSPACE_ERRORS';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';

export const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

export const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace
});

export const receiveWorkspaceErrors = errors => ({
  type: RECEIVE_WORKSPACE_ERRORS,
  errors
});

export const removeWorkspace = workspace => ({
  type: REMOVE_WORKSPACE,
  workspace
});

export const fetchWorkspaces = () => dispatch => (
  WorkspaceAPIUtil.fetchAll().then(
    workspaces => dispatch(receiveWorkspaces(workspaces))
  )
);

export const fetchWorkspace = workspaceId => dispatch => (
  WorkspaceAPIUtil.fetch(workspaceId).then(
    workspace => dispatch(receiveWorkspace(workspace))
  )
);

export const destroyWorkspace = workspaceId => dispatch => (
  WorkspaceAPIUtil.destroy(workspaceId).then(
    delWorkspace => dispatch(removeWorkspace(delWorkspace))
  )
);