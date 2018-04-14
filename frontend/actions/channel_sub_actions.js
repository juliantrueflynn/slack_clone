import * as ChannelSubAPIUtil from '../util/channel_sub_api_util';

export const RECEIVE_CHANNEL_SUB = 'RECEIVE_CHANNEL_SUB';
export const CREATE_CHANNEL_SUB = 'CREATE_CHANNEL_SUB';
export const CREATE_CHANNEL_SUB_SUCCESS = 'CREATE_CHANNEL_SUB_SUCCESS';
export const CREATE_CHANNEL_SUB_ERRORS = 'CREATE_CHANNEL_SUB_ERRORS';

export const receiveChannelSub = channelSub => ({
  type: RECEIVE_CHANNEL_SUB,
  channelSub
});

export const createChannelSub = channelSub => ({
  type: CREATE_CHANNEL_SUB,
  channelSub
});

export const createChannelSubSuccess = channelSub => ({
  type: CREATE_CHANNEL_SUB_SUCCESS,
  channelSub
});

export const createChannelSubErrors = errors => ({
  type: CREATE_CHANNEL_SUB_ERRORS,
  errors
});