import { OPEN_RIGHT_SIDEBAR, CLOSE_RIGHT_SIDEBAR } from './actionTypes';

export const openRightSidebar = (sidebarType, sidebarProps) => ({
  type: OPEN_RIGHT_SIDEBAR,
  sidebarType,
  sidebarProps,
});

export const closeRightSidebar = () => ({
  type: CLOSE_RIGHT_SIDEBAR,
});
