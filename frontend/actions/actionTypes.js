import { actionTypes, apiActions } from '../util/actionsUtil';

export const SET_STATUS = 'SET_STATUS';
export const SIGN_IN = actionTypes('SIGN_IN');
export const SIGN_UP = actionTypes('SIGN_UP');
export const SIGN_OUT = actionTypes('SIGN_OUT');

export const WORKSPACE = apiActions('WORKSPACE');
export const CHANNEL = apiActions('CHANNEL');
export const MESSAGE = apiActions('MESSAGE', ['SHOW', 'CREATE', 'UPDATE', 'DELETE']);
export const WORKSPACE_SUB = apiActions('WORKSPACE_SUB', ['CREATE', 'DELETE']);
export const CHANNEL_SUB = apiActions('CHANNEL_SUB', ['CREATE', 'DELETE']);
export const FAVORITE = apiActions('FAVORITE', ['INDEX', 'CREATE', 'DELETE']);
export const REACTION = apiActions('REACTION', ['CREATE', 'DELETE']);
export const USER_THREAD = apiActions('USER_THREAD', ['INDEX']);

export const NAVIGATE = 'NAVIGATE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const NEW_CHANNEL_MODAL = 'NEW_CHANNEL_MODAL';
export const OPEN_RIGHT_SIDEBAR = 'OPEN_RIGHT_SIDEBAR';
export const CLOSE_RIGHT_SIDEBAR = 'CLOSE_RIGHT_SIDEBAR';
