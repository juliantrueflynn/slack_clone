import { MEMBER, AVATAR } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchMember = {
  request: userSlug => actionCreator(MEMBER.SHOW.REQUEST, { userSlug }),
  receive: member => actionCreator(MEMBER.SHOW.RECEIVE, { member }),
  failure: errors => actionCreator(MEMBER.SHOW.FAILURE, { errors }),
};

export const updateMember = {
  request: member => actionCreator(MEMBER.UPDATE.REQUEST, { member }),
  failure: errors => actionCreator(MEMBER.UPDATE.FAILURE, { errors }),
};

export const updateAvatar = {
  request: imageUrl => actionCreator(AVATAR.UPDATE.REQUEST, { imageUrl }),
  failure: errors => actionCreator(AVATAR.UPDATE.FAILURE, { errors }),
};
