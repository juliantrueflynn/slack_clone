import {
  OPEN_EDIT_MESSAGE, CLOSE_EDIT_MESSAGE, EDIT_MESSAGE_SUCCESS
} from '../actions/message_actions';
import { LOAD_CHANNEL_PAGE } from '../actions/channel_actions';
import { LOAD_WORKSPACE_PAGE } from '../actions/workspace_actions';

const defaultState = null;

const messageUiReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case OPEN_EDIT_MESSAGE :
      return action.message.id;
    case EDIT_MESSAGE_SUCCESS :
    case CLOSE_EDIT_MESSAGE :
    case LOAD_CHANNEL_PAGE :
    case LOAD_WORKSPACE_PAGE :
      return defaultState;
    default :
      return state;
  }
};

export default messageUiReducer;