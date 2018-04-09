import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveChannelErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const removeChannel = channel => ({
  type: REMOVE_CHANNEL,
  channel
});

export const fetchChannels = () => dispatch => (
  ChannelAPIUtil.fetchAll().then(
    channels => dispatch(receiveChannels(channels)),
    errors => dispatch(receiveChannelErrors(errors.responseJSON))
  )
);

export const fetchChannel = channelId => dispatch => (
  ChannelAPIUtil.fetch(channelId).then(
    channel => dispatch(receiveChannel(channel)),
    errors => dispatch(receiveChannelErrors(errors.responseJSON))
  )
);

export const createChannel = channel => dispatch => (
  ChannelAPIUtil.create(channel).then(
    newChannel => dispatch(receiveChannel(newChannel)),
    errors => dispatch(receiveChannelErrors(errors.responseJSON))
  )
);

export const deleteChannel = channelId => dispatch => (
  ChannelAPIUtil.destroy(channelId).then(
    channel => dispatch(removeChannel(channel)),
    errors => dispatch(receiveChannelErrors(errors.responseJSON))
  )
);