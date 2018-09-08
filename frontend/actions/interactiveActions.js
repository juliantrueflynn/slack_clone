import {
  NAVIGATE,
  MODAL_OPEN,
  MODAL_CLOSE,
} from './actionTypes';

export const modalOpen = modal => ({
  type: MODAL_OPEN,
  modal,
});

export const modalClose = () => ({
  type: MODAL_CLOSE,
});

export const navigate = params => ({
  type: NAVIGATE,
  params,
});
