import { actionTypes, apiActions } from '../util/actionsUtil';

export const SIGN_IN = actionTypes('SIGN_IN');
export const SIGN_UP = actionTypes('SIGN_UP');
export const SIGN_OUT = actionTypes('SIGN_OUT');

export const USER_APPEARANCE = apiActions('USER_APPEARANCE', ['CREATE', 'UPDATE', 'DESTROY']);
export const WORKSPACE = apiActions('WORKSPACE', ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY']);
export const CHANNEL = apiActions('CHANNEL', ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY']);
export const DM_CHAT = apiActions('DM_CHAT', ['CREATE']);
export const MESSAGE = apiActions('MESSAGE', ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY']);
export const HISTORY = apiActions('HISTORY', ['INDEX']);
export const WORKSPACE_SUB = apiActions('WORKSPACE_SUB', ['CREATE', 'UPDATE', 'DESTROY']);
export const CHANNEL_SUB = apiActions('CHANNEL_SUB', ['CREATE', 'UPDATE', 'DESTROY']);
export const FAVORITE = apiActions('FAVORITE', ['INDEX', 'CREATE', 'DESTROY']);
export const REACTION = apiActions('REACTION', ['CREATE', 'DESTROY']);
export const USER_THREAD = apiActions('USER_THREAD', ['INDEX', 'UPDATE']);
export const READ = apiActions('READ', ['INDEX', 'CREATE', 'UPDATE']);
export const UNREAD = apiActions('UNREAD', ['INDEX', 'CREATE', 'UPDATE']);
export const MEMBER = apiActions('MEMBER', ['INDEX', 'SHOW', 'UPDATE', 'DESTROY']);
export const AVATAR = apiActions('AVATAR', ['UPDATE']);

export const CHANNEL_SWITCH = 'CHANNEL_SWITCH';
export const LOAD_CHAT_PAGE = 'LOAD_CHAT_PAGE';
export const CLEAR_UNREADS = 'CLEAR_UNREADS';
export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const NAVIGATE = 'NAVIGATE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
