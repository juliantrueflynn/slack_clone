import { CREATE_REACTION_RECEIVE } from "../actions/reactionActions";

const reactionReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CREATE_REACTION_RECEIVE : {
      const { reaction } = action;
      nextState = { [reaction.id]: reaction };

      return Object.assign({}, state, nextState);
    }
    default :
      return state;
  }
};

export default reactionReducer;