import { actionCreator } from '../util/actionsUtil';
import { READ } from './actionTypes';

export const fetchUnreads = {
  request: workspaceSlug => actionCreator(READ.INDEX.REQUEST, { workspaceSlug }),
  receive: unreads => actionCreator(READ.INDEX.RECEIVE, { unreads }),
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
