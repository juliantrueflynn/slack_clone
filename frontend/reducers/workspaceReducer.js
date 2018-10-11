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
          subs: [],
          channels: [],
          ...workspace
        };
      });

      workspaceSubs.forEach((sub) => {
        const hasSub = nextState[sub.workspaceSlug].members.includes(sub.userSlug);
        if (!hasSub) {
          nextState[sub.workspaceSlug].members.push(sub.userSlug);
        }

        nextState[sub.workspaceSlug].subs.push(sub.id);
        nextState[sub.workspaceSlug].subId = sub.id;
        nextState[sub.workspaceSlug].isSub = sub.isMember;
        nextState[sub.workspaceSlug].isMember = sub.isMember;
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const {
        workspace,
        members,
        channels,
        workspaceSubs,
      } = action.workspace;

      nextState = Object.assign({}, state);
      nextState[workspace.slug] = {
        members: members.map(user => user.slug),
        channels: channels.map(ch => ch.slug),
        subs: workspaceSubs.map(sub => sub.id),
        ...workspace,
      };

      return merge({}, state, nextState);
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
    case WORKSPACE_SUB.UPDATE.REQUEST: {
      const { workspaceSub } = action;
      nextState = Object.assign({}, state);
      nextState[workspaceSub.workspaceSlug].isSub = workspaceSub.isMember;
      nextState[workspaceSub.workspaceSlug].isMember = workspaceSub.isMember;
      return nextState;
    }
    case WORKSPACE_SUB.UPDATE.RECEIVE: {
      const { workspaceSub } = action.workspaceSub;
      nextState = {};
      nextState[workspaceSub.workspaceSlug] = { subs: [workspaceSub.id] };
      return merge({}, state, nextState);
    }
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default workspaceReducer;
