import { actionCreator } from '../util/actionsUtil';
import { READ, USER_UNREADS } from './actionTypes';

export const readUpdate = {
  request: (readableId, readableType) => (
    actionCreator(READ.UPDATE.REQUEST, { readableId, readableType })
  ),
  receive: read => actionCreator(READ.UPDATE.RECEIVE, { read }),
  failure: errors => actionCreator(READ.UPDATE.FAILURE, { errors }),
};

export const fetchUnreads = {
  request: workspaceId => actionCreator(USER_UNREADS.INDEX.REQUEST, { workspaceId }),
  receive: unreads => actionCreator(USER_UNREADS.INDEX.RECEIVE, { unreads }),
  failure: errors => actionCreator(USER_UNREADS.INDEX.FAILURE, { errors }),
};
