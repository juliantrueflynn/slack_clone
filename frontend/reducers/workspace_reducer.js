import merge from 'lodash/merge';
import { RECEIVE_WORKSPACES } from '../actions/workspace_actions';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_WORKSPACES :
      return action.workspaces;
    default :
      return state;
  }
};

export default workspaceReducer;