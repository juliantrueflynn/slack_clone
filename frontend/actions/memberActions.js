import { USER } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchUser = {
  request: userSlug => actionCreator(USER.SHOW.REQUEST, { userSlug }),
  receive: user => actionCreator(USER.SHOW.RECEIVE, { user }),
  failure: errors => actionCreator(USER.SHOW.FAILURE, { errors }),
};

export const updateUser = {
  request: user => actionCreator(USER.UPDATE.REQUEST, { user }),
  failure: errors => actionCreator(USER.UPDATE.FAILURE, { errors }),
};
