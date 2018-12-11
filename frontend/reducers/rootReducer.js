import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import success from './successReducer';
import entities from './entitiesReducer';
import ui from './uiReducer';
import isLoading from './isLoadingReducer';

const rootReducer = combineReducers({
  session,
  entities,
  ui,
  errors,
  success,
  isLoading,
});

export default rootReducer;
