import {
  NAVIGATE,
  MODAL_OPEN,
  MODAL_CLOSE,
  RIGHT_SIDEBAR
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

export const rightSidebarOpen = sidebarType => ({
  type: RIGHT_SIDEBAR.OPEN,
  sidebarType,
});

export const rightSidebarClose = () => ({
  type: RIGHT_SIDEBAR.CLOSE,
});
