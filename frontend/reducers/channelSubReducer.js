import merge from 'lodash.merge';
import {
  CHANNEL_SUB,
  WORKSPACE,
  DM_CHAT,
  CHANNEL,
  WORKSPACE_SUB,
  SIGN_OUT,
} from '../actions/actionTypes';

const channelSubReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { channelSubs } } = action;

      return channelSubs.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { channelSub } = action;
      nextState = Object.assign({}, state);
      nextState[channelSub.id] = channelSub;
      return nextState;
    }
    case DM_CHAT.CREATE.RECEIVE: {
      const { dmChat: { subs } } = action;

      nextState = {};
      subs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { channelSubs } = action.workspaceSub;

      nextState = {};
      channelSubs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

      return merge({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { channel: { ownerSlug: userSlug, subs, slug: channelSlug } } = action;
      nextState = Object.assign({}, state);
      nextState[subs[0].id] = { channelSlug, userSlug, ...subs[0] };
      return nextState;
    }
    case CHANNEL_SUB.UPDATE.RECEIVE: {
      const { id, inSidebar } = action.channelSub;
      nextState = Object.assign({}, state);
      nextState[id].inSidebar = inSidebar;
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default channelSubReducer;
