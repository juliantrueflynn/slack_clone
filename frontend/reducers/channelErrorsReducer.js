import { CHANNEL } from '../actions/actionTypes';
import { MODAL_CLOSE } from '../actions/interactiveActions';

const channelErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANNEL.INDEX.FAILURE:
    case CHANNEL.SHOW.FAILURE:
    case CHANNEL.CREATE.FAILURE:
    case CHANNEL.UPDATE.FAILURE:
    case CHANNEL.DESTROY.FAILURE:
      return [...action.errors];
    case CHANNEL.CREATE.REQUEST:
    case CHANNEL.CREATE.RECEIVE:
      return [];
    case MODAL_CLOSE: {
      if (action.modalType === 'NEW_CHANNEL_MODAL') {
        return [];
      }
      return state;
    }
    default:
      return state;
  }
};

export default channelErrorsReducer;
