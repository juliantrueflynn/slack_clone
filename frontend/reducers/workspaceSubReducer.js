import merge from 'lodash.merge';
import { WORKSPACE_SUB, WORKSPACE } from '../actions/actionTypes';

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
      const { user, workspaceSub } = action.workspaceSub;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.workspaceSlug].members.push(user.slug);
      return nextState;
    }
    case WORKSPACE_SUB.UPDATE.RECEIVE: {
      const { workspaceSub } = action;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.id].isMember = workspaceSub.isMember;
      return nextState;
    }
    default:
      return state;
  }
};

export default workspaceSubReducer;
