import {
  NAVIGATE,
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE,
  DESTROY_SUCCESS,
  ACCORDION_TOGGLE,
  ACCORDION_OPEN,
  SEARCH,
} from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

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

export const destroySuccess = (entity = null) => ({
  type: DESTROY_SUCCESS,
  entity,
});

export const accordionToggle = (accordionType, accordionItem) => ({
  type: ACCORDION_TOGGLE,
  accordionType,
  accordionItem,
});

export const accordionOpen = (accordionType, accordionItem) => ({
  type: ACCORDION_OPEN,
  accordionType,
  accordionItem,
});

export const fetchSearch = {
  request: query => actionCreator(SEARCH.INDEX.REQUEST, { query }),
  receive: messages => actionCreator(SEARCH.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(SEARCH.INDEX.FAILURE, { errors }),
};
