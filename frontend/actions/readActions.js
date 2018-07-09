import { actionCreator } from '../util/actionsUtil';
import { READ } from './actionTypes';

const readUpdate = {
  request: (readableId, readableType) => (
    actionCreator(READ.UPDATE.REQUEST, { readableId, readableType })
  ),
  receive: read => actionCreator(READ.UPDATE.RECEIVE, { read }),
  failure: errors => actionCreator(READ.UPDATE.FAILURE, { errors }),
};

export default readUpdate;
