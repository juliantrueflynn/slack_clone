import { RECEIVE_WORKSPACE_ERRORS } from '../actions/workspace_actions';

const workspaceErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_WORKSPACE_ERRORS :
      return action.errors;
    default :
      return state;
  }
};

export default workspaceErrorsReducer;