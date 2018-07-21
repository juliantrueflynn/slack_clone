import { MEMBER } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchMember = {
  request: userSlug => actionCreator(MEMBER.SHOW.REQUEST, { userSlug }),
  receive: member => actionCreator(MEMBER.SHOW.RECEIVE, { member }),
  failure: errors => actionCreator(MEMBER.SHOW.FAILURE, { errors }),
};
