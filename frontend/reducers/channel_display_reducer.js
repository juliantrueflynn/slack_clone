import merge from 'lodash/merge';
import { LOAD_CHANNEL_PAGE } from '../actions/channel_actions';
import { WORKSPACE_REQUEST } from '../actions/workspace_actions';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE_REQUEST :
      return null;
    case LOAD_CHANNEL_PAGE :
      return action.channelSlug;
    default :
      return state;
  }
};

export default channelDisplayReducer;