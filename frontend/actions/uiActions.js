import {
  NAVIGATE,
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE,
} from './actionTypes';

export const navigate = (path, push) => ({
  type: NAVIGATE,
  path,
  push,
});

export const modalOpen = (modalType, modalProps) => ({
  type: MODAL_OPEN,
  modalType,
  modalProps,
});

export const modalClose = () => ({
  type: MODAL_CLOSE,
});

export const drawerOpen = drawer => ({
  type: DRAWER_OPEN,
  drawer,
});

export const drawerClose = () => ({
  type: DRAWER_CLOSE,
});
