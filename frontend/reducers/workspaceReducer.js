import merge from 'lodash.merge';
import { WORKSPACE, WORKSPACE_SUB } from '../actions/actionTypes';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaces: { workspaces, subs } } = action;

      nextState = workspaces;
      Object.values(workspaces).forEach(({ slug, ownerSlug }) => {
        nextState[slug].subs = [ownerSlug];
        nextState[slug].isOwner = false;
        nextState[slug].isSub = false;
      });

      subs.forEach(({ workspaceSlug, userSlug }) => {
        if (!subs.includes(userSlug)) {
          nextState[workspaceSlug].subs.push(userSlug);
          nextState[workspaceSlug].isOwner = true;
          nextState[workspaceSlug].isSub = true;
        }
      });

      return nextState;
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { workspace } } = action;
      nextState = { [workspace.slug]: workspace };
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
      const { workspaceSub: { workspaceSlug } } = action;
      nextState = Object.assign({}, state);
      nextState[workspaceSlug].isSub = true;
      return nextState;
    }
    case WORKSPACE_SUB.DESTROY.RECEIVE: {
      const { workspaceSub: { workspaceSlug } } = action;
      nextState = Object.assign({}, state);
      nextState[workspaceSlug].isSub = false;
      return nextState;
    }
    default:
      return state;
  }
};

export default workspaceReducer;
