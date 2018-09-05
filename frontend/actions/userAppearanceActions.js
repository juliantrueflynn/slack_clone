import { actionCreator } from '../util/actionsUtil';
import { USER_APPEARANCE } from './actionTypes';

export const createUserAppearance = {
  request: userAppearance => actionCreator(USER_APPEARANCE.CREATE.REQUEST, { userAppearance }),
  failure: errors => actionCreator(USER_APPEARANCE.CREATE.FAILURE, { errors }),
};

export const destroyUserAppearance = {
  request: userAppearance => actionCreator(USER_APPEARANCE.DESTROY.REQUEST, { userAppearance }),
  failure: errors => actionCreator(USER_APPEARANCE.DESTROY.FAILURE, { errors }),
};
