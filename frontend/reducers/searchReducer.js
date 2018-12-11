import { combineReducers } from 'redux';
import searchQuery from './searchQueryReducer';
import messagesBySearch from './messagesBySearchReducer';

const searchReducer = combineReducers({
  searchQuery,
  messagesBySearch,
});

export default searchReducer;
