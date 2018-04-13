import * as WorkspaceAPIUtil from '../util/workspace_api_util';

export const REQUEST_WORKSPACES = 'REQUEST_WORKSPACES';
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const FAILURE_WORKSPACES = 'FAILURE_WORKSPACES';
export const LOAD_WORKSPACE_PAGE = 'LOAD_WORKSPACE_PAGE';
export const REQUEST_WORKSPACE = 'REQUEST_WORKSPACE';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const FAILURE_WORKSPACE = 'FAILURE_WORKSPACE';
export const CREATE_WORKSPACE = 'CREATE_WORKSPACE';
export const CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS';
export const CREATE_WORKSPACE_ERRORS = 'CREATE_WORKSPACE_ERR ORS';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';

export const requestWorkspaces = (workspaces = {}) => ({
  type: REQUEST_WORKSPACES,
  workspaces
});

export const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

export const failureWorkspaces = errors => ({
  type: FAILURE_WORKSPACES,
  errors
});

export const loadWorkspacePage = (workspaceId, workspaces) => ({
  type: LOAD_WORKSPACE_PAGE,
  workspaceId,
  workspaces
});

export const requestWorkspace = workspaceId => ({
  type: REQUEST_WORKSPACE,
  workspaceId
});

export const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace
});

export const failureWorkspace = errors => ({
  type: FAILURE_WORKSPACE,
  errors
});

export const createWorkspace = workspace => ({
  type: CREATE_WORKSPACE,
  workspace
});

export const createWorkspaceSuccess = workspace => ({
  type: CREATE_WORKSPACE_SUCCESS,
  workspace
});

export const removeWorkspace = workspace => ({
  type: REMOVE_WORKSPACE,
  workspace
});