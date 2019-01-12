import merge from 'lodash.merge';
import {
  CHATROOM_SUB,
  WORKSPACE,
  CHATROOM,
  WORKSPACE_SUB,
  SIGN_OUT,
} from '../actions/actionTypes';

const chatroomSubReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { chatroomSubs } = action.workspace;

      return chatroomSubs.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case CHATROOM_SUB.CREATE.RECEIVE: {
      const { chatroomSub } = action;
      nextState = {};
      nextState[chatroomSub.id] = chatroomSub;
      return merge({}, state, nextState);
    }
    case CHATROOM_SUB.UPDATE.RECEIVE: {
      const { id, inSidebar } = action.chatroomSub;
      nextState = {};
      nextState[id] = { inSidebar };
      return merge({}, state, nextState);
    }
    case CHATROOM_SUB.DESTROY.RECEIVE: {
      const { chatroomSub } = action;
      nextState = merge({}, state);
      delete nextState[chatroomSub.id];
      return nextState;
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { chatroomSubs } = action.workspaceSub;

      nextState = {};
      chatroomSubs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

      return merge({}, state, nextState);
    }
    case CHATROOM.CREATE.RECEIVE: {
      const { chatroomSubs } = action.chatroom;

      nextState = {};
      chatroomSubs.forEach((sub) => {
        nextState[sub.id] = sub;
      });

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

export default chatroomSubReducer;
