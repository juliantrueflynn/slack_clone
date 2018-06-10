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
  receive: workspace => actionCreator(WORKSPACE.CREATE.RECEIVE, { workspace }),
  failure: errors => actionCreator(WORKSPACE.CREATE.FAILURE, { errors }),
};

export const updateWorkspace = {
  request: workspace => actionCreator(WORKSPACE.UPDATE.REQUEST, { workspace }),
  receive: workspace => actionCreator(WORKSPACE.UPDATE.RECEIVE, { workspace }),
  failure: errors => actionCreator(WORKSPACE.UPDATE.FAILURE, { errors }),
};

export const deleteWorkspace = {
  request: workspaceSlug => actionCreator(WORKSPACE.SHOW.REQUEST, { workspaceSlug }),
  receive: workspace => actionCreator(WORKSPACE.SHOW.RECEIVE, { workspace }),
  failure: errors => actionCreator(WORKSPACE.SHOW.FAILURE, { errors }),
};

export const createWorkspaceSub = {
  request: workspaceId => actionCreator(WORKSPACE_SUB.CREATE.REQUEST, { workspaceId }),
  receive: workspaceSub => actionCreator(WORKSPACE_SUB.CREATE.RECEIVE, { workspaceSub }),
  failure: errors => actionCreator(WORKSPACE_SUB.CREATE.FAILURE, { errors }),
};

export const deleteWorkspaceSub = {
  request: workspaceId => actionCreator(WORKSPACE_SUB.DELETE.REQUEST, { workspaceId }),
  receive: workspaceSub => actionCreator(WORKSPACE_SUB.DELETE.RECEIVE, { workspaceSub }),
  failure: errors => actionCreator(WORKSPACE_SUB.DELETE.FAILURE, { errors }),
};
