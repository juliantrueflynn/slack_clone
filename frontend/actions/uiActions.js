import {
  NAVIGATE,
  FORM_SUCCESS_UPDATE,
  FORM_ERRORS_DESTROY,
  ACCORDION_OPEN,
  SEARCH,
  SEARCH_QUERY_UPDATE,
  DROPDOWN_UPDATE,
  DRAWER_UPDATE,
  MODAL_UPDATE,
  MESSAGE_EDITOR_TOGGLE,
} from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const navigate = (path, push) => actionCreator(NAVIGATE, { path, push });

export const updateModal = (modalType, modalProps = null) => actionCreator(
  MODAL_UPDATE,
  { modalType, modalProps }
);

export const updateDrawer = (drawerType, drawerSlug = null) => actionCreator(
  DRAWER_UPDATE,
  { drawerType, drawerSlug }
);

export const updateFormSuccess = (message = null) => actionCreator(
  FORM_SUCCESS_UPDATE,
  { message }
);

export const destroyFormErrors = () => actionCreator(FORM_ERRORS_DESTROY);

export const accordionOpen = (accordionType, accordionItem) => actionCreator(
  ACCORDION_OPEN,
  { accordionType, accordionItem }
);

export const fetchSearch = {
  request: searchQuery => actionCreator(SEARCH.INDEX.REQUEST, { searchQuery }),
  receive: messages => actionCreator(SEARCH.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(SEARCH.INDEX.FAILURE, { errors }),
};

export const updateSearchQuery = (searchQuery = '') => (
  actionCreator(SEARCH_QUERY_UPDATE, { searchQuery })
);

export const updateDropdown = (dropdownType, dropdownProps) => actionCreator(
  DROPDOWN_UPDATE,
  { dropdownType, dropdownProps }
);

export const toggleMessageEditor = (messageSlug = null) => actionCreator(
  MESSAGE_EDITOR_TOGGLE,
  { messageSlug }
);
