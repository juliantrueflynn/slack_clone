import merge from 'lodash.merge';
import { WORKSPACE_SUB, WORKSPACE, SIGN_OUT } from '../actions/actionTypes';

const workspaceSubReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaceSubs } = action.workspaces;

      return workspaceSubs.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspaceSubs } = action.workspace;

      nextState = {};
      workspaceSubs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { workspaceSub } = action.workspaceSub;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.id] = workspaceSub;
      return nextState;
    }
    case WORKSPACE_SUB.UPDATE.REQUEST: {
      const { workspaceSub } = action;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.id] = workspaceSub;
      return merge({}, state, nextState);
    }
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default workspaceSubReducer;
