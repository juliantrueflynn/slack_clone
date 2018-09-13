import { actionCreator } from '../util/actionsUtil';
import { UNREAD } from './actionTypes';

export const fetchUnreads = {
  request: workspaceSlug => actionCreator(UNREAD.INDEX.REQUEST, { workspaceSlug }),
  receive: unreadMessages => actionCreator(UNREAD.INDEX.RECEIVE, { unreadMessages }),
  failure: errors => actionCreator(UNREAD.INDEX.FAILURE, { errors }),
};

export const updateUnread = {
  request: unread => actionCreator(UNREAD.UPDATE.REQUEST, { unread }),
  failure: errors => actionCreator(UNREAD.UPDATE.FAILURE, { errors }),
};
