import { MESSAGE_EDITOR_TOGGLE } from '../actions/actionTypes';

const isEditingMessageReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE_EDITOR_TOGGLE:
      return action.messageSlug;
    default:
      return state;
  }
};

export default isEditingMessageReducer;
