import { actionCreator } from '../util/actionsUtil';
import { READ, UNREAD_CLEAR_ALL, UNREAD_UPDATE } from './actionTypes';

export const fetchUnreads = {
  request: workspaceSlug => actionCreator(READ.INDEX.REQUEST, { workspaceSlug }),
  receive: messages => actionCreator(READ.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(READ.INDEX.FAILURE, { errors }),
};

export const updateRead = {
  request: read => actionCreator(READ.UPDATE.REQUEST, { read }),
  receive: read => actionCreator(READ.UPDATE.RECEIVE, { read }),
  failure: errors => actionCreator(READ.UPDATE.FAILURE, { errors }),
};

export const destroyRead = {
  request: read => actionCreator(READ.DESTROY.REQUEST, { read }),
  receive: read => actionCreator(READ.DESTROY.RECEIVE, { read }),
  failure: errors => actionCreator(READ.DESTROY.FAILURE, { errors }),
};

export const updateUnread = unread => actionCreator(UNREAD_UPDATE, { unread });

export const clearAllUnread = (chatroomSlug, lastRead = null) => actionCreator(
  UNREAD_CLEAR_ALL,
  { chatroomSlug, lastRead },
);
