import {
  OPEN_EDIT_MESSAGE,
  CLOSE_EDIT_MESSAGE,
  EDIT_MESSAGE_SUCCESS
} from '../actions/messageActions';
import { CHANNEL_REQUEST } from '../actions/channelActions';
import { WORKSPACE_REQUEST } from '../actions/workspaceActions';

const defaultState = null;

const messageUiReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case OPEN_EDIT_MESSAGE :
      return action.message.slug;
    case EDIT_MESSAGE_SUCCESS :
    case CLOSE_EDIT_MESSAGE :
    case CHANNEL_REQUEST :
    case WORKSPACE_REQUEST :
      return defaultState;
    default :
      return state;
  }
};

export default messageUiReducer;