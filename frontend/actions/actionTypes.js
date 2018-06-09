import { actionTypes } from '../util/actionsUtil';

export const SIGN_IN = actionTypes('SIGN_IN');
export const SIGN_UP = actionTypes('SIGN_UP');
export const SIGN_OUT = actionTypes('SIGN_OUT');

export const WORKSPACES = actionTypes('WORKSPACES');
export const WORKSPACE = actionTypes('WORKSPACE');
export const CREATE_WORKSPACE = actionTypes('CREATE_WORKSPACE');
export const UPDATE_WORKSPACE = actionTypes('UPDATE_WORKSPACE');
export const DELETE_WORKSPACE = actionTypes('DELETE_WORKSPACE');
export const CHANNELS = actionTypes('CHANNELS');
export const CHANNEL = actionTypes('CHANNEL');
export const CREATE_CHANNEL = actionTypes('CREATE_CHANNEL');
export const UPDATE_CHANNEL = actionTypes('UPDATE_CHANNEL');
export const DELETE_CHANNEL = actionTypes('DELETE_CHANNEL');
export const MESSAGE = actionTypes('MESSAGE');
export const CREATE_MESSAGE = actionTypes('CREATE_MESSAGE');
export const UPDATE_MESSAGE = actionTypes('UPDATE_MESSAGE');
export const DELETE_MESSAGE = actionTypes('DELETE_MESSAGE');
export const CREATE_WORKSPACE_SUB = actionTypes('CREATE_WORKSPACE_SUB');
export const DELETE_WORKSPACE_SUB = actionTypes('DELETE_WORKSPACE_SUB');
export const CREATE_CHANNEL_SUB = actionTypes('CREATE_CHANNEL_SUB');
export const DELETE_CHANNEL_SUB = actionTypes('DELETE_CHANNEL_SUB');
export const FAVORITES = actionTypes('FAVORITES');
export const CREATE_FAVORITE = actionTypes('CREATE_FAVORITE');
export const DELETE_FAVORITE = actionTypes('DELETE_FAVORITE');
export const CREATE_REACTION = actionTypes('CREATE_REACTION');
export const DELETE_REACTION = actionTypes('DELETE_REACTION');

export const NAVIGATE = 'NAVIGATE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const NEW_CHANNEL_MODAL = 'NEW_CHANNEL_MODAL';
export const SET_STATUS = 'SET_STATUS';
export const OPEN_RIGHT_SIDEBAR = 'OPEN_RIGHT_SIDEBAR';
export const CLOSE_RIGHT_SIDEBAR = 'CLOSE_RIGHT_SIDEBAR';
