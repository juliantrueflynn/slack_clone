import { actionCreator } from '../util/actionsUtil';
import { MESSAGE, USER_THREAD, HISTORY } from './actionTypes';

export const fetchMessages = {
  request: channelSlug => actionCreator(MESSAGE.INDEX.REQUEST, { channelSlug }),
  receive: messages => actionCreator(MESSAGE.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(MESSAGE.INDEX.FAILURE, { errors }),
};

export const fetchHistory = {
  request: startDate => actionCreator(HISTORY.INDEX.REQUEST, { startDate }),
  receive: messages => actionCreator(HISTORY.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(HISTORY.INDEX.FAILURE, { errors }),
};

export const fetchMessage = {
  request: messageSlug => actionCreator(MESSAGE.SHOW.REQUEST, { messageSlug }),
  receive: messages => actionCreator(MESSAGE.SHOW.RECEIVE, { messages }),
  failure: errors => actionCreator(MESSAGE.SHOW.FAILURE, { errors }),
};

export const createMessage = {
  request: message => actionCreator(MESSAGE.CREATE.REQUEST, { message }),
  failure: errors => actionCreator(MESSAGE.CREATE.FAILURE, { errors }),
};

export const updateMessage = {
  request: message => actionCreator(MESSAGE.UPDATE.REQUEST, { message }),
  failure: errors => actionCreator(MESSAGE.UPDATE.FAILURE, { errors }),
};

export const deleteMessage = {
  request: messageSlug => actionCreator(MESSAGE.DESTROY.REQUEST, { messageSlug }),
  failure: errors => actionCreator(MESSAGE.DESTROY.FAILURE, { errors }),
};

export const fetchUserThreads = {
  request: workspaceSlug => actionCreator(USER_THREAD.INDEX.REQUEST, { workspaceSlug }),
  receive: messages => actionCreator(USER_THREAD.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(USER_THREAD.INDEX.FAILURE, { errors }),
};
