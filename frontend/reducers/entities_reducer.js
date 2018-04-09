import { combineReducers } from 'redux';
import workspaces from './workspace_reducer';

const entitiesReducer = combineReducers({
  workspaces,
});

export default entitiesReducer;