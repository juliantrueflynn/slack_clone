import { RIGHT_SIDEBAR_OPEN, RIGHT_SIDEBAR_CLOSE } from './actionTypes';

export const rightSidebarOpen = (sidebarType, sidebarProps) => ({
  type: RIGHT_SIDEBAR_OPEN,
  sidebarType,
  sidebarProps,
});

export const rightSidebarClose = () => ({
  type: RIGHT_SIDEBAR_CLOSE,
});
