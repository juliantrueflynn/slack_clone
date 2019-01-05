import { actionCreator } from '../util/actionsUtil';
import { READ, CLEAR_UNREADS, CREATE_UNREAD } from './actionTypes';

export const fetchUnreads = {
  request: workspaceSlug => actionCreator(READ.INDEX.REQUEST, { workspaceSlug }),
  receive: messages => actionCreator(READ.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(READ.INDEX.FAILURE, { errors }),
};

export const createRead = {
  request: read => actionCreator(READ.CREATE.REQUEST, { read }),
  receive: read => actionCreator(READ.CREATE.RECEIVE, { read }),
  failure: errors => actionCreator(READ.CREATE.FAILURE, { errors }),
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

export const createUnread = unread => actionCreator(CREATE_UNREAD, { unread });

export const clearUnreads = (chatPath, lastRead = null) => actionCreator(
  CLEAR_UNREADS,
  { chatPath, lastRead },
);
