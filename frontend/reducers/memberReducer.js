import { WORKSPACE, USER_APPEARANCE } from '../actions/actionTypes';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      return action.workspace.members.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        return acc;
      }, {});
    }
    case USER_APPEARANCE.RECEIVE: {
      const { userSlug, status } = action;
      nextState = Object.assign({}, state);
      nextState[userSlug].status = status;
      return nextState;
    }
    default:
      return state;
  }
};

export default memberReducer;
