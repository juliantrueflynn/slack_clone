import { SET_STATUS, MEMBER } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const setStatus = (userSlug, status) => ({
  type: SET_STATUS,
  userSlug,
  status,
});

export const fetchMember = {
  request: userSlug => actionCreator(MEMBER.SHOW.REQUEST, { userSlug }),
  receive: member => actionCreator(MEMBER.SHOW.RECEIVE, { member }),
  failure: errors => actionCreator(MEMBER.SHOW.FAILURE, { errors }),
};
