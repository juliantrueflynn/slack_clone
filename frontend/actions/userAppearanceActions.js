import { actionCreator } from '../util/actionsUtil';
import { USER_APPEARANCE } from './actionTypes';

export const createUserAppearance = {
  request: workspaceSlug => actionCreator(USER_APPEARANCE.CREATE.REQUEST, { workspaceSlug }),
  failure: errors => actionCreator(USER_APPEARANCE.CREATE.FAILURE, { errors }),
};

export const destroyUserAppearance = {
  request: workspaceSlug => actionCreator(USER_APPEARANCE.DESTROY.REQUEST, { workspaceSlug }),
  failure: errors => actionCreator(USER_APPEARANCE.DESTROY.FAILURE, { errors }),
};
