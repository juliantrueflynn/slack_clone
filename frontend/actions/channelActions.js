import { actionCreator } from '../util/actionsUtil';
import { CHANNEL, CHANNEL_SUB, CHANNEL_SWITCH } from './actionTypes';

export const fetchChannels = {
  request: workspaceSlug => actionCreator(CHANNEL.INDEX.REQUEST, { workspaceSlug }),
  receive: channels => actionCreator(CHANNEL.INDEX.RECEIVE, { channels }),
  failure: errors => actionCreator(CHANNEL.INDEX.FAILURE, { errors }),
};

export const fetchChannel = {
  request: channelSlug => actionCreator(CHANNEL.SHOW.REQUEST, { channelSlug }),
  receive: channel => actionCreator(CHANNEL.SHOW.RECEIVE, { channel }),
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
  request: channelSlug => actionCreator(CHANNEL.DESTROY.REQUEST, { channelSlug }),
  failure: errors => actionCreator(CHANNEL.DESTROY.FAILURE, { errors }),
};

export const createChannelSub = {
  request: channelSub => actionCreator(CHANNEL_SUB.CREATE.REQUEST, { channelSub }),
  failure: errors => actionCreator(CHANNEL_SUB.CREATE.FAILURE, { errors }),
};

export const updateChannelSub = {
  request: id => actionCreator(CHANNEL_SUB.UPDATE.REQUEST, { id }),
  receive: channelSub => actionCreator(CHANNEL_SUB.UPDATE.RECEIVE, { channelSub }),
  failure: errors => actionCreator(CHANNEL_SUB.UPDATE.FAILURE, { errors }),
};

export const destroyChannelSub = {
  request: id => actionCreator(CHANNEL_SUB.DESTROY.REQUEST, { id }),
  failure: errors => actionCreator(CHANNEL_SUB.DESTROY.FAILURE, { errors }),
};

export const switchChannel = (channelSlug, scrollLoc) => ({
  type: CHANNEL_SWITCH,
  channelSlug,
  scrollLoc,
});
