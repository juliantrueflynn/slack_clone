import { combineReducers } from 'redux';
import workspaces from './workspace_reducer';
import channels from './channel_reducer';

const entitiesReducer = combineReducers({
  workspaces,
  channels,
});

export default entitiesReducer;