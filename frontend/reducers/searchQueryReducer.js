import {
  SEARCH_DESTROY,
  SEARCH,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const searchQueryReducer = (state = '', action) => {
  Object.freeze(state);

  switch (action.type) {
    case SEARCH.INDEX.REQUEST:
      return action.query;
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
    case SEARCH_DESTROY:
      return '';
    default:
      return state;
  }
};

export default searchQueryReducer;
