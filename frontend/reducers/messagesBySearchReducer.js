import { SEARCH, SEARCH_QUERY_UPDATE } from '../actions/actionTypes';

const _defaultState = [];

const messagesBySearchReducer = (state = _defaultState, action) => {
  switch (action.type) {
    case SEARCH.INDEX.RECEIVE:
      return action.messages.messages.map(msg => msg.slug);
    case SEARCH_QUERY_UPDATE: {
      const { searchQuery } = action;

      if (!searchQuery) {
        return _defaultState;
      }

      return state;
    }
    default:
      return state;
  }
};

export default messagesBySearchReducer;
