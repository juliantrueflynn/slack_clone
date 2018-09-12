import { actionCreator } from '../util/actionsUtil';
import { UNREAD } from './actionTypes';

export const fetchUnreads = {
  request: workspaceSlug => actionCreator(UNREAD.INDEX.REQUEST, { workspaceSlug }),
  receive: unreadMessages => actionCreator(UNREAD.INDEX.RECEIVE, { unreadMessages }),
  failure: errors => actionCreator(UNREAD.INDEX.FAILURE, { errors }),
};

export const createUnread = {
  request: unread => actionCreator(UNREAD.CREATE.REQUEST, { unread }),
  receive: unread => actionCreator(UNREAD.CREATE.RECEIVE, { unread }),
  failure: errors => actionCreator(UNREAD.CREATE.FAILURE, { errors }),
};

export const destroyUnread = {
  request: unreadId => actionCreator(UNREAD.DESTROY.REQUEST, { unreadId }),
  receive: unread => actionCreator(UNREAD.DESTROY.RECEIVE, { unread }),
  failure: errors => actionCreator(UNREAD.DESTROY.FAILURE, { errors }),
};
