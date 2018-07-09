import { MEMBER } from '../actions/actionTypes';

const displayUserSlugReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MEMBER.SHOW.REQUEST:
      return action.userSlug;
    default:
      return state;
  }
};

export default displayUserSlugReducer;
