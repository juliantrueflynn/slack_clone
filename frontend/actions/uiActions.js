import {
  NAVIGATE,
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE,
  ACCORDION_OPEN,
  ACCORDION_CLOSE,
  DESTROY_SUCCESS,
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

export const accordionOpen = (accordionType, accordionItem) => ({
  type: ACCORDION_OPEN,
  accordionType,
  accordionItem,
});

export const accordionClose = (accordionType, accordionItem) => ({
  type: ACCORDION_CLOSE,
  accordionType,
  accordionItem,
});

export const destroySuccess = (entity = null) => ({
  type: DESTROY_SUCCESS,
  entity,
});
