import {
  CREATE_CHANNEL_FAILURE,
  UPDATE_CHANNEL_FAILURE,
  DELETE_CHANNEL_FAILURE,
  CHANNEL_FAILURE,
  CHANNELS_FAILURE,
  DEFAULT_CHANNELS_FAILURE,
  CREATE_CHANNEL_RECEIVE
} from '../actions/channel_actions';
import { MODAL_CLOSE } from '../actions/modal_actions';

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
    case MODAL_CLOSE :
    case CREATE_CHANNEL_RECEIVE :
      return _nullErrors;
    default :
      return state;
  }
};

export default channelErrorsReducer;