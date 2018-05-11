import { OPEN_THREAD, CLOSE_THREAD } from '../actions/message_thread_actions';

const messageThreadReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case OPEN_THREAD :
      return action.messageSlug;
    case CLOSE_THREAD :
      return null;
    default :
      return state;
  }
};

export default messageThreadReducer;