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
