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
        workspace.isMember = sub.isMember;
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace, members, workspaceSubs } = action.workspace;

      nextState = {};
      nextState[workspace.slug] = {
        ...workspace,
        members: members.map(user => user.slug),
        subs: workspaceSubs.map(sub => sub.id),
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const { owner, workspace } = action.workspace;
      nextState = {};
      nextState[workspace.slug] = {
        ownerId: owner.id,
        members: [owner.slug],
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
        subs: [workspaceSub.userSlug],
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { workspaceSub: { user, workspaceSub }, isByCurrentUser } = action;
      nextState = merge({}, state);
      nextState[workspaceSub.workspaceSlug].members.push(user.slug);

      if (isByCurrentUser) {
        nextState[workspaceSub.workspaceSlug].subId = workspaceSub.id;
      }

      return nextState;
    }
    case WORKSPACE_SUB.UPDATE.REQUEST: {
      const { workspaceSlug, isMember } = action.workspaceSub;

      nextState = {};
      nextState[workspaceSlug] = {
        isMember,
        subs: [],
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.UPDATE.RECEIVE: {
      const { workspaceSub: { workspaceSub }, isByCurrentUser } = action;
      nextState = merge({}, state);

      if (!state[workspaceSub.workspaceSlug].subs.includes(workspaceSub.id)) {
        nextState[workspaceSub.workspaceSlug].subs.push(workspaceSub.id);
      }

      if (isByCurrentUser) {
        nextState[workspaceSub.workspaceSlug].subId = workspaceSub.id;
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
