import { MEMBER, WORKSPACE, SIGN_OUT } from '../actions/actionTypes';

const displayUserSlugReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MEMBER.SHOW.REQUEST:
      return action.userSlug;
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return null;
    default:
      return state;
  }
};

export default displayUserSlugReducer;
