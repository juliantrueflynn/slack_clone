import {
  OPEN_RIGHT_SIDEBAR,
  CLOSE_RIGHT_SIDEBAR
} from "../actions/rightSidebarActions";
import { CHANNEL_RECEIVE, CHANNEL_REQUEST } from "../actions/channelActions";

const _defaultSidebar = null;

const rightSidebarReducer = (state = _defaultSidebar, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case OPEN_RIGHT_SIDEBAR : {
      const { sidebarType, sidebarProps} = action;
      nextState = { sidebarType, sidebarProps };

      return nextState;
    }
    case CHANNEL_REQUEST :
    case CHANNEL_RECEIVE : {
      const { messageSlug } = action;
      if (messageSlug) {
        const sidebarProps = { messageSlug };
        nextState = { sidebarType: 'Thread', sidebarProps };
        return nextState;
      }

      return _defaultSidebar;
    }
    case CLOSE_RIGHT_SIDEBAR :
      return null;
    default :
      return _defaultSidebar;
  }
};

export default rightSidebarReducer;