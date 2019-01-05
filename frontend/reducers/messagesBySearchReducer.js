import {
  SEARCH,
  SEARCH_QUERY_UPDATE,
  WORKSPACE_SUB,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

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
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default messagesBySearchReducer;
