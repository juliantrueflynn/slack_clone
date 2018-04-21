import * as ChannelAPIUtil from '../util/channel_api_util';

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const FAILURE_CHANNELS = 'FAILURE_CHANNELS';
export const LOAD_CHANNEL_PAGE = 'LOAD_CHANNEL_PAGE';
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const FAILURE_CHANNEL = 'FAILURE_CHANNEL';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
export const CREATE_CHANNEL_ERRORS = 'CREATE_CHANNEL_ERRORS';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const DELETE_CHANNEL_SUCCESS = 'DELETE_CHANNEL_SUCCESS';
export const CREATE_CHANNELS = 'CREATE_CHANNELS';
export const CREATE_CHANNELS_SUCCESS = 'CREATE_CHANNELS_SUCCESS';
export const CREATE_CHANNELS_ERRORS = 'CREATE_CHANNELS_ERRORS';
export const EDIT_CHANNEL = 'EDIT_CHANNEL';
export const EDIT_CHANNEL_SUCCESS = 'EDIT_CHANNEL_SUCCESS';

export const requestChannels = (channels = {}) => ({
  type: REQUEST_CHANNELS,
  channels
});

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const failureChannels = errors => ({
  type: FAILURE_CHANNELS,
  errors
});

export const loadChannelPage = (channelId, workspaceId) => ({
  type: LOAD_CHANNEL_PAGE,
  channelId,
  workspaceId
});

export const requestChannel = channelId => ({
  type: REQUEST_CHANNEL,
  channelId
});

export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const failureChannel = errors => ({
  type: FAILURE_CHANNEL,
  errors
});

export const createChannel = channel => ({
  type: CREATE_CHANNEL,
  channel
});

export const createChannelSuccess = channel => ({
  type: CREATE_CHANNEL_SUCCESS,
  channel
});

export const createChannelErrors = errors => ({
  type: CREATE_CHANNEL_ERRORS,
  errors
});

export const deleteChannel = channelId => ({
  type: DELETE_CHANNEL,
  channelId
});

export const deleteChannelSuccess = channelId => ({
  type: DELETE_CHANNEL_SUCCESS,
  channelId
});

export const createChannels = channels => ({
  type: CREATE_CHANNELS,
  channels
});

export const createChannelsSuccess = channels => ({
  type: CREATE_CHANNELS_SUCCESS,
  channels
});

export const createChannelsErrors = errors => ({
  type: CREATE_CHANNELS_ERRORS,
  errors
});

export const editChannel = channel => ({
  type: EDIT_CHANNEL,
  channel
});

export const editChannelSuccess = channel => ({
  type: EDIT_CHANNEL_SUCCESS,
  channel
});