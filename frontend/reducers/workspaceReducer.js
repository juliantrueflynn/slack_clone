import merge from 'lodash.merge';
import { WORKSPACE, WORKSPACE_SUB } from '../actions/actionTypes';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaces, workspaceSubs } = action.workspaces;
      nextState = Object.assign({}, state);

      workspaces.forEach((workspace) => {
        nextState[workspace.slug] = {
          members: [workspace.ownerSlug],
          ...workspace
        };
      });

      workspaceSubs.forEach(({ workspaceSlug, userSlug }) => {
        if (!workspaceSubs.includes(userSlug)) return;
        nextState[workspaceSlug].members.push(userSlug);
      });

      return nextState;
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace, members } = action.workspace;
      nextState = {
        [workspace.slug]: {
          members: members.map(user => user.slug),
          ...workspace,
        }
      };
      return merge({}, state, nextState);
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const { workspace, channels } = action.workspace;
      nextState = Object.assign({}, state);
      workspace.channels = channels.map(ch => ch.slug);
      workspace.members = [workspace.ownerSlug];
      nextState[workspace.slug] = workspace;
      return nextState;
    }
    case WORKSPACE.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { workspaceSub } = action.workspaceSub;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.workspaceSlug].members.push(workspaceSub.userSlug);
      return nextState;
    }
    case WORKSPACE_SUB.DESTROY.RECEIVE: {
      const { workspaceSub: { workspaceSlug, userSlug } } = action.workspaceSub;
      nextState = Object.assign({}, state);
      const members = nextState[workspaceSlug].members.filter(memberSlug => (
        memberSlug !== userSlug
      ));
      nextState[workspaceSlug].members = members;
      return nextState;
    }
    default:
      return state;
  }
};

export default workspaceReducer;
