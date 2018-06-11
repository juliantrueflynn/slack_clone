import { SET_STATUS } from './actionTypes';

export const setStatus = (userSlug, status) => ({
  type: SET_STATUS,
  userSlug,
  status,
});
