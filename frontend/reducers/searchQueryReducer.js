import { SEARCH_DESTROY, SEARCH } from '../actions/actionTypes';

const searchQueryReducer = (state = '', action) => {
  Object.freeze(state);

  switch (action.type) {
    case SEARCH.INDEX.REQUEST:
      return action.query;
    case SEARCH_DESTROY:
      return '';
    default:
      return state;
  }
};

export default searchQueryReducer;
