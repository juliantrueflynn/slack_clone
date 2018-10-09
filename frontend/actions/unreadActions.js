import { actionCreator } from '../util/actionsUtil';
import { UNREAD, CLEAR_UNREADS, USER_THREAD } from './actionTypes';

export const fetchUnreads = {
  request: workspaceSlug => actionCreator(UNREAD.INDEX.REQUEST, { workspaceSlug }),
  receive: unreads => actionCreator(UNREAD.INDEX.RECEIVE, { unreads }),
  failure: errors => actionCreator(UNREAD.INDEX.FAILURE, { errors }),
};

export const createUnread = {
  request: unread => actionCreator(UNREAD.CREATE.REQUEST, { unread }),
  receive: unread => actionCreator(UNREAD.CREATE.RECEIVE, { unread }),
  failure: errors => actionCreator(UNREAD.CREATE.FAILURE, { errors }),
};

export const updateUnread = {
  request: unread => actionCreator(UNREAD.UPDATE.REQUEST, { unread }),
  receive: unread => actionCreator(UNREAD.UPDATE.RECEIVE, { unread }),
  failure: errors => actionCreator(UNREAD.UPDATE.FAILURE, { errors }),
};

export const updateUserThreadUnreads = {
  request: (workspaceSlug, parentMessages) => (
    actionCreator(USER_THREAD.UPDATE.REQUEST, { workspaceSlug, parentMessages })
  ),
  receive: messageThreads => actionCreator(USER_THREAD.UPDATE.RECEIVE, { messageThreads }),
  failure: errors => actionCreator(USER_THREAD.UPDATE.FAILURE, { errors }),
};

export const clearUnreads = (channelSlug, lastRead) => ({
  type: CLEAR_UNREADS,
  channelSlug,
  lastRead,
});
