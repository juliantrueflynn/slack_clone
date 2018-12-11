import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import success from './successReducer';
import entities from './entitiesReducer';
import ui from './uiReducer';
import isLoading from './isLoadingReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  session,
  entities,
  ui,
  errors,
  success,
  isLoading,
  search,
});

export default rootReducer;
