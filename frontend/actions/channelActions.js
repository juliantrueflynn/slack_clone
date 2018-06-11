import { actionCreator } from '../util/actionsUtil';
import { CHANNEL, CHANNEL_SUB } from './actionTypes';

export const fetchChannels = {
  request: (channels = {}) => actionCreator(CHANNEL.INDEX.REQUEST, { channels }),
  receive: channels => actionCreator(CHANNEL.INDEX.RECEIVE, { channels }),
  failure: errors => actionCreator(CHANNEL.INDEX.FAILURE, { errors }),
};

export const fetchChannel = {
  request: (channelSlug, ui) => actionCreator(CHANNEL.SHOW.REQUEST, { channelSlug, ui }),
  receive: (channel, ui) => actionCreator(CHANNEL.SHOW.RECEIVE, { channel, ui }),
  failure: errors => actionCreator(CHANNEL.SHOW.FAILURE, { errors }),
};

export const createChannel = {
  request: channel => actionCreator(CHANNEL.CREATE.REQUEST, { channel }),
  failure: errors => actionCreator(CHANNEL.CREATE.FAILURE, { errors }),
};

export const updateChannel = {
  request: channel => actionCreator(CHANNEL.UPDATE.REQUEST, { channel }),
  failure: errors => actionCreator(CHANNEL.UPDATE.FAILURE, { errors }),
};

export const deleteChannel = {
  request: channelSlug => actionCreator(CHANNEL.DELETE.REQUEST, { channelSlug }),
  failure: errors => actionCreator(CHANNEL.DELETE.FAILURE, { errors }),
};

export const createChannelSub = {
  request: channelId => actionCreator(CHANNEL_SUB.CREATE.REQUEST, { channelId }),
  failure: errors => actionCreator(CHANNEL_SUB.CREATE.FAILURE, { errors }),
};

export const deleteChannelSub = {
  request: channelId => actionCreator(CHANNEL_SUB.DELETE.REQUEST, { channelId }),
  failure: errors => actionCreator(CHANNEL_SUB.DELETE.FAILURE, { errors }),
};
