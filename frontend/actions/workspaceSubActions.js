export const CREATE_WORKSPACE_SUB_REQUEST = 'CREATE_WORKSPACE_SUB_REQUEST';
export const CREATE_WORKSPACE_SUB_RECEIVE = 'CREATE_WORKSPACE_SUB_RECEIVE';
export const CREATE_WORKSPACE_SUB_FAILURE = 'CREATE_WORKSPACE_SUB_FAILURE';

export const createWorkspaceSubRequest = workspaceId => ({
  type: CREATE_WORKSPACE_SUB_REQUEST,
  workspaceId
});

export const createWorkspaceSubReceive = workspaceSub => ({
  type: CREATE_WORKSPACE_SUB_RECEIVE,
  workspaceSub
});

export const createWorkspaceSubFailure = errors => ({
  type: CREATE_WORKSPACE_SUB_FAILURE,
  errors
});