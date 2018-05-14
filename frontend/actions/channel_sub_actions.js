export const CREATE_CHANNEL_SUB_REQUEST = 'CREATE_CHANNEL_SUB_REQUEST';
export const CREATE_CHANNEL_SUB_RECEIVE = 'CREATE_CHANNEL_SUB_RECEIVE';
export const CREATE_CHANNEL_SUB_FAILURE = 'CREATE_CHANNEL_SUB_FAILURE';

export const createChannelSubRequest = channelSlug => ({
  type: CREATE_CHANNEL_SUB_REQUEST,
  channelSlug
});

export const createChannelSubReceive = channelSub => ({
  type: CREATE_CHANNEL_SUB_RECEIVE,
  channelSub
});

export const createChannelSubFailure = errors => ({
  type: CREATE_CHANNEL_SUB_FAILURE,
  errors
});