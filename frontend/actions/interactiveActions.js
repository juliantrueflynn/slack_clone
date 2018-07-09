import { NAVIGATE, MODAL_OPEN, MODAL_CLOSE, RIGHT_SIDEBAR } from './actionTypes';

export const modalOpen = modalType => ({
  type: MODAL_OPEN,
  modalType,
});

export const modalClose = modalType => ({
  type: MODAL_CLOSE,
  modalType,
});

export const navigate = params => ({
  type: NAVIGATE,
  params,
});

export const rightSidebarOpen = sidebarType => ({
  type: RIGHT_SIDEBAR.OPEN,
  sidebarType,
});

export const rightSidebarClose = () => ({
  type: RIGHT_SIDEBAR.CLOSE,
});
