import { actionCreator } from '../util/actionsUtil';
import { PIN } from './actionTypes';

export const createPin = {
  request: pin => actionCreator(PIN.CREATE.REQUEST, { pin }),
  failure: errors => actionCreator(PIN.CREATE.FAILURE, { errors }),
};

export const destroyPin = {
  request: id => actionCreator(PIN.DESTROY.REQUEST, { id }),
  failure: errors => actionCreator(PIN.DESTROY.FAILURE, { errors }),
};
