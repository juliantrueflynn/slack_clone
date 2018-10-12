import merge from 'lodash.merge';
import {
  WORKSPACE,
  USER_APPEARANCE,
  DM_CHAT,
  CHANNEL_SUB,
  CHANNEL,
  WORKSPACE_SUB,
  SIGN_OUT,
  MEMBER,
  AVATAR,
} from '../actions/actionTypes';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaceSubs } = action.workspaces;
      nextState = Object.assign({}, state);

      const currUser = workspaceSubs[0];
      if (!currUser) {
        return state;
      }

      nextState[currUser.userSlug] = {
        id: currUser.userId,
        slug: currUser.userSlug,
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { members, channelSubs } = action.workspace;

      nextState = members.reduce((acc, curr) => {
        acc[curr.slug] = {
          subs: [],
          ...curr,
        };

        return acc;
      }, {});

      channelSubs.forEach((sub) => {
        nextState[sub.userSlug].subs.push(sub.id);
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, channelSubs } = action.workspaceSub;

      nextState = Object.assign({}, state);
      nextState[user.slug] = {
        subs: [],
        ...user,
      };

      channelSubs.forEach((sub) => {
        nextState[user.slug].subs.push(sub.id);
      });

      return merge({}, state, nextState);
    }
    case MEMBER.SHOW.RECEIVE: {
      const { member } = action;
      nextState = {};
      nextState[member.slug] = member;
      return merge({}, state, nextState);
    }
    case AVATAR.UPDATE.RECEIVE: {
      const { avatarDisplays, userSlug } = action;
      nextState = Object.assign({}, state);
      nextState[userSlug].avatarDisplays = avatarDisplays;
      return nextState;
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
