import { actionTypes, apiActions } from '../util/actionsUtil';

export const SIGN_IN = actionTypes('SIGN_IN');
export const SIGN_UP = actionTypes('SIGN_UP');
export const SIGN_OUT = actionTypes('SIGN_OUT');
export const USER = apiActions('USER', ['SHOW', 'UPDATE']);
export const USER_APPEARANCE = apiActions('USER_APPEARANCE', ['CREATE', 'DESTROY']);
export const WORKSPACE = apiActions('WORKSPACE', ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY']);
export const CHANNEL = apiActions('CHANNEL', ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY']);
export const MESSAGE = apiActions('MESSAGE', ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY']);
export const HISTORY = apiActions('HISTORY', ['INDEX']);
export const WORKSPACE_SUB = apiActions('WORKSPACE_SUB', ['CREATE', 'UPDATE', 'DESTROY']);
export const CHANNEL_SUB = apiActions('CHANNEL_SUB', ['CREATE', 'UPDATE', 'DESTROY']);
export const FAVORITE = apiActions('FAVORITE', ['INDEX', 'CREATE', 'DESTROY']);
export const REACTION = apiActions('REACTION', ['CREATE', 'DESTROY']);
export const USER_THREAD = apiActions('USER_THREAD', ['INDEX', 'UPDATE']);
export const READ = apiActions('READ', ['CREATE', 'UPDATE']);
export const UNREAD = apiActions('UNREAD', ['INDEX', 'CREATE', 'UPDATE']);
export const PASSWORD = apiActions('PASSWORD', ['UPDATE']);
export const SEARCH = apiActions('SEARCH', ['INDEX']);
export const SEARCH_DESTROY = 'SEARCH_DESTROY';
export const SEARCH_FILTER_TOGGLE = 'SEARCH_FILTER_TOGGLE';

export const DESTROY_SUCCESS = 'DESTROY_SUCCESS';
export const CHANNEL_SWITCH = 'CHANNEL_SWITCH';
export const CLEAR_UNREADS = 'CLEAR_UNREADS';
export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const NAVIGATE = 'NAVIGATE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const ACCORDION_TOGGLE = 'ACCORDION_TOGGLE';
export const ACCORDION_OPEN = 'ACCORDION_OPEN';
