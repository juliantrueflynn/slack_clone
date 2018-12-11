import { SEARCH, SEARCH_DESTROY } from '../actions/actionTypes';

const _defaultState = [];

const messagesBySearchReducer = (state = _defaultState, action) => {
  switch (action.type) {
    case SEARCH.INDEX.RECEIVE:
      return action.messages.messages.map(msg => msg.slug);
    case SEARCH_DESTROY:
      return _defaultState;
    default:
      return state;
  }
};

export default messagesBySearchReducer;
