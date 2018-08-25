import { WORKSPACE, USER_APPEARANCE, DM_CHAT } from '../actions/actionTypes';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { members, subs } } = action;

      nextState = members.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        acc[curr.slug].subs = [];
        return acc;
      }, {});

      subs.forEach((sub) => {
        nextState[sub.userSlug].subs.push(sub.id);
      });

      return nextState;
    }
    case DM_CHAT.CREATE.RECEIVE: {
      const { dmChat: { subs } } = action;
      nextState = Object.assign({}, state);

      subs.forEach((sub) => {
        nextState[sub.userSlug].subs.push(sub.id);
      });

      return Object.assign({}, state, nextState);
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
