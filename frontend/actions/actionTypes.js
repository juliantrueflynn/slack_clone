import { actionTypes, apiActions } from '../util/actionsUtil';

export const SIGN_IN = actionTypes('SIGN_IN');
export const SIGN_UP = actionTypes('SIGN_UP');
export const SIGN_OUT = actionTypes('SIGN_OUT');

export const WORKSPACE = apiActions('WORKSPACE');
export const CHANNEL = apiActions('CHANNEL');
export const MESSAGE = apiActions('MESSAGE', ['SHOW', 'CREATE', 'UPDATE', 'DELETE']);
export const WORKSPACE_SUB = apiActions('CREATE_WORKSPACE_SUB', ['CREATE', 'DELETE']);
export const CHANNEL_SUB = apiActions('CREATE_CHANNEL_SUB', ['CREATE', 'DELETE']);
export const FAVORITES = apiActions('FAVORITES', ['INDEX', 'CREATE', 'DELETE']);
export const REACTION = apiActions('CREATE_REACTION', ['CREATE', 'DELETE']);

export const NAVIGATE = 'NAVIGATE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const NEW_CHANNEL_MODAL = 'NEW_CHANNEL_MODAL';
export const SET_STATUS = 'SET_STATUS';
export const OPEN_RIGHT_SIDEBAR = 'OPEN_RIGHT_SIDEBAR';
export const CLOSE_RIGHT_SIDEBAR = 'CLOSE_RIGHT_SIDEBAR';
