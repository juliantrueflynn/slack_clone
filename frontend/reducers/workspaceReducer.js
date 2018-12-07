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
        const workspace = nextState[sub.workspaceSlug];

        if (!workspace.members.includes(sub.userSlug)) {
          workspace.members.push(sub.userSlug);
        }

        workspace.subs.push(sub.id);
        workspace.subId = sub.id;
        workspace.isSub = sub.isMember;
        workspace.isMember = sub.isMember;
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

      nextState = {};
      nextState[workspace.slug] = {
        ...workspace,
        members: members.map(user => user.slug),
        channels: channels.map(ch => ch.slug),
        subs: workspaceSubs.map(sub => sub.id),
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
    case WORKSPACE_SUB.CREATE.REQUEST: {
      const { workspaceSub } = action;
      nextState = {};
      nextState[workspaceSub.workspaceSlug] = {
        id: workspaceSub.workspaceId,
        slug: workspaceSub.workspaceSlug,
        isMember: true,
        isSub: true,
        subs: [workspaceSub.userSlug],
        channels: []
      };
      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, workspaceSub: { workspaceSlug } } = action.workspaceSub;
      nextState = merge({}, state);
      nextState[workspaceSlug].members.push(user.slug);
      return nextState;
    }
    case WORKSPACE_SUB.UPDATE.REQUEST: {
      const { workspaceSlug, isMember } = action.workspaceSub;
      nextState = merge({}, state);
      nextState[workspaceSlug].isSub = isMember;
      nextState[workspaceSlug].isMember = isMember;
      return nextState;
    }
    case WORKSPACE_SUB.UPDATE.RECEIVE: {
      const { id, workspaceSlug } = action.workspaceSub.workspaceSub;
      nextState = merge({}, state);

      if (!state[workspaceSlug].includes(id)) {
        nextState[workspaceSlug].subs.push(id);
      }

      return nextState;
    }
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default workspaceReducer;
