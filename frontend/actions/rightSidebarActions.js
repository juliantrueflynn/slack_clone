export const OPEN_RIGHT_SIDEBAR = 'OPEN_RIGHT_SIDEBAR';
export const CLOSE_RIGHT_SIDEBAR = 'CLOSE_RIGHT_SIDEBAR';
export const RIGHT_SIDEBAR_FAILURE = 'RIGHT_SIDEBAR_FAILURE';

export const openRightSidebar = (sidebarType, sidebarProps) => ({
  type: OPEN_RIGHT_SIDEBAR,
  sidebarType,
  sidebarProps,
});

export const closeRightSidebar = () => ({
  type: CLOSE_RIGHT_SIDEBAR,
});