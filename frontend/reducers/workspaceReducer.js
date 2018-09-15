import merge from 'lodash.merge';
import { WORKSPACE, WORKSPACE_SUB, SIGN_OUT } from '../actions/actionTypes';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaces, workspaceSubs } = action.workspaces;
      nextState = {};

      workspaces.forEach((workspace) => {
        nextState[workspace.slug] = {
          members: [workspace.ownerSlug],
          channels: [],
          ...workspace
        };
      });

      workspaceSubs.forEach(({ workspaceSlug, userSlug }) => {
        if (workspaceSubs.includes(userSlug)) return;
        nextState[workspaceSlug].members.push(userSlug);
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace, members, channels } = action.workspace;
      nextState = Object.assign({}, state);
      nextState[workspace.slug] = {
        members: members.map(user => user.slug),
        channels: channels.map(ch => ch.slug),
        ...workspace,
      };

      return nextState;
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const { owner, workspace, channels } = action.workspace;
      nextState = {};
      nextState[workspace.slug] = {
        ownerId: owner.id,
        members: [owner.slug],
        channels: channels.map(ch => ch.slug),
        ...workspace,
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, workspaceSub } = action.workspaceSub;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.workspaceSlug].members.push(user.slug);
      return nextState;
    }
    case WORKSPACE_SUB.DESTROY.RECEIVE: {
      const { workspaceSub: { workspaceSlug, userSlug } } = action.workspaceSub;
      nextState = Object.assign({}, state);
      nextState[workspaceSlug].members = nextState[workspaceSlug].members.filter(memberSlug => (
        memberSlug !== userSlug
      ));

      return nextState;
    }
    case SIGN_OUT.RECEIVE: {
      return {};
    }
    default:
      return state;
  }
};

export default workspaceReducer;
