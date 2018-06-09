import {
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  CHANNEL,
  CHANNELS,
} from '../actions/actionTypes';
import { MODAL_CLOSE, NEW_CHANNEL_MODAL } from '../actions/modalActions';

const _nullErrors = [];

const channelErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANNEL.FAILURE:
    case CHANNELS.FAILURE:
    case CREATE_CHANNEL.FAILURE:
    case UPDATE_CHANNEL.FAILURE:
    case DELETE_CHANNEL.FAILURE:
      return [...action.errors];
    case CREATE_CHANNEL.REQUEST:
    case CREATE_CHANNEL.RECEIVE:
      return _nullErrors;
    case MODAL_CLOSE: {
      if (action.modalType === NEW_CHANNEL_MODAL) {
        return _nullErrors;
      }

      return state;
    }
    default:
      return state;
  }
};

export default channelErrorsReducer;
