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

      const [currUser] = workspaceSubs;
      if (!currUser) {
        return state;
      }

      nextState = {};
      nextState[currUser.userSlug] = {
        id: currUser.userId,
        slug: currUser.userSlug,
        subs: [],
        status: 'online'
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

      nextState = {};
      nextState[user.slug] = {
        subs: [],
        ...user,
      };

      channelSubs.forEach((sub) => {
        nextState[user.slug].subs.push(sub.id);
      });

      return merge({}, state, nextState);
    }
    case USER.UPDATE.RECEIVE:
    case USER.SHOW.RECEIVE: {
      const { id, slug, ...rest } = action.user;
      nextState = {};
      nextState[slug] = rest;
      return merge({}, state, nextState);
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { channelSub: { id, userSlug } } = action;
      nextState = merge({}, state);
      nextState[userSlug].subs.push(id);
      return nextState;
    }
    case CHANNEL_SUB.DESTROY.RECEIVE: {
      const { channelSub: { id, userSlug } } = action;
      nextState = {};
      nextState[userSlug] = { subs: state[userSlug].subs.filter(subId => id !== subId) };
      return merge({}, state, nextState);
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
      nextState = {};
      nextState[userSlug] = { status };
      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default userReducer;
