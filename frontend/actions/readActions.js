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
  request: readId => actionCreator(READ.UPDATE.REQUEST, { readId }),
  receive: read => actionCreator(READ.UPDATE.RECEIVE, { read }),
  failure: errors => actionCreator(READ.UPDATE.FAILURE, { errors }),
};

export const destroyRead = {
  request: readId => actionCreator(READ.DESTROY.REQUEST, { readId }),
  receive: read => actionCreator(READ.DESTROY.RECEIVE, { read }),
  failure: errors => actionCreator(READ.DESTROY.FAILURE, { errors }),
};

export const createUnread = (unreadType, unreadProps) => actionCreator(
  CREATE_UNREAD,
  { unreadType, unreadProps }
);

export const clearUnreads = (channelSlug, lastRead) => actionCreator(
  CLEAR_UNREADS,
  { channelSlug, lastRead },
);
