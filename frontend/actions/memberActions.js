export const SET_STATUS = 'SET_STATUS';

export const setStatus = (userSlug, status) => ({
  type: SET_STATUS,
  userSlug,
  status
});