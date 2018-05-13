export const WORKSPACES_REQUEST = 'WORKSPACES_REQUEST';
export const WORKSPACES_RECEIVE = 'WORKSPACES_RECEIVE';
export const WORKSPACES_FAILURE = 'WORKSPACES_FAILURE';
export const WORKSPACE_REQUEST = 'WORKSPACE_REQUEST';
export const WORKSPACE_RECEIVE = 'WORKSPACE_RECEIVE';
export const WORKSPACE_FAILURE = 'WORKSPACE_FAILURE';
export const CREATE_WORKSPACE_REQUEST = 'CREATE_WORKSPACE_REQUEST';
export const CREATE_WORKSPACE_RECEIVE = 'CREATE_WORKSPACE_RECEIVE';
export const CREATE_WORKSPACE_FAILURE = 'CREATE_WORKSPACE_FAILURE';
export const UPDATE_WORKSPACE_REQUEST = 'UPDATE_WORKSPACE_REQUEST';
export const UPDATE_WORKSPACE_SUCCESS = 'UPDATE_WORKSPACE_SUCCESS';
export const UPDATE_WORKSPACE_FAILURE = 'UPDATE_WORKSPACE_FAILURE';
export const DELETE_WORKSPACE_REQUEST = 'DELETE_WORKSPACE_REQUEST';
export const DELETE_WORKSPACE_RECEIVE = 'DELETE_WORKSPACE_RECEIVE';
export const DELETE_WORKSPACE_FAILURE = 'DELETE_WORKSPACE_FAILURE';

export const workspacesRequest = () => ({
  type: WORKSPACES_REQUEST
});

export const workspacesReceive = workspaces => ({
  type: WORKSPACES_RECEIVE,
  workspaces
});

export const workspacesFailure = errors => ({
  type: WORKSPACES_FAILURE,
  errors
});

export const createWorkspaceRequest = workspace => ({
  type: CREATE_WORKSPACE_REQUEST,
  workspace
});

export const createWorkspaceReceive = workspace => ({
  type: CREATE_WORKSPACE_RECEIVE,
  workspace
});

export const createWorkspaceFailure = errors => ({
  type: CREATE_WORKSPACE_FAILURE,
  errors
});

export const workspaceRequest = workspaceSlug => ({
  type: WORKSPACE_REQUEST,
  workspaceSlug
});

export const workspaceReceive = workspace => ({
  type: WORKSPACE_RECEIVE,
  workspace
});

export const workspaceFailure = errors => ({
  type: WORKSPACE_FAILURE,
  errors
});

export const updateWorkspaceRequest = workspace => ({
  type: UPDATE_WORKSPACE_REQUEST,
  workspace
});

export const updateWorkspaceSuccess = workspace => ({
  type: UPDATE_WORKSPACE_SUCCESS,
  workspace
});

export const updateWorkspaceFailure = workspace => ({
  type: UPDATE_WORKSPACE_FAILURE,
  workspace
});

export const deleteWorkspaceRequest = workspaceSlug => ({
  type: DELETE_WORKSPACE_REQUEST,
  workspaceSlug
});

export const deleteWorkspaceSuccess = workspaceSlug => ({
  type: DELETE_WORKSPACE_RECEIVE,
  workspaceSlug
});

export const deleteWorkspaceFailure = workspaceSlug => ({
  type: DELETE_WORKSPACE_FAILURE,
  workspaceSlug
});