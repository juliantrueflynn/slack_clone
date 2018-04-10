import * as WorkspaceSubAPIUtil from '../util/workspace_sub_api_util';

export const RECEIVE_WORKSPACE_SUB = 'RECEIVE_WORKSPACE_SUB';

export const receiveWorkspaceSub = workspaceSub => ({
  type: RECEIVE_WORKSPACE_SUB,
  workspaceSub
});

export const createWorkspaceSub = workspaceSub => dispatch => (
  WorkspaceSubAPIUtil.createWorkspaceSub(workspaceSub).then(
    newWorkspaceSub => dispatch(receiveWorkspaceSub(newWorkspaceSub))
  )
);