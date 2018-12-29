import {
  SEARCH_QUERY_UPDATE,
  SEARCH,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const searchQueryReducer = (state = '', action) => {
  Object.freeze(state);

  switch (action.type) {
    case SEARCH_QUERY_UPDATE:
    case SEARCH.INDEX.REQUEST:
      return action.searchQuery;
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
    default:
      return state;
  }
};

export default searchQueryReducer;
