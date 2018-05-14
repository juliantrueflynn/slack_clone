import {
  CREATE_CHANNEL_FAILURE,
  UPDATE_CHANNEL_FAILURE,
  DELETE_CHANNEL_FAILURE,
  CHANNEL_FAILURE,
  CHANNELS_FAILURE,
  DEFAULT_CHANNELS_FAILURE,
  CREATE_CHANNEL_RECEIVE,
  CREATE_CHANNEL_REQUEST
} from '../actions/channelActions';
import { MODAL_CLOSE, NEW_CHANNEL_MODAL } from '../actions/modalActions';

const _nullErrors = [];

const channelErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANNEL_FAILURE :
    case CHANNELS_FAILURE :
    case CREATE_CHANNEL_FAILURE :
    case UPDATE_CHANNEL_FAILURE :
    case DELETE_CHANNEL_FAILURE :
    case DEFAULT_CHANNELS_FAILURE :
      return [...action.errors];
    case CREATE_CHANNEL_REQUEST :
    case CREATE_CHANNEL_RECEIVE :
      return _nullErrors;
    case MODAL_CLOSE : {
      if (action.modalType === NEW_CHANNEL_MODAL) {
        return _nullErrors;
      }

      return state;
    }
    default :
      return state;
  }
};

export default channelErrorsReducer;