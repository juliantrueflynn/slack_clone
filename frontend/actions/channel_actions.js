export const CHANNELS_REQUEST = 'CHANNELS_REQUEST';
export const CHANNELS_RECEIVE = 'CHANNELS_RECEIVE';
export const CHANNELS_FAILURE = 'CHANNELS_FAILURE';
export const CHANNEL_REQUEST = 'CHANNEL_REQUEST';
export const CHANNEL_RECEIVE = 'CHANNEL_RECEIVE';
export const CHANNEL_FAILURE = 'CHANNEL_FAILURE';
export const CREATE_CHANNEL_REQUEST = 'CREATE_CHANNEL_REQUEST';
export const CREATE_CHANNEL_RECEIVE = 'CREATE_CHANNEL_RECEIVE';
export const CREATE_CHANNEL_FAILURE = 'CREATE_CHANNEL_FAILURE';
export const UPDATE_CHANNEL_REQUEST = 'UPDATE_CHANNEL_REQUEST';
export const UPDATE_CHANNEL_RECEIVE = 'UPDATE_CHANNEL_RECEIVE';
export const UPDATE_CHANNEL_FAILURE = 'UPDATE_CHANNEL_FAILURE';
export const DELETE_CHANNEL_REQUEST = 'DELETE_CHANNEL_REQUEST';
export const DELETE_CHANNEL_RECEIVE = 'DELETE_CHANNEL_RECEIVE';
export const DELETE_CHANNEL_FAILURE = 'DELETE_CHANNEL_FAILURE';
export const DEFAULT_CHANNELS_REQUEST = 'DEFAULT_CHANNELS_REQUEST';
export const DEFAULT_CHANNELS_RECEIVE = 'DEFAULT_CHANNELS_RECEIVE';
export const DEFAULT_CHANNELS_FAILURE = 'DEFAULT_CHANNELS_FAILURE';

export const channelsRequest = (channels = {}) => ({
  type: CHANNELS_REQUEST,
  channels
});

export const channelsReceive = channels => ({
  type: CHANNELS_RECEIVE,
  channels
});

export const channelsFailure = errors => ({
  type: CHANNELS_FAILURE,
  errors
});

export const channelRequest = (channelSlug, workspaceSlug) => ({
  type: CHANNEL_REQUEST,
  channelSlug,
  workspaceSlug
});

export const channelReceive = (channel, messageSlug) => ({
  type: CHANNEL_RECEIVE,
  channel,
  messageSlug
});

export const channelFailure = errors => ({
  type: CHANNEL_FAILURE,
  errors
});

export const createChannelRequest = channel => ({
  type: CREATE_CHANNEL_REQUEST,
  channel
});

export const createChannelReceive = channel => ({
  type: CREATE_CHANNEL_RECEIVE,
  channel
});

export const createChannelFailure = errors => ({
  type: CREATE_CHANNEL_FAILURE,
  errors
});

export const updateChannelRequest = channel => ({
  type: UPDATE_CHANNEL_REQUEST,
  channel
});

export const updateChannelReceive = channel => ({
  type: UPDATE_CHANNEL_RECEIVE,
  channel
});

export const updateChannelFailure = errors => ({
  type: UPDATE_CHANNEL_FAILURE,
  errors
});

export const deleteChannelRequest = channelSlug => ({
  type: DELETE_CHANNEL_REQUEST,
  channelSlug
});

export const deleteChannelReceive = channelSlug => ({
  type: DELETE_CHANNEL_RECEIVE,
  channelSlug
});

export const deleteChannelFailure = errors => ({
  type: DELETE_CHANNEL_FAILURE,
  errors
});

export const defaultChannelsRequest = channels => ({
  type: DEFAULT_CHANNELS_REQUEST,
  channels
});

export const defaultChannelsReceive = channels => ({
  type: DEFAULT_CHANNELS_RECEIVE,
  channels
});

export const defaultChannelsFailure = errors => ({
  type: DEFAULT_CHANNELS_FAILURE,
  errors
});