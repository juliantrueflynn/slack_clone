import { combineReducers } from 'redux';
import filters from './searchFiltersReducer';

const searchReducer = combineReducers({
  filters,
});

export default searchReducer;
