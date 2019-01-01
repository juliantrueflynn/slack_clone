import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import success from './successReducer';
import entities from './entitiesReducer';
import ui from './uiReducer';
import isLoading from './isLoadingReducer';
import search from './searchReducer';
import unreadsByChannel from './unreadsByChannelReducer';
import displayChannelData from './displayChannelDataReducer';

const rootReducer = combineReducers({
  session,
  entities,
  ui,
  errors,
  success,
  isLoading,
  search,
  unreadsByChannel,
  displayChannelData,
});

export default rootReducer;
