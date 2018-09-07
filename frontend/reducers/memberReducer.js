import merge from 'lodash.merge';
import {
  WORKSPACE,
  USER_APPEARANCE,
  DM_CHAT,
  CHANNEL_SUB,
  CHANNEL,
} from '../actions/actionTypes';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { members, subs } } = action;

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

      return merge({}, nextState);
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { channel: { reactions } } = action;

      nextState = Object.assign({}, state);
      reactions.forEach(({ id, userSlug }) => {
        if (nextState[userSlug]) nextState[userSlug].reactions.push(id);
      });

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
    case USER_APPEARANCE.CREATE.RECEIVE: {
      const { userSlug, status } = action;
      nextState = Object.assign({}, state);
      if (!nextState[userSlug]) return state;
      nextState[userSlug].status = status;
      return nextState;
    }
    case USER_APPEARANCE.DESTROY.RECEIVE: {
      const { userSlug, status } = action;
      nextState = Object.assign({}, state);
      if (!nextState[userSlug]) return state;
      nextState[userSlug].status = status;
      return nextState;
    }
    default:
      return state;
  }
};

export default memberReducer;
