import { NAVIGATE, MODAL_OPEN, MODAL_CLOSE, OPEN_RIGHT_SIDEBAR, CLOSE_RIGHT_SIDEBAR } from './actionTypes';

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

export const openRightSidebar = (sidebarType, sidebarProps) => ({
  type: OPEN_RIGHT_SIDEBAR,
  sidebarType,
  sidebarProps,
});

export const closeRightSidebar = () => ({
  type: CLOSE_RIGHT_SIDEBAR,
});
