export const RECEIVE_WORKSPACE_SUB = 'RECEIVE_WORKSPACE_SUB';
export const CREATE_WORKSPACE_SUB = 'CREATE_WORKSPACE_SUB';
export const CREATE_WORKSPACE_SUB_SUCCESS = 'CREATE_WORKSPACE_SUB_SUCCESS';
export const CREATE_WORKSPACE_SUB_ERRORS = 'CREATE_WORKSPACE_SUB_ERRORS';

export const receiveWorkspaceSub = workspaceSub => ({
  type: RECEIVE_WORKSPACE_SUB,
  workspaceSub
});

export const createWorkspaceSub = workspaceSub => ({
  type: CREATE_WORKSPACE_SUB,
  workspaceSub
});

export const createWorkspaceSubSuccess = workspaceSub => ({
  type: CREATE_WORKSPACE_SUB_SUCCESS,
  workspaceSub
});

export const createWorkspaceSubErrors = errors => ({
  type: CREATE_WORKSPACE_SUB_ERRORS,
  errors
});