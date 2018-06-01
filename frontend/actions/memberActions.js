export const SET_APPEARANCE = 'SET_APPEARANCE';

export const setAppearance = (userSlug, appearance) => ({
  type: SET_APPEARANCE,
  userSlug,
  appearance
});