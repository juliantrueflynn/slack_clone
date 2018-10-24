import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import successReducer from './successReducer';
import entitiesReducer from './entitiesReducer';
import uiReducer from './uiReducer';
import isLoadingReducer from './isLoadingReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  errors: errorsReducer,
  success: successReducer,
  isLoading: isLoadingReducer,
});

export default rootReducer;
