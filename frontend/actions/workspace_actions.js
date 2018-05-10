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
export const DELETE_WORKSPACE = 'DELETE_WORKSPACE';
export const DELETE_WORKSPACE_SUCCESS = 'DELETE_WORKSPACE_SUCCESS';

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

export const loadWorkspacePage = workspaceSlug => ({
  type: LOAD_WORKSPACE_PAGE,
  workspaceSlug
});

export const requestWorkspace = workspaceSlug => ({
  type: REQUEST_WORKSPACE,
  workspaceSlug
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

export const deleteWorkspace = workspaceSlug => ({
  type: DELETE_WORKSPACE,
  workspaceSlug
});

export const deleteWorkspaceSuccess = workspaceSlug => ({
  type: DELETE_WORKSPACE_SUCCESS,
  workspaceSlug
});