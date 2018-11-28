import merge from 'lodash.merge';
import {
  CHANNEL_SUB,
  WORKSPACE,
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
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { channelSubs } = action.workspaceSub;

      nextState = {};
      channelSubs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

      return merge({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { subs } = action.channel;

      nextState = {};
      subs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

      return merge({}, state, nextState);
    }
    case CHANNEL_SUB.UPDATE.RECEIVE: {
      const { id, inSidebar } = action.channelSub;
      nextState = Object.assign({}, state);
      nextState[id].inSidebar = inSidebar;
      return nextState;
    }
    case CHANNEL_SUB.DESTROY.RECEIVE: {
      const { channelSub } = action;
      nextState = Object.assign({}, state);
      delete nextState[channelSub.id];
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
