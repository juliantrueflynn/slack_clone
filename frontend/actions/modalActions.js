import { MODAL_OPEN, MODAL_CLOSE } from './actionTypes';

export const modalOpen = modalType => ({
  type: MODAL_OPEN,
  modalType,
});

export const modalClose = modalType => ({
  type: MODAL_CLOSE,
  modalType,
});
