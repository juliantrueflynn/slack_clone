import merge from 'lodash.merge';
import { WORKSPACE, CHANNEL } from '../actions/actionTypes';
import { SET_STATUS } from '../actions/memberActions';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.RECEIVE: {
      const { workspace } = action;
      nextState = {};
      workspace.members.map((member) => {
        nextState[member.slug] = member;
      });
      return nextState;
    }
    case SET_STATUS: {
      const { userSlug, appearance } = action;
      nextState = { [userSlug]: { appearance } };

      return merge({}, state, nextState);
    }
    default:
      return state;
  }
};

export default memberReducer;
