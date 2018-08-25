import merge from 'lodash.merge';
import { CHANNEL_SUB, WORKSPACE, DM_CHAT } from '../actions/actionTypes';

const channelSubReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { subs } } = action;

      return subs.reduce((acc, curr) => {
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
    case CHANNEL_SUB.UPDATE.RECEIVE: {
      const { channelSub: { id, inSidebar } } = action;
      nextState = Object.assign({}, state);
      if (nextState[id]) nextState[id].inSidebar = inSidebar;
      return nextState;
    }
    default:
      return state;
  }
};

export default channelSubReducer;
