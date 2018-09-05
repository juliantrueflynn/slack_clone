import { WORKSPACE, WORKSPACE_SUB } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchWorkspaces = {
  request: () => actionCreator(WORKSPACE.INDEX.REQUEST),
  receive: workspaces => actionCreator(WORKSPACE.INDEX.RECEIVE, { workspaces }),
  failure: errors => actionCreator(WORKSPACE.INDEX.FAILURE, { errors }),
};

export const fetchWorkspace = {
  request: workspaceSlug => actionCreator(WORKSPACE.SHOW.REQUEST, { workspaceSlug }),
  receive: workspace => actionCreator(WORKSPACE.SHOW.RECEIVE, { workspace }),
  failure: errors => actionCreator(WORKSPACE.SHOW.FAILURE, { errors }),
};

export const createWorkspace = {
  request: workspace => actionCreator(WORKSPACE.CREATE.REQUEST, { workspace }),
  failure: errors => actionCreator(WORKSPACE.CREATE.FAILURE, { errors }),
};

export const updateWorkspace = {
  request: workspace => actionCreator(WORKSPACE.UPDATE.REQUEST, { workspace }),
  failure: errors => actionCreator(WORKSPACE.UPDATE.FAILURE, { errors }),
};

export const deleteWorkspace = {
  request: workspaceSlug => actionCreator(WORKSPACE.SHOW.REQUEST, { workspaceSlug }),
  failure: errors => actionCreator(WORKSPACE.SHOW.FAILURE, { errors }),
};

export const createWorkspaceSub = {
  request: workspaceSub => actionCreator(WORKSPACE_SUB.CREATE.REQUEST, { workspaceSub }),
  failure: errors => actionCreator(WORKSPACE_SUB.CREATE.FAILURE, { errors }),
};

export const deleteWorkspaceSub = {
  request: workspaceId => actionCreator(WORKSPACE_SUB.DESTROY.REQUEST, { workspaceId }),
  failure: errors => actionCreator(WORKSPACE_SUB.DESTROY.FAILURE, { errors }),
};
