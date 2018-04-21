export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const CREATE_CHANNEL_MODAL = 'CREATE_CHANNEL_MODAL';

export const modalOpen = modalType => ({
  type: MODAL_OPEN,
  modalType
});

export const modalClose = modalType => ({
  type: MODAL_CLOSE,
  modalType,
});