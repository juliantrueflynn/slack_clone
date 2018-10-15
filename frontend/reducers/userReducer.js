import merge from 'lodash.merge';
import {
  WORKSPACE,
  USER_APPEARANCE,
  CHANNEL_SUB,
  CHANNEL,
  WORKSPACE_SUB,
  SIGN_OUT,
  USER,
} from '../actions/actionTypes';

const userReducer = (state = {}, action) => {
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
      const { members, userAppearances, channelSubs } = action.workspace;

      nextState = members.reduce((acc, curr) => {
        acc[curr.slug] = {
          subs: [],
          status: 'offline',
          ...curr,
        };

        return acc;
      }, {});

      userAppearances.forEach((userAppear) => {
        nextState[userAppear.userSlug].status = userAppear.status;
      });

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
    case USER.SHOW.RECEIVE: {
      const { user } = action;
      nextState = {};
      nextState[user.slug] = user;
      return merge({}, state, nextState);
    }
    case USER.UPDATE.RECEIVE: {
      const { user } = action;
      nextState = Object.assign({}, state);
      nextState[user.slug].avatarBanner = user.avatarBanner;
      nextState[user.slug].avatarThumb = user.avatarThumb;
      nextState[user.slug].avatarLarge = user.avatarLarge;
      return nextState;
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { channelSub: { id, userSlug } } = action;
      nextState = Object.assign({}, state);
      nextState[userSlug].subs.push(id);
      return nextState;
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { subs } = action.channel;

      nextState = {};
      subs.forEach((sub) => {
        nextState[sub.userSlug] = { subs: [sub.id] };
      });

      return merge({}, state, nextState);
    }
    case USER_APPEARANCE.CREATE.RECEIVE:
    case USER_APPEARANCE.DESTROY.RECEIVE: {
      const { userSlug, status } = action.userAppearance;
      nextState = Object.assign({}, state);
      nextState[userSlug].status = status;
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default userReducer;
