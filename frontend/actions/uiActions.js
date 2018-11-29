import {
  NAVIGATE,
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE,
  CREATE_SUCCESS,
  ACCORDION_OPEN,
  SEARCH,
  SEARCH_DESTROY,
} from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const navigate = (path, push) => actionCreator(NAVIGATE, { path, push });

export const modalOpen = (modalType, modalProps) => actionCreator(
  MODAL_OPEN,
  { modalType, modalProps }
);

export const modalClose = () => ({ type: MODAL_CLOSE });

export const drawerOpen = drawer => actionCreator(DRAWER_OPEN, { drawer });

export const drawerClose = () => ({ type: DRAWER_CLOSE });

export const createSuccess = (entity = null, message) => actionCreator(
  CREATE_SUCCESS,
  { entity, message }
);

export const accordionOpen = (accordionType, accordionItem) => actionCreator(
  ACCORDION_OPEN,
  { accordionType, accordionItem }
);

export const fetchSearch = {
  request: (query, shouldNotSearch = false) => (
    actionCreator(SEARCH.INDEX.REQUEST, { query, shouldNotSearch })
  ),
  receive: messages => actionCreator(SEARCH.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(SEARCH.INDEX.FAILURE, { errors }),
};

export const destroySearch = () => ({ type: SEARCH_DESTROY });
