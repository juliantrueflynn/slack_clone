import merge from 'lodash.merge';
import {
  WORKSPACE,
  USER_APPEARANCE,
  CHATROOM_SUB,
  CHATROOM,
  WORKSPACE_SUB,
  SIGN_OUT,
  USER,
} from '../actions/actionTypes';
import { dateUtil } from '../util/dateUtil';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE: {
      const { workspaceSubs } = action.workspaces;

      const [currUser] = workspaceSubs;
      if (!currUser) {
        return state;
      }

      nextState = {};
      nextState[currUser.userSlug] = {
        id: currUser.userId,
        slug: currUser.userSlug,
        subs: [],
        status: 'online'
      };

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { members, chatroomSubs } = action.workspace;

      nextState = members.reduce((acc, curr) => ({
        ...acc,
        [curr.slug]: { ...curr, subs: [], status: curr.status || 'offline' },
      }), {});

      chatroomSubs.forEach((sub) => {
        nextState[sub.userSlug].subs.push(sub.id);
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, chatroomSubs } = action.workspaceSub;

      nextState = { [user.slug]: { subs: [], ...user } };

      chatroomSubs.forEach((sub) => {
        nextState[user.slug].subs.push(sub.id);
      });

      return merge({}, state, nextState);
    }
    case USER.UPDATE.RECEIVE:
    case USER.SHOW.RECEIVE: {
      const { id, slug, ...rest } = action.user;
      const joinedAt = dateUtil(rest.joinedAt).monthDayYear();
      nextState = { [slug]: { ...rest, joinedAt } };
      return merge({}, state, nextState);
    }
    case CHATROOM_SUB.CREATE.RECEIVE: {
      const { chatroomSub: { id, userSlug } } = action;
      nextState = merge({}, state);
      nextState[userSlug].subs.push(id);
      return nextState;
    }
    case CHATROOM_SUB.DESTROY.RECEIVE: {
      const { chatroomSub: { id, userSlug } } = action;
      nextState = {};
      nextState[userSlug] = { subs: state[userSlug].subs.filter(subId => id !== subId) };
      return merge({}, state, nextState);
    }
    case CHATROOM.CREATE.RECEIVE: {
      const { chatroomSubs } = action.chatroom;

      nextState = chatroomSubs.reduce((acc, { id, userSlug }) => ({
        ...acc,
        [userSlug]: { subs: [...state[userSlug].subs, id] },
      }), {});

      return merge({}, state, nextState);
    }
    case USER_APPEARANCE.CREATE.RECEIVE:
    case USER_APPEARANCE.DESTROY.RECEIVE: {
      const { userSlug, status } = action.userAppearance;
      nextState = { [userSlug]: { status } };
      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default userReducer;
