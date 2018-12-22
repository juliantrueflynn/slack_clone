import { WORKSPACE, SIGN_OUT } from '../actions/actionTypes';

const _defaultState = null;

const defaultChannelReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { channels } = action.workspace;
      const firstChannel = channels.sort((a, b) => a.id - b.id)[0];

      return firstChannel.slug;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default defaultChannelReducer;
