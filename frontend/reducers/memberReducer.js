import merge from 'lodash.merge';
import {
  WORKSPACE,
  USER_APPEARANCE,
  DM_CHAT,
  CHANNEL_SUB,
  CHANNEL,
  MESSAGE,
  WORKSPACE_SUB,
  SIGN_OUT,
  MEMBER,
} from '../actions/actionTypes';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaceSubs } = action.workspaces;
      nextState = Object.assign({}, state);

      const currUser = workspaceSubs[0];
      if (currUser) {
        nextState[currUser.userSlug] = {
          id: currUser.userId,
          slug: currUser.userSlug,
        };
      }

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { members, subs } = action.workspace;

      nextState = members.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        acc[curr.slug].subs = [];
        acc[curr.slug].workspaces = [];
        acc[curr.slug].reactions = [];
        return acc;
      }, {});

      subs.forEach((sub) => {
        nextState[sub.userSlug].subs.push(sub.id);
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, workspaceSub, channelSubs } = action.workspaceSub;

      nextState = Object.assign({}, state);
      nextState[user.slug] = {
        subs: [],
        workspaces: [workspaceSub.workspaceSlug],
        ...user,
      };

      channelSubs.forEach((sub) => {
        nextState[user.slug].subs.push(sub.id);
      });

      return nextState;
    }
    case MESSAGE.INDEX.RECEIVE: {
      const { messages: { reactions } } = action;

      nextState = Object.assign({}, state);
      reactions.forEach(({ id, userSlug }) => {
        if (nextState[userSlug] && nextState[userSlug].reactions) {
          nextState[userSlug].reactions.push(id);
        }
      });

      return nextState;
    }
    case MEMBER.SHOW.RECEIVE: {
      const { member } = action;
      nextState = {};
      nextState[member.slug] = member;
      return merge({}, state, nextState);
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { channelSub: { id, userSlug } } = action;
      nextState = Object.assign({}, state);
      nextState[userSlug].subs.push(id);
      return nextState;
    }
    case DM_CHAT.CREATE.RECEIVE: {
      const { dmChat: { subs } } = action;

      nextState = Object.assign({}, state);
      subs.forEach((sub) => {
        nextState[sub.userSlug].subs.push(sub.id);
      });

      return Object.assign({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { channel: { ownerSlug, subs } } = action;
      const sub = subs[0];

      nextState = Object.assign({}, state);
      if (sub && nextState[ownerSlug].subs) {
        nextState[ownerSlug].subs.push(sub.id);
      }

      return nextState;
    }
    case USER_APPEARANCE.CREATE.RECEIVE:
    case USER_APPEARANCE.DESTROY.RECEIVE: {
      const { userId, userSlug, status } = action;
      nextState = {};
      nextState[userSlug] = {
        id: userId,
        slug: userSlug,
        status,
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default memberReducer;
